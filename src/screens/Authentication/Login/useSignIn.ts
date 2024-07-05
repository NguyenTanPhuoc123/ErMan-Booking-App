import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SignInFormValues} from './model';
import {validationSchema} from './validation';
import {Keyboard, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import NavigationActionService from '../../../navigation/navigation';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {REGISTER_SCREEN} from '../../../constants/screen_key';
import { useDispatch } from 'react-redux';
import { login, userReadyLoadData } from '../../../modules/auth';
import { ApiError } from '../../../constants/api';

const useSignIn = () => {
  const emailRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>(null);
  const initValue = {email: '', password: ''};
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValues>({
    defaultValues: initValue,
    resolver: yupResolver(validationSchema),
  });

  const onFocusEmail = () => {
    emailRef.current?.focus();
  };

  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };

  const onLoginSuccess = () => {
    NavigationActionService.hideLoading();
    dispatch(userReadyLoadData());
    
  };

  const onLoginFailure = (error?:ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Đăng nhập thất bại',
      message: error?.message || "Tài khoản hoặc mật khẩu không chính xác",
      primaryBtnText: 'OK',
    });
  };
  const onLogin = handleSubmit((values: SignInFormValues) => {
    Keyboard.dismiss();
    NavigationActionService.showLoading();
    dispatch(login({
      email: values.email,
      password: values.password,
      onSuccess:onLoginSuccess,
      onFail:onLoginFailure
    }))
  });

  const goToRegister = () => {
    NavigationActionService.navigate(REGISTER_SCREEN, {
      id: 'Register',
      title: 'Đăng ký',
    });
  };

  const goToForgotPassword = () => {
    NavigationActionService.navigate(REGISTER_SCREEN, {
      id: 'ForgotPassword',
      title: 'Quên mật khẩu',
    });
  };

  return {
    emailRef,
    control,
    onLogin,
    errors,
    passwordRef,
    onFocusEmail,
    onFocusPassword,
    isSecureEntry,
    setIsSecureEntry,
    goToRegister,
    goToForgotPassword,
  };
};

export default useSignIn;
