import storage from '@react-native-firebase/storage';
import {Service} from './model';
import client from '../../api';
import * as ServiceApi from '../../api/service/queries';
export const getListServices = async (after?: string, limit = 4) => {
  try {
    let res;
    if (after) {
      res = await client.query({
        query: ServiceApi.getListServices,
        variables: {limit, after},
      });
    } else {
      res = await client.query({
        query: ServiceApi.getListServices,
        variables: {limit},
      });
    }

    const listData = res.data.Service_connection.edges;
    const hasNextPage = res.data.Service_connection.pageInfo.hasNextPage;
    const endCursor = res.data.Service_connection.pageInfo.endCursor;
    if (endCursor === after) {
      console.log('Error Cursor');
      return;
    }
    const listService: Service[] = listData.map((data: any) => {
      const serviceId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newService} = data.node;
      return {id: serviceId, ...newService};
    }) as Service[];

    return {result: {services: listService, hasNextPage, endCursor}};
  } catch (error) {
    console.log('Error get list service: ', error);
    return {error};
  }
};

export const searchServiceByName = async (serviceName: string) => {
  try {
    const res = await client.query({
      query: ServiceApi.searchService,
      variables: {serviceName: `%${serviceName}%`},
    });
    const listData = res.data.Service_connection.edges;
    const listService: Service[] = listData.map((data: any) => {
      const serviceId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newService} = data.node;
      return {id: serviceId, ...newService};
    }) as Service[];

    return {result: listService};
  } catch (error) {
    console.log('Error search service: ', error);
    return {error};
  }
};

export const checkServiceNameExist = async (serviceName: string) => {
  try {
    const res = await client.query({
      query: ServiceApi.checkServiceNameExist,
      variables: {serviceName: `${serviceName}`},
    });
    const service = res.data.Service_connection.edges[0];

    return {result: service};
  } catch (error) {
    console.log('Error check exist service name: ', error);
    return {error};
  }
};

export const addNewService = async (
  serviceName: string,
  price: number,
  time: number,
  image?: string,
  description?: string,
) => {
  try {
    const res = await client.mutate({
      mutation: ServiceApi.addNewService,
      variables: {
        serviceName: serviceName,
        price: price,
        time: time,
        image: image,
        description: description,
      },
    });

    const serviceId = res.data.insert_Service_one.id;
    const id = JSON.parse(atob(serviceId))[3];

    if (image) {
      saveImageServiceInStorage(id, serviceName, image);
    }

    return {result: res};
  } catch (error) {
    console.log('Error add new service: ', error);
    return {error};
  }
};

const saveImageServiceInStorage = async (
  id: number,
  serviceName: string,
  path: string,
) => {
  try {
    storage()
      .ref(`services/${id}_${serviceName}/${id}_${serviceName}_image`)
      .putFile(path)
      .then(async () => {
        await storage()
          .ref(`services/${id}_${serviceName}/${id}_${serviceName}_image`)
          .getDownloadURL()
          .then(async value => {
            await client.mutate({
              mutation: ServiceApi.UpdateImageService,
              variables: {id: id, image: value},
            });
          });
      });
  } catch (error) {
    console.log('Error save image service, because ', error);
  }
};

export const updateService = async (service: Service) => {
  try {
    if (service.image) {
      saveImageServiceInStorage(service.id, service.serviceName, service.image);
    }
    const res = await client.mutate({
      mutation: ServiceApi.UpdateService,
      variables: {
        id: service.id,
        serviceName: service.serviceName,
        price: service.price,
        time: service.time,
        image: service.image,
        description: service.description,
      },
    });

    return {result: res};
  } catch (error) {
    console.log('Error update service: ', error);
  }
};

export const deleteService = async (id: number) => {
  try {
    const res = await client.mutate({
      mutation: ServiceApi.DeleteService,
      variables: {
        id,
      },
    });

    return {result: res};
  } catch (error) {
    console.log('Error delete service: ', error);
    return {error};
  }
};
