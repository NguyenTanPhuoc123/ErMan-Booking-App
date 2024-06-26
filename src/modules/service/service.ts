import firestore from '@react-native-firebase/firestore';
import {Service} from './model';

export const getListServices = async (q?: string, page = 1, limit = 2) => {
  try {
    const res = await firestore().collection('services').limit(limit).get();
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
  page = 1,
  limit = 2,
) => {
  try {
    const res = await firestore().collection('services').limit(limit).get();
    const listServices: Service[] = res.docs.map(doc => {
      if (doc.data().discount > 0) {
        return {id: doc.id, ...doc.data()};  
      }
      return null;
    }).filter(service => service !== null) as Service[];
    
    return {result: listServices};
  } catch (error) {
    console.log('Error get list service: ', getListServices);
    return {error};
  }
};
