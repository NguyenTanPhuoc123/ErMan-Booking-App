import {useForm} from 'react-hook-form';
import {InfoFormValues} from './model';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validation';
import {useRef, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import NavigationActionService from '../../../navigation/navigation';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {useDispatch} from 'react-redux';
import {ApiError} from '../../../constants/api';
import {register} from '../../../modules/auth';
import {useRoute} from '@react-navigation/native';
import {BodyParams} from '../../../modules/auth/model';

const useInputInfo = () => {
  const initValue: InfoFormValues = {
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  };
  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm<InfoFormValues>({
    defaultValues: initValue,
    resolver: yupResolver(validationSchema),
  });
  const route = useRoute();
  const {phone} = route.params as any;
  const dispatch = useDispatch();
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] =
    useState<boolean>(true);
  const onFocusFirstName = () => {
    firstNameRef.current?.focus();
  };
  const onFocusLastName = () => {
    lastNameRef.current?.focus();
  };
  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };
  const onFocusConfirmPassword = () => {
    confirmPasswordRef.current?.focus();
  };

  const onRegisterSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Đăng ký tài khoản',
      message: 'Đăng ký thành công',
      onPressPrimaryBtn: () => NavigationActionService.navigate(LOGIN_SCREEN),
    });
  };

  const onRegisterFail = (errors?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Đăng ký thất bại',
      message: errors?.message,
    });
  };

  const onRegister = handleSubmit((values:InfoFormValues) => {
    NavigationActionService.showLoading();
    dispatch(
      register({
        body: {
          phone: phone as string,
          firstname: values.firstname,
          lastname: values.lastname,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        onSuccess: onRegisterSuccess,
        onFail: onRegisterFail,
      }),
    );
  });

  const goBack = () => {
    NavigationActionService.pop();
  };
  return {
    control,
    errors,
    firstNameRef,
    lastNameRef,
    passwordRef,
    confirmPasswordRef,
    onFocusFirstName,
    onFocusLastName,
    onFocusPassword,
    onFocusConfirmPassword,
    isSecureEntry,
    setIsSecureEntry,
    isSecureEntryConfirm,
    setIsSecureEntryConfirm,
    onRegister,
    goBack,
  };
};

export default useInputInfo;
