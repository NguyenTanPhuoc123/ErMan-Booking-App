import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {useRoute} from '@react-navigation/native';
import {RootState} from '../../redux/reducers';
import {IUserState, Staff} from '../../modules/user/model';
import {useEffect, useState} from 'react';
import {getListStaff} from '../../modules/user';
import moment from 'moment';

const useCreateBooking = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const stylists = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user => user.typeAccount === 'Staff');
  const services = (params as any).services || [];
  const branch = (params as any).branch || null;
  const [stylist, setStylist] = useState<Staff>();
  const dateNow = moment(new Date()).format('DD-MM-YYYY');
  const timeNow = moment(new Date()).format('HH:MM');
  const [date, setDate] = useState(dateNow);
  const [time, setTime] = useState(timeNow);

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

  const createBooking = () => {
    console.log('Service: ', services);
    console.log('Branch: ', branch);
    console.log('Stylist: ', stylist);
    console.log('Date: ', date);
    console.log('Time: ', time);
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
  };
};

export default useCreateBooking;
