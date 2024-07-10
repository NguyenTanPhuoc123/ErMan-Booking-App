import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {BodyParams} from './model';
import {Admin, Staff, User} from '../user/model';
import client from '../../api';
import * as UserApi from '../../api/user/queries';

export const login = async (email: string, password: string) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
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
    const res = await client.query({
      query: UserApi.GetCurrentUser,
      variables: {email: auth().currentUser?.email},
    });
    const userData = res.data.User_connection.edges[0].node;
    const id = JSON.parse(atob(userData.id));
    const staff = userData.Staff;
    const result: User | Staff | Admin = {
      id: id[3],
      avatar: userData.avatar,
      firstname: userData.firstname,
      lastname: userData.lastname,
      gender: userData.gender,
      birthday: userData.birthday,
      address: userData.address,
      email: userData.email,
      isVerified: userData.isVerified,
      typeAccount: userData.typeAccount,
      workPlace: staff ? staff.Branch.branchName : null,
      timeStartWork: staff ? staff.timeStartWork : null,
    };
    return {result: result};
  } catch (error) {
    console.log('Error get current user: ', error);
    return {error};
  }
};

export const register = async (body: BodyParams) => {
  try {
    const res = auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then(async () => {
        await client.mutate({
          mutation: UserApi.Register,
          variables: {
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
          },
        });
      });

    return {result: res};
  } catch (error) {
    console.log('Error register: ', error);
    return {error};
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const confirmation = auth()
      .createUserWithEmailAndPassword(email, '123456@aA')
      .then(user => {
        user.user.sendEmailVerification();
      });
    return {result: confirmation};
  } catch (error) {
    console.log('Error verify email: ', error);
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
      email: userData.email,
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

export const changePassword = async (newPassword:string) => {
  try {
    console.log(auth().currentUser?.uid);
    const res = await auth().currentUser?.updatePassword(newPassword);
    return {result:res};
  } catch (error) {
    console.log('Error change password: ', error);
    return {error};
  }
};

export const checkEmailExist = async (email:String) => {
  try {
    const res = await client.query({
      query: UserApi.CheckEmailExist,
      variables: {email},
    });
    const userData = res.data.User_connection.edges[0];
    return {result: userData};
  } catch (error) {
    console.log('Error get current user: ', error);
    return {error};
  }
};

export const resetPassword = async(email:string)=>{
  try{
  const res = await auth().sendPasswordResetEmail(email);
  return {result:res};
  }catch(error){
    console.log("Error reset password: ",error);
    return {error};
  }
}