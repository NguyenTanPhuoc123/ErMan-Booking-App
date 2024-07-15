import {Staff} from './../../../modules/user/model';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {useEffect, useState} from 'react';
import {getListCustomer, getListStaff} from '../../../modules/user';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {
  IBookingState,
} from '../../../modules/booking/model';
import {
  getListAllBooking,
} from '../../../modules/booking';
import {ApiError} from '../../../constants/api';

const useDasboard = () => {
  const dispatch = useDispatch();
  const [numberInput, setNumberInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [currenYear, setCurrenYear] = useState(new Date().getFullYear());
  const {users} = useSelector<RootState, IUserState>(state => state.user);
  const {staffs} = useSelector<RootState, IUserState>(state => state.user);
  const listStaff = staffs.filter(staff => staff.typeAccount === 'Staff');
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const listBooking = bookings.filter(
    bookings => bookings.status === 'completed',
  );
  const handlenChangeText = (text: any) => {
    setCurrenYear(text);
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
    dispatch(getListCustomer({
      page: 1,
      limit: 100,
      onSuccess: loadSuccess,
      onFail: loadFail,
    }))
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [refresh]);

  const loadSuccess = () => {
    setRefresh(false);
    setLoading(false);
  };

  const loadFail = () => {
    setRefresh(false);
    setLoading(false);
  };

  const lineCharData: ChartData = {
    labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
    datasets: [
      {
        data: [15, 19, 10, 22],
        color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return {
    numberInput,
    handlenChangeText,
    loading,
    listBooking,
    listStaff,
    lineCharData,
    currenYear,
    users
  };
};

export default useDasboard;
