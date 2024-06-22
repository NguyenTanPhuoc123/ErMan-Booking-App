import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {BodyParams} from './model';
import {User} from '../user/model';

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
    const phone = auth().currentUser?.email?.substring(0, indexEnd);
    const res = await firestore().collection('users').get();
    const userData = res.docs.find(user => user.data().phone === phone);
    const user = userData?.data();

    return {result: {id: userData?.id, ...user}};
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
          birthday: '01/01/2000',
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
    await firestore().collection('users').doc(user.id).update({
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      birthday: user.birthday,
      address: user.address,
    });
    const userData = await firestore().collection('users').doc(user.id).get();
    return {result: { id:user.id,...userData.data()}};
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

export const logout = async () => {
  try {
    const res = await auth().signOut();
    return {result: res};
  } catch (error) {
    console.log('Error log out: ', error);
    return {error};
  }
};
