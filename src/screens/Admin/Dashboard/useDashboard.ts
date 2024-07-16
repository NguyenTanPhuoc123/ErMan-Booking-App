import {Staff} from './../../../modules/user/model';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {useCallback, useEffect, useState} from 'react';
import {getListCustomer, getListStaff} from '../../../modules/user';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {IBookingState} from '../../../modules/booking/model';
import {getListAllBooking} from '../../../modules/booking';
import {ApiError} from '../../../constants/api';
import moment from 'moment';
import { EventTypes } from 'react-native-month-year-picker';

const useDasboard = () => {
  const dispatch = useDispatch();
  const [monthStatiscal, setMonthStatiscal] = useState(moment().format('MM-YYYY'));
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [income,setIncome] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const {users} = useSelector<RootState, IUserState>(state => state.user);
  const {staffs} = useSelector<RootState, IUserState>(state => state.user);
  const listStaff = staffs.filter(staff => staff.typeAccount === 'Staff');
  const [open,setOpen] = useState(false);
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const [listBooking, setListBooking] = useState(
    bookings.filter(bookings => bookings.status == 'completed'),
  );
  const handlenChangeText = (text: any) => {
    setCurrentYear(text);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      getListAllBooking({
        onSuccess: loadSuccess,
        onFail: (error?: ApiError) => {
          console.log(error);
        },
      }),
    );
    dispatch(
      getListStaff({
        page: 1,
        limit: 100,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
    dispatch(
      getListCustomer({
        page: 1,
        limit: 100,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [refresh]);

  const loadSuccess = () => {
    setRefresh(false);
    setLoading(false);
    let total = 0 ;
    setListBooking(bookings.filter(bookings => bookings.status == 'completed'));
    listBooking.map(booking=>{
      total+=booking.total;
    })
    setIncome(total);
  };
  const pullRefresh = () => {
    setRefresh(true);
  };
  const loadFail = () => {
    setRefresh(false);
    setLoading(false);
  };

  const lineCharData: ChartData = {
    labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
    datasets: [
      {
        data: [11, 22, 47, 30],
        color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const onValueChange = useCallback(
    (event: EventTypes, newDate: Date) => {
      const selectedDate = newDate || monthStatiscal;

      closePicker();
      setMonthStatiscal(moment(selectedDate).format('MM-YYYY'));
    },
    [monthStatiscal, open],
  );

  return {
    monthStatiscal,
    setMonthStatiscal,
    handlenChangeText,
    loading,
    listBooking,
    listStaff,
    lineCharData,
    currentYear,
    users,
    refresh,
    pullRefresh,
    income,
    open,
    openPicker,
    closePicker,
    onValueChange
  };
};

export default useDasboard;
