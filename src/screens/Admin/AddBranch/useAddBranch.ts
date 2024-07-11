import {useDispatch} from 'react-redux';
import NavigationActionService from '../../../navigation/navigation';
import {useRoute} from '@react-navigation/native';
import {IBranchFormValues} from './model';
import {useForm} from 'react-hook-form';
import {Branch} from '../../../modules/branch/model';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validation';
import {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  addNewBranch,
  checkBranchExist,
  deleteBranch,
  updateBranch,
} from '../../../modules/branch';
import {ApiError} from '../../../constants/api';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';

const useAddBranch = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {branch} = route.params as any;
  const initValue: IBranchFormValues = {
    branchName: '',
    openTime: '08:00',
    closeTime: '20:00',
    address: '',
    description: '',
  };
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: branch ? (branch as Branch) : initValue,
    resolver: yupResolver(validationSchema),
  });
  const [image, setImage] = useState(branch ? branch.image : '');
  const branchNameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(false);
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);
  const onFocusBranchName = () => {
    branchNameRef.current?.focus();
  };

  const onFocusAddress = () => {
    addressRef.current?.focus();
  };

  const onFocusDesciption = () => {
    descriptionRef.current?.focus();
  };

  const onUploadImage = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        mode: 'open',
        type: DocumentPicker.types.images,
      });
      setImage(image.uri);
    } catch (error) {
      console.log('Error upload image: ', error);
    }
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  const onAddSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: `${branch ? 'Sửa' : 'Thêm'} chi nhánh`,
      message: `${branch ? 'Sửa ' : 'Thêm'} chi nhánh thành công`,
    });
  };

  const onSuccess = (value: any) => {
    if (value && !branch) {
      NavigationActionService.hideLoading();
      NavigationActionService.showPopup({
        type: PopupType.ONE_BUTTON,
        typeMessage: MessageType.ERROR,
        title: 'Lỗi thêm chi nhánh',
        message: 'Chi nhánh đã tồn tại',
      });
      return;
    }

    if (branch) {
      dispatch(
        updateBranch({
          branch: {
            id: branch.id,
            image: image,
            branchName: getValues('branchName'),
            openTime: getValues('openTime'),
            closeTime: getValues('closeTime'),
            address: getValues('address'),
            description: getValues('description'),
          },
          onSuccess: onAddSuccess,
          onFail: onFail,
        }),
      );
    } else {
      dispatch(
        addNewBranch({
          branchName: getValues('branchName'),
          openTime: getValues('openTime'),
          closeTime: getValues('closeTime'),
          description: getValues('description'),
          address: getValues('address'),
          image: image,
          onFail: onFail,
          onSuccess: onAddSuccess,
        }),
      );
    }
  };

  const onFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi thêm chi nhánh',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra trong lúc thêm',
    });
  };

  const createBranch = handleSubmit(() => {
    NavigationActionService.showLoading();
    dispatch(
      checkBranchExist({
        branchName: getValues('branchName'),
        onSuccess: onSuccess,
        onFail: onFail,
      }),
    );
  });

  const onDeleteSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Xóa chi nhánh',
      message: 'Xóa chi nhánh thành công',
    });
  };

  const onDeleteFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi xóa chi nhánh',
      message: error?.message || 'Có lỗi gì đó đã xảy ra',
    });
  };

  const confirmDelete = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xóa chi nhánh',
      message:
        'Sau khi xóa chi nhánh, các dữ liệu liên quan đến có thể sẽ mất, bạn chắc chắn muốn xóa chứ?',
      onPressPrimaryBtn: deleteOneBranch,
    });
  };

  const deleteOneBranch = () => {
    dispatch(
      deleteBranch({
        branchId: branch.id,
        onSuccess: onDeleteSuccess,
        onFail: onDeleteFail,
      }),
    );
  };

  return {
    goBack,
    branch,
    control,
    branchNameRef,
    addressRef,
    descriptionRef,
    onFocusBranchName,
    onFocusAddress,
    onFocusDesciption,
    errors,
    image,
    onUploadImage,
    createBranch,
    open,
    openPicker,
    closePicker,
    confirmDelete,
  };
};

export default useAddBranch;
