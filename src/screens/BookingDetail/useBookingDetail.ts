import {useRoute} from '@react-navigation/native';
import NavigationActionService from '../../navigation/navigation';
import {Service} from '../../modules/service/model';
import {formatStringDate} from '../../utils/date';
import CountDown from 'react-native-countdown-component';
import { createRef } from 'react';
import { BOOKING_DETAIL_SCREEN, CREATE_BOOKING_SCREEN } from '../../constants/screen_key';

const useBookingDetail = () => {
  const {booking} = useRoute().params as any;
  const [date, time] = booking.booking.datetimeBooking.split(' ');
  const datetimeNow = new Date().getTime() / 1000;
  const countdown =
    new Date(formatStringDate(date) + ' ' + time).getTime() / 1000;
    const countdownRef = createRef<CountDown>();
  const getStatusText = () => {
    switch (booking.booking.status) {
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
    booking.booking.services.map((service: any) => {
      totalTime += service.Service.time;
    });
    return totalTime;
  };

  const goBack = () => {
    NavigationActionService.pop();
  };

  const goToEditBooking = ()=>{
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN,{screen:BOOKING_DETAIL_SCREEN,booking:booking})
  }
  return {booking, goBack, getStatusText, getTotalTime, datetimeNow,countdown,countdownRef,goToEditBooking};
};

export default useBookingDetail;
