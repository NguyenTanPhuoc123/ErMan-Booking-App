import app from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {BodyParams} from './model';
import {User} from '../user/model';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../constants/icons';

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

export const logout = async()=>{
  try{
  const res = await auth().signOut();
  return {result: res};
  }catch(error){
    console.log("Error log out: ",error);
    return {error};
  }
}