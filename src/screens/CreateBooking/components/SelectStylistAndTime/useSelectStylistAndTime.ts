import moment from 'moment';
import {createRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ApiError} from '../../../../constants/api';
import NavigationActionService from '../../../../navigation/navigation';
import {MessageType, PopupType} from '../../../../component/CustomPopup/type';
import {Booking} from '../../../../modules/booking/model';
import {isTimeAvailable} from '../../../../utils/date';

const useSelectStylistAndTime = () => {
  const stylistRef = createRef<FlatList>();
  const timeRef = createRef<FlatList>();
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [listTimeBooked, setListTimeBooked] = useState<string[]>([]);
  const [listDateBooked, setListDateBooked] = useState<string[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const onSuccess = (value: Booking[]) => {
    setBookings(value);
    setListTimeBooked(
      value && value.length > 0
        ? value.map(booking => booking.timeBooking)
        : [],
    );
    setListDateBooked(
      value && value.length > 0
        ? value.map(booking => booking.dateBooking)
        : [],
    );

    if (value && value.length > 0) {
      value.map(booking => {
        booking.services.map(service => {
          setTotalTime(totalTime + service.time);
        });
      });
    } else {
      setTotalTime(0);
    }
    console.log('Time proccess: ', totalTime);
  };

  const onFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi load lịch trống',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
      onPressPrimaryBtn: () => {
        NavigationActionService.pop();
      },
    });
  };

  const openPicker = () => {
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
  };
  return {
    stylistRef,
    timeRef,
    openPicker,
    closePicker,
    open,
    onSuccess,
    onFail,
    bookings,
    listTimeBooked,
    listDateBooked,
    totalTime,
  };
};

export default useSelectStylistAndTime;
