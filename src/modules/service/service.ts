import firestore from '@react-native-firebase/firestore';
import {Service} from './model';

export const getListServices = async (q?: string, limit = 2) => {
  try {
    let query = await firestore().collection('services').orderBy('serviceName').limit(limit);
    if(q){
      query = query.startAfter(q);
    }
    const res = await query.get();
    const listServices: Service[] = res.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    }) as Service[];
    return {result: listServices};
  } catch (error) {
    console.log('Error get list service: ', getListServices);
    return {error};
  }
};

export const getListServicesDiscount = async (
  q?: string,
  limit = 2,
) => {
  try {
    let query = firestore().collection('services').orderBy('serviceName').limit(limit);
    if (q){
      query = query.startAfter(q);
    }
    const res = await query.get();
    const listServices: Service[] = res.docs
      .map(doc => {
        if (doc.data().discount > 0) {
          return {id: doc.id, ...doc.data()};
        }
        return null;
      })
      .filter(service => service !== null) as Service[];

    return {result: listServices};
  } catch (error) {
    console.log('Error get list service: ', getListServices);
    return {error};
  }
};

export const searchServiceByName = async (serviceName: string) => {
  try {
    const res = await firestore().collection('services').get();
    const listServices: Service[] = res.docs.map(doc => {
      if (doc.data().serviceName.includes(serviceName))
        return {id: doc.id, ...doc.data()};
      return null;
    }).filter(service=>service!=null) as Service[];

    return {result: listServices};
  } catch (error) {
    console.log('Error search service: ', error);
    return {error};
  }
};
