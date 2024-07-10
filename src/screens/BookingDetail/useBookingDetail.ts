import {useRoute} from '@react-navigation/native';
import NavigationActionService from '../../navigation/navigation';
import {Service} from '../../modules/service/model';
import {formatStringDate} from '../../utils/date';
import CountDown from 'react-native-countdown-component';
import {createRef} from 'react';
import {
  BOOKING_DETAIL_SCREEN,
  CREATE_BOOKING_SCREEN,
  PREVIEW_RATING_SCREEN,
} from '../../constants/screen_key';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {updateStatusBooking} from '../../modules/booking';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {ApiError} from '../../constants/api';

const useBookingDetail = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {booking} = useRoute().params as any;
  const [date, time] = booking.datetimeBooking.split(' ');
  const datetimeNow = new Date().getTime() / 1000;
  const countdown =
    new Date(formatStringDate(date) + ' ' + time).getTime() / 1000;
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
      onClosePopup: () => {},
    });
  };

  const showPopupConfirmComplete = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xác nhận đã hoàn thành',
      message: 'Bạn chắc chắn là đã hoàn thành rồi chứ?',
      onPressPrimaryBtn: completedBooking,
      onClosePopup: () => {},
    });
  };

  const showPopupConfirmCancel = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.ERROR,
      title: 'Xác nhận hủy',
      message: 'Bạn chắc chắn muốn hủy lịch đặt này?',
      onPressPrimaryBtn: cancelBooking,
      onClosePopup: () => {},
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
      updateStatusBooking({
        id: booking.id,
        status: 'completed',
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

  const goToRatingPreview = ()=>{
    NavigationActionService.navigate(PREVIEW_RATING_SCREEN);
  }
  const goToEditBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN, {
      screen: BOOKING_DETAIL_SCREEN,
      booking: booking,
    });
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
    goToRatingPreview
  };
};

export default useBookingDetail;
