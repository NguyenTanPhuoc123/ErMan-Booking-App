import {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import NavigationActionService from '../../../navigation/navigation';
import {validationSchema} from './validation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {useRoute} from '@react-navigation/native';

const useChangePassword = () => {
  const initValue = {
    password: '',
    confirmPassword: '',
  };
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: initValue,
    resolver: yupResolver(validationSchema),
  });
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] =
    useState<boolean>(true);
  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };

  const onFocusConfirmPassword = () => {
    confirmPasswordRef.current?.focus();
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  const onChangePassword = handleSubmit(() => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Tạo mật khẩu',
      message: 'Tạo mật khẩu thành công',
      onPressPrimaryBtn: () => NavigationActionService.navigate(LOGIN_SCREEN),
    });
  });

  return {
    passwordRef,
    confirmPasswordRef,
    onFocusPassword,
    onFocusConfirmPassword,
    goBack,
    control,
    errors,
    isSecureEntry,
    isSecureEntryConfirm,
    setIsSecureEntry,
    setIsSecureEntryConfirm,
    onChangePassword,
  };
};

export default useChangePassword;
