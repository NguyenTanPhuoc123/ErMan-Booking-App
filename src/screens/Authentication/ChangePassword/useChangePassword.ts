import {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import NavigationActionService from '../../../navigation/navigation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import { validationChangePasswordSchema } from './validation';
import { IChangePasswordFormValues } from './model';
import { useDispatch } from 'react-redux';
import { changePassword, logout } from '../../../modules/auth';

const useChangePassword = () => {
  const dispatch = useDispatch();

  const initValueChangePassword:IChangePasswordFormValues = {
    oldPassword:'',
    newPassword: '',
    confirmNewPassword: '',
  };

  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues
  } = useForm<IChangePasswordFormValues>({
    defaultValues: initValueChangePassword,
    resolver: yupResolver(validationChangePasswordSchema),

  });
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [isSecureEntryOld, setIsSecureEntryOld] = useState<boolean>(true);
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] =
    useState<boolean>(true);

  const onFocusOldPassword = ()=>{
    oldPasswordRef.current?.focus();
  }
  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };

  const onFocusConfirmPassword = () => {
    confirmPasswordRef.current?.focus();
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  const onChangePasswordSuccess = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Đổi mật khẩu',
      message: 'Đổi mật khẩu thành công',
      onPressPrimaryBtn: () => dispatch(logout({})),
    });
  };

  const onChangePasswordFail = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Đổi mật khẩu ',
      message: 'Đổi mật khẩu thất bại',
    });
  };

  const onChangePassword = handleSubmit(()=>{
    // if(getValues('oldPassword')!=getValues('newPassword')){
    //   NavigationActionService.showPopup({
    //     type: PopupType.ONE_BUTTON,
    //     typeMessage: MessageType.ERROR,
    //     title: 'Đổi mật khẩu ',
    //     message: 'Mật khẩu trùng',
    //   });
    // }
    dispatch(changePassword({
      newPassword: getValues('newPassword'),
      onSuccess:onChangePasswordSuccess,
      onFail:onChangePasswordFail
    }))
  })

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
    onFocusOldPassword,
    isSecureEntryOld,
    setIsSecureEntryOld,
    oldPasswordRef
  };
};

export default useChangePassword;
