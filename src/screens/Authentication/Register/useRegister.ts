import {yupResolver} from '@hookform/resolvers/yup';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {validationSchema} from './validation';
import NavigationActionService from '../../../navigation/navigation';
import {
  INFORMATION_SCREEN,
  VERIFY_PHONE_SCREEN,
} from '../../../constants/screen_key';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {verifyEmail} from '../../../modules/auth';

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

  const onRegister = handleSubmit(() => {
     //dispatch(verifyPhone({phone:getValues('phone')}));

    NavigationActionService.navigate(VERIFY_PHONE_SCREEN, {
      id: id,
      email: getValues('email'),
    });
  });

  const onFocusEmail = () => {
    emailRef.current?.focus();
  };

  return {
    emailRef,
    control,
    errors,
    onFocusEmail,
    title,
    onRegister,
    id,
  };
};

export default useRegister;
