import {useEffect, useState} from 'react';
import NavigationActionService from '../../../navigation/navigation';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {
  CHANGE_PASSWORD_SCREEN,
  INFORMATION_SCREEN,
} from '../../../constants/screen_key';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {verifyEmail} from '../../../modules/auth';
import auth from '@react-native-firebase/auth';
const useVerifyPhone = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {id, email} = route.params as any;
  const [otpCode, setOtpCode] = useState<Array<string>>([]);
  const [expiredTime, setExpiredTime] = useState<number>(30);
  const [disableResend, setDisableResend] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState('');
  const otp = 3567;
  useEffect(() => {
    // if (expiredTime >= 0) {
    //   const timer = setInterval(() => {
    //     setExpiredTime(expiredTime - 1);
    //   }, 1000);

    //   if (expiredTime < 1) {
    //     setDisableResend(false);
    //   }
    //   return () => clearInterval(timer);
    // }
    dispatch(
      verifyEmail({
        email: email,
      }),
    );
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      user?.sendEmailVerification();
      console.log('Email verify: ', isVerified);
    });
  });

  const cofirmOTPCode = () => {
    const code = otpCode.join('');
    if (code.length !== 4) {
      setErrors('Vui lòng nhập đầy đủ mã xác thực');
    } else if (code !== otp.toString()) {
      setErrors('Mã xác thực không chính xác, vui lòng nhập lại');
    } else {
      NavigationActionService.navigate(
        id === 'Register' ? INFORMATION_SCREEN : CHANGE_PASSWORD_SCREEN,
        {email: email},
      );
    }
  };

  const goBack = () => {
    setOtpCode([]);
    NavigationActionService.pop();
  };

  const resendOTP = () => {
    setExpiredTime(30);
    setDisableResend(true);
  };

  return {
    goBack,
    otpCode,
    setOtpCode,
    expiredTime,
    resendOTP,
    disableResend,
    cofirmOTPCode,
    errors,
  };
};

export default useVerifyPhone;
