import firestore from '@react-native-firebase/firestore';
import {Branch} from './model';

export const getListBranchs = async (q?: string, limit = 2) => {
  try {
    let query = firestore()
      .collection('branchs')
      .orderBy('branchName')
      .limit(limit);
    if (q) {
      query = query.startAfter(q);
    }

    const res = await query.get();
    const listBranch: Branch[] = res.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    }) as Branch[];
    return {result: listBranch};
  } catch (error) {
    console.log('Error get list branch: ', error);
    return {error};
  }
};

export const searchBranch = async (search: string, q?: string, limit = 2) => {
  try {
    let query = firestore()
      .collection('branchs')
      .orderBy('branchName')
      // .limit(limit)
    // if (q) {
    //   query = query.startAfter(q);
    // }

    const res = await query.get();
    const listBranch: Branch[] = res.docs.map(doc => {
      if (
        doc.data().branchName.includes(search) ||
        doc.data().address.includes(search)
      ) {
        return {id: doc.id, ...doc.data()};
      }
      return null;
    }).filter(branch=>branch!=null) as Branch[];
    return {result: listBranch};
  } catch (error) {
    console.log('Error search branch: ', error);
    return {error};
  }
};
