import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {useRoute} from '@react-navigation/native';
import {RootState} from '../../redux/reducers';
import {IUserState, Staff} from '../../modules/user/model';
import {useEffect, useState} from 'react';
import {getListStaff} from '../../modules/user';
import moment from 'moment';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {ApiError} from '../../constants/api';
import {createNewBooking, editBooking} from '../../modules/booking';
import {IAuthState} from '../../modules/auth/model';
import {BOOKING_DETAIL_SCREEN} from '../../constants/screen_key';

const useCreateBooking = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const screen = (params as any).screen || '';
  const booking = (params as any).booking || null;
  const services =
    screen === BOOKING_DETAIL_SCREEN && booking
      ? booking.services
      : (params as any).services || [];
  const branch =
    screen === BOOKING_DETAIL_SCREEN && booking
      ? booking.branch
      : (params as any).branch || null;
  const stylists = useSelector<RootState, IUserState>(
    state => state.user,
  ).staffs.filter(user => {
    if (user.typeAccount === 'Staff' && branch) {
      if ((user as Staff).workPlace.id === branch.id) return user;
    }
  });
  const [stylist, setStylist] = useState<Staff>(
    screen === BOOKING_DETAIL_SCREEN && booking ? booking.staff : null,
  );

  const dateNow = moment(new Date()).format('DD-MM-YYYY');
  const [date, setDate] = useState(booking ? booking.dateBooking : dateNow);
  const [time, setTime] = useState(booking ? booking.timeBooking : '');
  const payments = [
    {id: '1', name: 'Tiền mặt'},
    {id: '2', name: 'VnPay'},
  ];
  const [payment, setPayment] = useState(payments[0].id);
  useEffect(() => {
    dispatch(
      getListStaff({
        limit: 100,
        page: 1,
        onSuccess: () => {},
        onFail: () => {},
      }),
    );
  }, []);

  const onCreateSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: booking ? 'Chỉnh sửa lịch đặt' : 'Đặt lịch',
      message: booking
        ? 'Chỉnh sửa lịch đặt thành công'
        : 'Đặt lịch thành công',
      onPressPrimaryBtn: () => NavigationActionService.popToRoot(),
    });
  };

  const onCreateFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: booking ? 'Chỉnh sửa lịch đặt thất bại' : 'Đặt lịch thất bại',
      message: error?.message || 'Có lỗi gì đó đã xảy ra',
    });
  };

  const createBooking = () => {
    NavigationActionService.showLoading();
    if (services.lenght <= 0 || !branch || !stylist || !date || !time) {
      showPopupError();
      NavigationActionService.hideLoading();
      return;
    }

    if (booking) {
      dispatch(
        editBooking({
          onSuccess: onCreateSuccess,
          onFail: onCreateFail,
          bookingId: booking.id,
          body: {
            branch: branch,
            services: services,
            customer: userData,
            staff: stylist,
            isPaid: false,
            dateBooking: date,
            timeBooking: time,
          },
        }),
      );
    } else {
      dispatch(
        createNewBooking({
          onSuccess: onCreateSuccess,
          onFail: onCreateFail,
          body: {
            branch: branch,
            services: services,
            customer: userData,
            staff: stylist,
            isPaid: false,
            dateBooking: date,
            timeBooking: time,
          },
        }),
      );
    }
  };
  const showPopupError = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Đặt lịch thất bại',
      message: 'Vui lòng chọn đầy đủ thông tin',
    });
  };

  const goBack = () => {
    NavigationActionService.popToRoot();
  };
  return {
    goBack,
    services,
    branch,
    stylists,
    stylist,
    setStylist,
    date,
    setDate,
    time,
    setTime,
    createBooking,
    screen,
    booking,
    payments,
    payment,
    setPayment,
  };
};

export default useCreateBooking;
