import NavigationActionService from '../../../navigation/navigation';
import {useForm} from 'react-hook-form';
import {IServiceFormValues} from './model';
import {TextInput} from 'react-native';
import {useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validation';
import {useDispatch} from 'react-redux';
import {
  addNewService,
  checkServiceNameExist,
  deleteService,
  updateService,
} from '../../../modules/service';
import {ApiError} from '../../../constants/api';
import {MessageType, PopupType} from '../../../component/CustomPopup/type';
import {useRoute} from '@react-navigation/native';
import {Service} from '../../../modules/service/model';
const useAddService = () => {
  const route = useRoute();
  const {service} = route.params as any;

  const initValue: IServiceFormValues = {
    serviceName: '',
    price: 0,
    time: 0,
    description: '',
  };
  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: service ? (service as Service) : initValue,
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const serviceNameRef = useRef<TextInput>(null);
  const timeRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const [image, setImage] = useState(service ? service.image : '');

  const onFocusServiceName = () => {
    serviceNameRef.current?.focus();
  };

  const onFocusPrice = () => {
    serviceNameRef.current?.focus();
  };

  const onFocusTime = () => {
    serviceNameRef.current?.focus();
  };

  const onFocusDesciption = () => {
    serviceNameRef.current?.focus();
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

  const onAddSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: `${service ? 'Sửa' : 'Thêm'} dịch vụ`,
      message: `${service ? 'Sửa ' : 'Thêm'} dịch vụ thành công`,
    });
  };

  const onSuccess = (value: any) => {
    if (value && !service) {
      NavigationActionService.hideLoading();
      NavigationActionService.showPopup({
        type: PopupType.ONE_BUTTON,
        typeMessage: MessageType.ERROR,
        title: 'Lỗi thêm dịch vụ',
        message: 'Dịch vụ đã tồn tại',
      });
      return;
    } else {
      if (service) {
        dispatch(
          updateService({
            service: {
              id: service.id,
              image: image,
              serviceName: getValues('serviceName'),
              time: getValues('time'),
              price: getValues('price'),
              description: getValues('description'),
            },
            onSuccess: onAddSuccess,
            onFail: onFail,
          }),
        );
      } else {
        dispatch(
          addNewService({
            serviceName: getValues('serviceName'),
            time: getValues('time'),
            price: getValues('price'),
            description: getValues('description'),
            image: image,
            onFail: onFail,
            onSuccess: onAddSuccess,
          }),
        );
      }
    }
  };

  const onFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi thêm dịch vụ',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra trong lúc thêm',
    });
  };

  const addService = handleSubmit(() => {
    NavigationActionService.showLoading();
    dispatch(
      checkServiceNameExist({
        serviceName: getValues('serviceName'),
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
      title: 'Xóa dịch vụ',
      message: 'Xóa dịch vụ thành công',
    });
  };

  const onDeleteFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi xóa dịch vụ',
      message: error?.message || 'Có lỗi gì đó đã xảy ra',
    });
  };

  const confirmDelete = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xóa dịch vụ',
      message:
        'Sau khi xóa dịch vụ, các dữ liệu liên quan đến cũng sẽ xóa theo, bạn chắc chắn muốn xóa chứ?',
      onPressPrimaryBtn: deleteOneService,
    });
  };

  const deleteOneService = () => {
    dispatch(
      deleteService({
        id: service.id,
        onSuccess: onDeleteSuccess,
        onFail: onDeleteFail,
      }),
    );
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  return {
    goBack,
    control,
    errors,
    onFocusServiceName,
    onFocusPrice,
    onFocusDesciption,
    onFocusTime,
    serviceNameRef,
    priceRef,
    timeRef,
    descriptionRef,
    onUploadImage,
    image,
    addService,
    service,
    confirmDelete
  };
};

export default useAddService;
