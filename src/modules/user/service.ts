import firestore from '@react-native-firebase/firestore';
import {Staff, User} from './model';
import {BodyParams} from '../auth/model';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import client from '../../api';
import * as UserApi from '../../api/user/queries';
export const getListCustomer = async (q?: string, page = 1, limit = 4) => {
  try {
    const res = await client.query({query: UserApi.GetListUsers});
    const listData = res.data.User_connection.edges;
    const listUser: User[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newUser} = data.node;
      return {id: userId, ...newUser};
    }) as User[];
    return {result: listUser};
  } catch (error) {
    console.log('Error get list users: ', error);
    return {error};
  }
};

export const getListStaffs = async (limit:number,after?: string) => {
  try {
    let res;
    if (after) {
      res = await client.query({
        query: UserApi.GetListStaff,
        variables: {
          limit,
          after,
        },
      });
    }
    else{
      res = await client.query({
        query: UserApi.GetListStaff,
        variables: {
          limit,
        },
      });
    }
    const hasNextPage = res.data.User_connection.pageInfo.hasNextPage;
    const endCursor = res.data.User_connection.pageInfo.endCursor;
    const listData = res.data.User_connection.edges;
    if(after===endCursor){
      return;
    }
    const listStaff: Staff[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const workPlace = data.node.Staff.workPlace;
      const timeStartWork = data.node.Staff.timeStartWork;
      const {id, Staffs, ...newUser} = data.node;
      return {
        id: userId,
        workPlace: workPlace,
        timeStartWork: timeStartWork,
        ...newUser,
      };
    }) as Staff[];
    return {result: {users: listStaff, hasNextPage, endCursor}}
  } catch (error) {
    console.log('Error get list users: ', error);
    return {error};
  }
};

export const addNewUser = async (body: BodyParams, typeAccount: string) => {
  try {
    const phoneMail = `${body.phone}@gmail.com`;
    const res = auth()
      .createUserWithEmailAndPassword(phoneMail, body.password)
      .then(async () => {
        await firestore().collection('users').add({
          avatar: '',
          firstname: body.firstname,
          lastname: body.lastname,
          phone: body.phone,
          gender: true,
          address: '',
          birthday: '01-01-2000',
          isVerified: true,
          typeAccount: typeAccount,
        });
      });

    return {result: res};
  } catch (error) {
    console.log('Error register: ', error);
    return {error};
  }
};

export const searchStaff = async (search: string) => {
  try {
    const res = await client.query({
      query: UserApi.SearchStaff,
      variables: {search: `%${search}%`},
    });
    const listData = res.data.User_connection.edges;
    const listStaff: Staff[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const workPlace = data.node.Staff.workPlace;
      const timeStartWork = data.node.Staff.timeStartWork;
      const {id,Staffs, ...newUser} = data.node;
      return {id: userId,workPlace:workPlace,timeStartWork:timeStartWork, ...newUser};
    }) as Staff[];

    return {result: listStaff};
  } catch (error) {
    console.log('Error search stylist: ', error);
    return {error};
  }
};

export const editProfile = async (user: User) => {
  try {
    if (user.avatar) {
      saveAvatarInStorage(user.id, user.avatar);
    }
    const res = await client.mutate({
      mutation: UserApi.EditProfile,
      variables: {
        id: user.id,
        avatar: user.avatar,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        birthday: user.birthday,
        address: user.address,
      },
    });
    const userData = res.data.update_User_by_pk;
    const userUpdated: User = {
      id: user.id,
      avatar: user.avatar,
      firstname: userData.firstname,
      lastname: userData.lastname,
      gender: userData.gender,
      birthday: userData.birthday,
      address: userData.address,
      phone: userData.phone,
      isVerified: userData.isVerified,
      typeAccount: userData.typeAccount,
    };
    return {result: userUpdated};
  } catch (error) {
    console.log('Error edit user: ', error);
    return {error};
  }
};

const saveAvatarInStorage = async (id: number, path: string) => {
  try {
    storage()
      .ref(`users/${id}/${id}_avatar`)
      .putFile(path)
      .then(async () => {
        await storage()
          .ref(`users/${id}/${id}_avatar`)
          .getDownloadURL()
          .then(async value => {
            await client.mutate({
              mutation: UserApi.UpdateAvatar,
              variables: {id: id, avatar: value},
            });
          });
      });
  } catch (error) {
    console.log('Error save avatar on storage, because ', error);
  }
};

export const verifyPhone = async (phone: string) => {
  try {
    const confirmation = await auth().verifyPhoneNumber(phone);
    console.log(confirmation);

    return {result: confirmation};
  } catch (error) {
    console.log('Error verify phone: ', error);
    return {error};
  }
};
