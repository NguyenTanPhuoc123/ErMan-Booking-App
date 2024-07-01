import firestore from '@react-native-firebase/firestore';
import {User} from './model';
import {BodyParams} from '../auth/model';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import client from '../../api';
import * as UserApi from '../../api/user/queries';
export const getListUsers = async (q?: string, page = 1, limit = 4) => {
  try {
    const res = await client.query({query: UserApi.GetListUsers});
    const edges = res.data.User_connection.edges;
    const users: User[] = edges.map((edge: any) => {
      return {...edge.node};
    });
    return {result: users};
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

export const editProfile = async (user: User) => {
  try {
    if (user.avatar) {
      saveAvatarInStorage(user.id, user.avatar);
    }
    await firestore().collection('users').doc(user.id).update({
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      birthday: user.birthday,
      address: user.address,
    });
    const userData = await firestore().collection('users').doc(user.id).get();
    return {result: {id: user.id, ...userData.data()}};
  } catch (error) {
    console.log('Error edit user: ', error);
    return {error};
  }
};

const saveAvatarInStorage = async (id: string, path: string) => {
  try {
    storage()
      .ref(`users/${id}/${id}_avatar`)
      .putFile(path)
      .then(async () => {
        await storage()
          .ref(`users/${id}/${id}_avatar`)
          .getDownloadURL()
          .then(async value => {
            firestore()
              .collection('users')
              .doc(id)
              .update({avatar: value.toString()})
              .then(() => {
                console.log('Updated avatar after edit profile');
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
