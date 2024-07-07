import {useEffect, useState} from 'react';
import {
  CREATE_BOOKING_SCREEN,
  NOTIFICATION_SCREEN,
} from '../../constants/screen_key';
import NavigationActionService from '../../navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IBookingState} from '../../modules/booking/model';
import {getListBookings} from '../../modules/booking';

const useBooking = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const [routes] = useState([
    {
      key: 'upcoming',
      title: `(${
        bookings.filter(booking => booking.status === 'upcoming').length
      })\n Sắp tới`,
    },
    {
      key: 'ongoing',
      title: `(${
        bookings.filter(booking => booking.status === 'ongoing').length
      })\n Đang làm`,
    },
    {
      key: 'completed',
      title: `(${
        bookings.filter(booking => booking.status === 'completed').length
      })\n Đã xong`,
    },
    {
      key: 'canceled',
      title: `(${
        bookings.filter(booking => booking.status === 'canceled').length
      })\n Đã hủy`,
    },
  ]);

  useEffect(() => {
    dispatch(
      getListBookings({
        limit: 4,
        onSuccess: () => {},
        onFail: () => {},
      }),
    );
  }, []);

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };

  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN);
  };

  return {
    goToNotifcation,
    index,
    setIndex,
    routes,
    goToCreateBooking,
    bookings,
  };
};

export default useBooking;
