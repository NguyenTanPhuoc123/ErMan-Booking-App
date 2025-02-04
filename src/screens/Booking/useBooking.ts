import {useEffect, useRef, useState} from 'react';
import {
  CREATE_BOOKING_SCREEN,
} from '../../constants/screen_key';
import NavigationActionService from '../../navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IBookingState} from '../../modules/booking/model';
import {getListBookings} from '../../modules/booking';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {ApiError} from '../../constants/api';
import {IAuthState} from '../../modules/auth/model';


const useBooking = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const [refresh, setRefresh] = useState(false);
  const routes = useRef([
    {
      key: 'upcoming',
      title: `Sắp tới`,
    },
    {
      key: 'ongoing',
      title: `Đang làm`,
    },
    {
      key: 'completed',
      title: `Đã xong`,
    },
    {
      key: 'canceled',
      title: `Đã hủy`,
    },
  ]);

  useEffect(() => {
    dispatch(
      getListBookings({
        limit: 100,
        id: userData.id,
        onSuccess: onLoadSuccess,
        onFail: onLoadFail,
      }),
    );
  }, [refresh]);

  const onLoadSuccess = () => {
    setRefresh(false);
  };
  const onLoadFail = (error?: ApiError) => {
    setRefresh(false);
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lấy lịch đặt thất bại',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const pullRefresh = () => {
    setRefresh(true);
  };

  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN);
  };

  return {
    index,
    setIndex,
    routes,
    goToCreateBooking,
    bookings,
    refresh,
    pullRefresh,
  };
};

export default useBooking;
