import {useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormInfoUserValues} from './model';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addNewUser} from '../../../modules/user';
import {ApiError} from '../../../constants/api';
import NavigationActionService from '../../../navigation/navigation';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {Keyboard} from 'react-native';
import {useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {RootState} from '../../../redux/reducers';
import {IBranchState} from '../../../modules/branch/model';
import {getListBranchs} from '../../../modules/branch';
export const data = [
  // {label: 'Khách hàng', value: 'Customer'},
  {label: 'Nhân viên', value: 'Staff'},
  {label: 'Quản trị viên', value: 'Admin'},
];

const useAddUser = () => {
  const {user} = useRoute().params as any;
  const initValue: FormInfoUserValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    typeAccount: 'Staff',
    gender: true,
    birthday: '01-01-2000',
    address: '',
    workPlace: 1,
    workStartTime:'01-01-2024'
  };
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormInfoUserValues>({
    defaultValues: user || initValue,
  });
  const formatStringDate = (dateStr: string) => {
    const [date, month, year] = dateStr.split('-');
    return `${year}-${month}-${date}`;
  };
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(user ? user.avatar : '');
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const [type,setType] = useState("Customer");
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);

  useEffect(() => {
    dispatch(
      getListBranchs({
        page: 1,
        limit: 100,
      }),
    );
  }, []);
  const onFocusFirstName = () => {
    firstNameRef.current?.focus();
  };

  const onFocusLastName = () => {
    lastNameRef.current?.focus();
  };

  const onFocusEmail = () => {
    emailRef.current?.focus();
  };

  const onFocusPassword = () => {
    passwordRef.current?.focus();
  };

  const onCreateSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Tạo người dùng mới',
      message: 'Tạo người dùng mới thành công',
    });
  };

  const onCreateFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Tạo người dùng mới',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };
  
  const createNewUser = handleSubmit(() => {
    Keyboard.dismiss();
    NavigationActionService.showLoading();
    dispatch(
      addNewUser({
        body: {
          firstname: getValues('firstname'),
          lastname: getValues('lastname'),
          email: getValues('email'),
          password: getValues('password'),
        },
        typeAccount: type as "Customer" | "Staff" | "Admin" || 'Staff',
        timeStartWork: type==="Staff" || type==="Admin" ? getValues('workStartTime') : '',
        workPlace: type==="Staff" || type==="Admin" ? getValues('workPlace') : 0,
        onSuccess: onCreateSuccess,
        onFail: onCreateFail,
      }),
    );
  });
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

  const goBack = () => {
    NavigationActionService.pop();
  };
  const [open, setOpen] = useState(false);
  const onFocusAddress = () => {
    addressRef.current?.focus();
  };

  return {
    control,
    errors,
    firstNameRef,
    lastNameRef,
    passwordRef,
    emailRef,
    addressRef,
    onFocusFirstName,
    onFocusLastName,
    onFocusPassword,
    onFocusEmail,
    createNewUser,
    formatStringDate,
    openPicker,
    closePicker,
    user,
    goBack,
    open,
    onUploadAvatar,
    onFocusAddress,
    branchs,
    type,
    setType
  };
};

export default useAddUser;
