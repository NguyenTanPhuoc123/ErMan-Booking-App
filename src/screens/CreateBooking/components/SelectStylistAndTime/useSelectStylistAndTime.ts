import moment from 'moment';
import {createRef,useState} from 'react';
import {FlatList} from 'react-native';
import { ApiError } from '../../../../constants/api';
import NavigationActionService from '../../../../navigation/navigation';
import { MessageType, PopupType } from '../../../../component/CustomPopup/type';
import { Booking } from '../../../../modules/booking/model';

const useSelectStylistAndTime = () => {
  const stylistRef = createRef<FlatList>();
  const timeRef = createRef<FlatList>();
  const timeNow = moment(new Date()).format('HH:MM');
  const dateNow = moment(new Date()).format('DD-MM-YYYY');
  const [open, setOpen] = useState(false);
  const [bookings,setBookings] = useState<Booking[]>([]);

  const onSuccess = (value:Booking[])=>{
    setBookings(value);
  }

  const onFail = (error?:ApiError)=>{
    NavigationActionService.showPopup({
      type:PopupType.ONE_BUTTON,
      typeMessage:MessageType.ERROR,
      title:'Lỗi load lịch trống',
      message:error?.message || 'Có một lỗi gì đó đã xảy ra',
      onPressPrimaryBtn:()=>NavigationActionService.pop()
    })
  }

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
    dateNow,
    timeNow,
    onSuccess,
    onFail,
    bookings
  };
};

export default useSelectStylistAndTime;
