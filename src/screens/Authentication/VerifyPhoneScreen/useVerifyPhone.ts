import {useEffect, useRef, useState} from 'react';
import NavigationActionService from '../../../navigation/navigation';

const useVerifyPhone = () => {
  const [otpCode, setOtpCode] = useState<Array<string>>([]);
  const [expiredTime, setExpiredTime] = useState<number>(30);
  const [disableResend,setDisableResend] = useState<boolean>(true);

  useEffect(() => {
    if (expiredTime >= 0) {
      const timer = setInterval(() => {
        setExpiredTime(expiredTime - 1);
      }, 1000);
      
      if(expiredTime<1){
      setDisableResend(false);
      }
      return () => clearInterval(timer);
    }
  }, [expiredTime]);

  const goBack = () => {
    setOtpCode([]);
    NavigationActionService.canGoBack();
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
  };
};

export default useVerifyPhone;
