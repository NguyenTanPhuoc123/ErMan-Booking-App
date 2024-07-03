import firestore from '@react-native-firebase/firestore';
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
      console.log('Error search branch: ', error);
      return {error};
    }
  };
