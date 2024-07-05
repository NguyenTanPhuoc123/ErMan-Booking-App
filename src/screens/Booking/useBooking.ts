import {useState} from 'react';
import {
  CREATE_BOOKING_SCREEN,
  NOTIFICATION_SCREEN,
} from '../../constants/screen_key';
import NavigationActionService from '../../navigation/navigation';

const useBooking = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'upcoming',
      title: 'Sắp tới',
    },
    {
      key: 'ongoing',
      title: 'Đang làm',
    },
    {
      key: 'complete',
      title: 'Đã xong',
    },
    {
      key: 'canceled',
      title: 'Đã huỷ',
    },
  ]);
  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };

  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN);
  };

  return {goToNotifcation, index, setIndex, routes, goToCreateBooking};
};

export default useBooking;
