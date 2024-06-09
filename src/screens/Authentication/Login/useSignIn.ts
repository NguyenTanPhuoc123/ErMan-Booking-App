import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SignInFormValues} from './model';
import {validationSchema} from './validation';
import {Keyboard, TextInput} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import NavigationActionService from '../../../navigation/navigation';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {REGISTER_SCREEN} from '../../../constants/screen_key';

const useSignIn = () => {
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const initValue = {phone: '', password: ''};
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValues>({
    defaultValues: initValue,
    resolver: yupResolver(validationSchema),
  });

  const onFocusPhone = () => {
    phoneRef.current?.focus();
  };

  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };

  const onLoginSuccess = (phone: string, password: string) => {};

  const onLoginFailure = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Đăng nhập thất bại',
      message: 'Tài khoản hoặc mật khẩu không chính xác',
      primaryBtnText: 'OK',
    });
  };
  const onLogin = handleSubmit((values: SignInFormValues) => {
    Keyboard.dismiss();
    onLoginFailure();
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
    phoneRef,
    control,
    onLogin,
    errors,
    passwordRef,
    onFocusPhone,
    onFocusPassword,
    isSecureEntry,
    setIsSecureEntry,
    goToRegister,
    goToForgotPassword,
  };
};

export default useSignIn;
