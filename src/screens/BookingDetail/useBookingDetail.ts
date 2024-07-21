import {useRoute} from '@react-navigation/native';
import NavigationActionService from '../../navigation/navigation';
import {formatStringDate} from '../../utils/date';
import CountDown from 'react-native-countdown-component';
import {createRef, useEffect, useRef, useState} from 'react';
import {
  BOOKING_DETAIL_SCREEN,
  CREATE_BOOKING_SCREEN,
  PREVIEW_RATING_SCREEN,
} from '../../constants/screen_key';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {
  addListImageBooking,
  getListImageBooking,
  updateStatusBooking,
} from '../../modules/booking';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {ApiError} from '../../constants/api';
import {getRatingBooking} from '../../modules/rate';
import {Rating} from '../../modules/rate/model';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import DocumentPicker from 'react-native-document-picker';

const useBookingDetail = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {booking} = useRoute().params as any;
  const [rating, setRating] = useState<Rating>();
  const [visible, setVisible] = useState(false);
  const [imagesUpload, setImagesUpload] = useState<string[]>([]);
  const datetimeNow = new Date().getTime() / 1000;
  const countdown =
    new Date(
      formatStringDate(booking.dateBooking) + ' ' + booking.timeBooking,
    ).getTime() / 1000;
  const countdownRef = createRef<CountDown>();
  const getStatusText = () => {
    switch (booking.status) {
      case 'upcoming':
        return 'Sắp tới';
      case 'ongoing':
        return 'Đang thực hiện';
      case 'completed':
        return 'Đã hoàn thành';
      case 'canceled':
        return 'Đã hủy';
    }
  };

  const [listImg, setListImg] = useState<Array<ImageSource>>([]);
  const idx = useRef(0);
  useEffect(() => {
    dispatch(
      getRatingBooking({
        bookingId: booking.id,
        reviewerId: userData.id,
        onSuccess: onGetRatingSuccess,
        onFail: onGetRatingFail,
      }),
    );
    if (booking.status === 'completed')
      dispatch(
        getListImageBooking({
          bookingId: booking.id,
          onSuccess: onGetSuccess,
          onFail: onGetFail,
        }),
      );
  }, []);

  const onGetSuccess = (value: Array<string>) => {
    const listdata: ImageSource[] = value.map(value => {
      return {uri: value};
    });
    setListImg(listdata);
  };

  const onGetFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lấy ảnh lỗi',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra trong lúc lấy ảnh',
      onPressPrimaryBtn: startBooking,
    });
  };

  const getTotalTime = () => {
    let totalTime = 0;
    booking.services.map((service: any) => {
      totalTime += service.time;
    });
    return totalTime;
  };

  const showPopupConfirm = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xác nhận bắt đầu làm',
      message: 'Bạn có chắc chắn muốn bắt đầu làm công việc này?',
      onPressPrimaryBtn: startBooking,
    });
  };

  const showPopupConfirmComplete = () => {
    if (!imagesUpload || imagesUpload.length <= 0) {
      NavigationActionService.showPopup({
        type: PopupType.ONE_BUTTON,
        typeMessage: MessageType.ERROR,
        title: 'Lỗi khi hoàn thành',
        message: 'Bạn chưa chọn ảnh nào cả',
      });
      return;
    }
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xác nhận đã hoàn thành',
      message: 'Bạn chắc chắn là đã hoàn thành rồi chứ?',
      onPressPrimaryBtn: completedBooking,
    });
  };

  const showPopupConfirmCancel = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.ERROR,
      title: 'Xác nhận hủy',
      message: 'Bạn chắc chắn muốn hủy lịch đặt này?',
      onPressPrimaryBtn: cancelBooking,
    });
  };

  const startBooking = () => {
    dispatch(
      updateStatusBooking({
        id: booking.id,
        status: 'ongoing',
        onSuccess: onChangeSuccess,
        onFail: onChangeFail,
      }),
    );
  };

  const onChangeSuccess = () => {
    NavigationActionService.pop();
  };

  const onChangeFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi khi chuyển trạng thái',
      message: error?.message || 'Một lỗi gì đó đã xảy ra',
    });
  };

  const completedBooking = () => {
    dispatch(
      addListImageBooking({
        bookingId: booking.id,
        images: imagesUpload,
        onSuccess: () => {},
        onFail: onChangeFail,
      }),
    );
    dispatch(
      updateStatusBooking({
        id: booking.id,
        status: 'completed',
        isPaid: true,
        onSuccess: onChangeSuccess,
        onFail: onChangeFail,
      }),
    );
  };

  const cancelBooking = () => {
    dispatch(
      updateStatusBooking({
        id: booking.id,
        status: 'canceled',
        onSuccess: onChangeSuccess,
        onFail: onChangeFail,
      }),
    );
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  const onGetRatingSuccess = (value?: Rating) => { 
    if (value) {
      setRating(value);
    }
  };

  const onGetRatingFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi khi chuyển trang',
      message: error?.message || 'Một lỗi gì đó đã xảy ra',
    });
  };

  const goToRatingPreview = () => {
    if (!rating) {
      NavigationActionService.navigate(PREVIEW_RATING_SCREEN, {
        booking: booking,
      });
    } else {
      NavigationActionService.navigate(PREVIEW_RATING_SCREEN, {
        booking: booking,
        rating: rating,
      });
    }
  };

  const goToEditBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN, {
      screen: BOOKING_DETAIL_SCREEN,
      booking: booking,
    });
  };

  const uploadImages = async () => {
    const images = await DocumentPicker.pick({
      mode: 'open',
      allowMultiSelection: true,
      type: DocumentPicker.types.images,
    });
    const listUri = images.map(img => {
      return img.uri;
    });
    setImagesUpload(listUri);
    setListImg(images);
  };

  return {
    booking,
    goBack,
    getStatusText,
    getTotalTime,
    datetimeNow,
    countdown,
    countdownRef,
    goToEditBooking,
    userData,
    showPopupConfirm,
    showPopupConfirmComplete,
    showPopupConfirmCancel,
    goToRatingPreview,
    rating,
    listImg,
    visible,
    setVisible,
    idx,
    uploadImages,
  };
};

export default useBookingDetail;
