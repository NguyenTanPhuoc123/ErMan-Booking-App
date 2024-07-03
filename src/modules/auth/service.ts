import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {BodyParams} from './model';
import {User} from '../user/model';
import client from '../../api';
import * as UserApi from '../../api/user/queries';
export const login = async (phone: string, password: string) => {
  try {
    const phoneMail = `${phone}@gmail.com`;
    const res = await auth().signInWithEmailAndPassword(phoneMail, password);
    return {result: res};
  } catch (error) {
    console.log('Error login: ', error);
    return {
      error,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const indexEnd = auth().currentUser?.email?.indexOf('@gmail.com');
    const numberPhone = auth().currentUser?.email?.substring(0, indexEnd);

    const res = await client.query({
      query: UserApi.GetCurrentUser,
      variables: {numberPhone},
    });
    const userData = res.data.User_connection.edges;
    const id = JSON.parse(atob(userData[0].node.id));
    const result: User = {
      id: id[3],
      avatar: userData[0].node.avatar,
      firstname: userData[0].node.firstname,
      lastname: userData[0].node.lastname,
      gender: userData[0].node.gender,
      birthday: userData[0].node.birthday,
      address: userData[0].node.address,
      phone: userData[0].node.phone,
      isVerified: userData[0].node.isVerified,
      typeAccount: userData[0].node.typeAccount,
    };

    return {result: result};
  } catch (error) {
    console.log('Error get current user: ', error);
    return {error};
  }
};

export const register = async (body: BodyParams) => {
  try {
    const phoneMail = `${body.phone}@gmail.com`;
    const res = auth()
      .createUserWithEmailAndPassword(phoneMail, body.password)
      .then(async () => {
        firestore().collection('users').add({
          avatar: '',
          firstname: body.firstname,
          lastname: body.lastname,
          phone: body.phone,
          gender: true,
          address: '',
          birthday: '01-01-2000',
          isVerified: true,
          typeAccount: 'Customer',
        });
      });

    return {result: res};
  } catch (error) {
    console.log('Error register: ', error);
    return {error};
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

export const confirmOTPCode = async (code: string) => {
  try {
    const credential = auth.PhoneAuthProvider.credential(code);
    return {result: credential};
  } catch (error) {
    console.log('Error: ', error);
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

export const logout = async () => {
  try {
    const res = await auth().signOut();
    return {result: res};
  } catch (error) {
    console.log('Error log out: ', error);
    return {error};
  }
};

export const forgotPassword = async () => {
  try {
  } catch (error) {
    console.log('Error change password: ', error);
    return {error};
  }
};
