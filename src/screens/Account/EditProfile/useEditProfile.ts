import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IAuthState} from '../../../modules/auth/model';
import NavigationActionService from '../../../navigation/navigation';
import {useForm} from 'react-hook-form';
import {User} from '../../../modules/user/model';
import {useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validation';
import {ApiError} from '../../../constants/api';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {editProfile} from '../../../modules/auth';

export interface FormEditUser {
  firstname: string;
  lastname: string;
  birthday: string;
  address: string;
}
const useEditProfile = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormEditUser>({
    defaultValues: {...currentUser},
    resolver: yupResolver(validationSchema),
  });
  const firstnameRef = useRef<TextInput>(null);
  const lastnameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const onFocusFirstname = () => {
    firstnameRef.current?.focus();
  };

  const onFocusLastname = () => {
    lastnameRef.current?.focus();
  };

  const onFocusAddress = () => {
    addressRef.current?.focus();
  };

  const goBack = () => {
    NavigationActionService.pop();
  };
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);

  const onUploadAvatar = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        mode: 'open',
        type: DocumentPicker.types.images,
      });
      setAvatar(image.uri);
    } catch (error) {
      console.log('Error upload image: ', error);
    }
  };

  const onEditSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Chỉnh sửa thông tin',
      message: 'Chỉnh sửa thông tin thành công!',
    });
  };

  const onEditFailed = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Chỉnh sửa thông tin',
      message:
        error?.message || 'Có một lỗi gì đó đã xảy ra trong lúc chỉnh sửa',
    });
  };

  const onEditSubmit = handleSubmit(() => {
    Keyboard.dismiss();
    NavigationActionService.showLoading();
    console.log(currentUser);
    const dataEdit: User = {
      id: currentUser.id,
      avatar: avatar,
      firstname: getValues('firstname'),
      lastname: getValues('lastname'),
      birthday: getValues('birthday'),
      address: getValues('address'),
      isVerified: currentUser.isVerified,
      email: currentUser.email,
      typeAccount: currentUser.typeAccount,
    };
    dispatch(
      editProfile({
        user: dataEdit,
        onSuccess: onEditSuccess,
        onFail: onEditFailed,
      }),
    );
  });
  return {
    currentUser,
    goBack,
    firstnameRef,
    lastnameRef,
    control,
    errors,
    onFocusFirstname,
    onFocusLastname,
    open,
    openPicker,
    closePicker,
    addressRef,
    onFocusAddress,
    onUploadAvatar,
    avatar,
    onEditSubmit,
  };
};

export default useEditProfile;
