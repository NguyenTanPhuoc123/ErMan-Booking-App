import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {FormInfoUserValues} from './model';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {ApiError} from '../../../constants/api';
import NavigationActionService from '../../../navigation/navigation';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {Keyboard} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RootState} from '../../../redux/reducers';
import {IBranchState} from '../../../modules/branch/model';
import {getListBranchs} from '../../../modules/branch';
import moment from 'moment';
import {addNewStaff, deleteUser, editProfile} from '../../../modules/user';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validation';
import {checkEmailExist} from '../../../modules/auth';
export const data = [
  {label: 'Nhân viên', value: 'Staff'},
  {label: 'Quản trị viên', value: 'Admin'},
];

const useAddUser = () => {
  const {user} = useRoute().params as any;
  const [noedit, setNoedit] = useState(true);

  const initValue: FormInfoUserValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    typeAccount: 'Staff',
    birthday: '01-01-2000',
    address: '',
    workPlace: 1,
    timeStartWork: moment().format('DD-MM-YYYY'),
  };

  const userValue = {
    id: user?.id,
    firstname: user?.firstname,
    lastname: user?.lastname,
    avatar: user?.avatar,
    address: user?.address,
    email: user?.email,
    isVerified: user?.isVerified,
    password: '123456@aA',
    birthday: user?.birthday,
    typeAccount: user?.typeAccount,
    workPlace: user?.typeAccount!='Customer' ? user?.workPlace.id :'',
    timeStartWork: user?.typeAccount!='Customer'? user?.timeStartWork : '',
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormInfoUserValues>({
    defaultValues: user ? userValue : initValue,
    resolver: yupResolver(validationSchema),
  });

  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);

  const dispatch = useDispatch();
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);
  useEffect(() => {
    if (user) setNoedit(false);
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
      title: user ? 'Chỉnh sửa thông tin' : 'Thêm nhân viên mới',
      message: user
        ? 'Thay đổi thông tin thành công'
        : 'Thêm mới nhân viên thành công',
    });
  };

  const onCreateFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: user
        ? 'Chỉnh sửa thông tin thất bại'
        : 'Thêm nhân viên mới thất bại',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const onCheckSuccess = (value: any) => {
    if (value && !user) {
      NavigationActionService.hideLoading();
      NavigationActionService.showPopup({
        type: PopupType.ONE_BUTTON,
        typeMessage: MessageType.ERROR,
        title: 'Lỗi thêm nhân viên',
        message: 'Email đã tồn tại',
      });
      return;
    }
    if (user) {
      dispatch(
        editProfile({
          id: user.id,
          workPlace: getValues('workPlace'),
          onSuccess: onCreateSuccess,
          onFail: onCreateFail,
        }),
      );
    } else {
      dispatch(
        addNewStaff({
          body: {
            firstname: getValues('firstname'),
            lastname: getValues('lastname'),
            email: getValues('email'),
            birthday: getValues('birthday'),
            address: getValues('address') || '',
            password: getValues('password'),
            typeAccount: getValues('typeAccount') as
              | 'Customer'
              | 'Staff'
              | 'Admin',
            timeStartWork:
              getValues('typeAccount') === 'Staff' ||
              getValues('typeAccount') === 'Admin'
                ? getValues('timeStartWork')
                : '',
            workPlace:
              getValues('typeAccount') === 'Staff' ||
              getValues('typeAccount') === 'Admin'
                ? getValues('workPlace')
                : 1,
          },
          onSuccess: onCreateSuccess,
          onFail: onCreateFail,
        }),
      );
    }
  };

  const createNewUser = handleSubmit(() => {
    Keyboard.dismiss();
    NavigationActionService.showLoading();
    dispatch(
      checkEmailExist({
        email: getValues('email'),
        onSuccess: onCheckSuccess,
        onFail: onCreateFail,
      }),
    );
  });

  const confirmDelete = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xóa người dùng',
      message:
        'Sau khi xóa người dùng, các dữ liệu liên quan đến có thể sẽ mất, bạn chắc chắn muốn xóa chứ?',
      onPressPrimaryBtn: deleteOneUser,
    });
  };

  const onDeleteSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Xóa người dùng',
      message: 'Xóa người dùng thành công',
    });
  };

  const onDeleteFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi xóa người dùng',
      message: error?.message || 'Có lỗi gì đó đã xảy ra',
    });
  };

  const deleteOneUser = () => {
    dispatch(
      deleteUser({
        id: user.id,
        onSuccess: onDeleteSuccess,
        onFail: onDeleteFail,
      }),
    );
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
    openPicker,
    closePicker,
    user,
    goBack,
    open,
    onFocusAddress,
    branchs,
    noedit,
    confirmDelete,
  };
};

export default useAddUser;
