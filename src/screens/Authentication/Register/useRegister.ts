import {yupResolver} from '@hookform/resolvers/yup';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Keyboard, TextInput} from 'react-native';
import {validationSchema} from './validation';
import NavigationActionService from '../../../navigation/navigation';
import {
  INFORMATION_SCREEN,
  VERIFY_PHONE_SCREEN,
} from '../../../constants/screen_key';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  checkEmailExist,
  forgotPassword,
  verifyEmail,
} from '../../../modules/auth';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {ApiError} from '../../../constants/api';

const useRegister = () => {
  const emailRef = useRef<TextInput>(null);
  const route = useRoute();
  const dispatch = useDispatch();
  const {id, title} = route.params as any;
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {email: ''},
    resolver: yupResolver(validationSchema),
  });

  const onResetPasswordSuccess = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Quên mật khẩu',
      message:
        'Chúng tôi đã gửi email để cập nhật lại mật khẩu mới đến bạn. Vui lòng kiểm tra lại email!',
      onPressPrimaryBtn: goBack,
    });
  };

  const onSuccess = (result: any) => {
    if (id != 'Register') {
      if (result) {
        dispatch(
          forgotPassword({
            email: getValues('email'),
            onSuccess: onResetPasswordSuccess,
            onFail: onFail,
          }),
        );
      } else {
        NavigationActionService.showPopup({
          type: PopupType.ONE_BUTTON,
          typeMessage: MessageType.ERROR,
          title: 'Quên mật khẩu',
          message: 'Email không tồn tại!',
        });
      }
    } else {
      if (result) {
        NavigationActionService.showPopup({
          type: PopupType.ONE_BUTTON,
          typeMessage: MessageType.COMMON,
          title: 'Đăng ký',
          message: 'Email đã tồn tại, vui lòng nhập email khác.',
        });
      } else {
        NavigationActionService.navigate(INFORMATION_SCREEN, {
          email: getValues('email'),
        });
      }
    }
  };

  const onFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Lỗi',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const onRegister = handleSubmit(() => {
    Keyboard.dismiss();
    dispatch(
      checkEmailExist({
        email: getValues('email'),
        onSuccess: onSuccess,
        onFail: onFail,
      }),
    );
  });

  const onFocusEmail = () => {
    emailRef.current?.focus();
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  return {
    emailRef,
    control,
    errors,
    onFocusEmail,
    title,
    onRegister,
    id,
    goBack,
  };
};

export default useRegister;
