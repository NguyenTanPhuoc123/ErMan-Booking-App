import app from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {BodyParams} from './model';
import {User} from '../user/model';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../constants/icons';

export const login = async (phone: string, password: string) => {
  try {
    const phoneMail = `${phone}@gmail.com`;
    const res = await auth()
      .signInWithEmailAndPassword(phoneMail, password)
      .then(() => {
        console.log('Login with: ', phone);
      });
    return {result: res};
  } catch (error) {
    console.log('Error login: ', error);
    return {
      error,
    };
  }
};

export const register = async (body: BodyParams) => {
  try {
    console.log('Register: ', body);
    const phoneMail = `${body.phone}@gmail.com`;
    const res = auth().createUserWithEmailAndPassword(phoneMail,body.password).then(async()=>{
      firestore().collection('users').add({
        avatar: AVARTAR_DEFAULT_CUSTOMER,
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
        isVerified: true,
        typeAccount: 'Customer'
      });
    });
      
    return {result: res};
  } catch (error) {
    console.log('Error register: ', error);
    return {error};
  }
};

export const verifyPhone = async (phone: string) => {
  const confirmation = await auth().verifyPhoneNumber(phone);
  return confirmation;
};

export const confirmOTPCode = async (code: string) => {
  try {
    const credential = auth.PhoneAuthProvider.credential(code);
  } catch (error) {
    console.log('Error: ', error);
  }
};
