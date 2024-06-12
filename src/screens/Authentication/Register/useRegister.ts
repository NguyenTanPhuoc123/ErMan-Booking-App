import {yupResolver} from '@hookform/resolvers/yup';
import {useRef} from 'react';
import {useForm} from 'react-hook-form';
import {TextInput} from 'react-native';
import {validationSchema} from './validation';
import NavigationActionService from '../../../navigation/navigation';
import {
  REGISTER_SCREEN,
  VERIFY_PHONE_SCREEN,
} from '../../../constants/screen_key';
import {useRoute} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { verifyPhone } from '../../../modules/auth';

const useRegister = () => {
  const phoneRef = useRef<TextInput>(null);
  const route = useRoute();
  const dispatch = useDispatch();
  const {id, title} = route.params as any;
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {phone: ''},
    resolver: yupResolver(validationSchema),
  });

  const onFocusPhone = () => {
    phoneRef.current?.focus();
  };

  const onRegister = handleSubmit(() => {
    const phoneFormat = getValues('phone').replace(getValues('phone')[0],'+84 ');
    console.log(phoneFormat);
    dispatch(verifyPhone({phone:getValues('phone')}));
    NavigationActionService.navigate(VERIFY_PHONE_SCREEN, {id: id,phone:getValues("phone")});
  });

  return {
    phoneRef,
    control,
    errors,
    onFocusPhone,
    onRegister,
    title,
    id
  };
};

export default useRegister;
