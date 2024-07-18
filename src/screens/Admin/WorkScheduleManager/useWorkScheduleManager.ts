import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IBookingState} from '../../../modules/booking/model';
import {useEffect, useState} from 'react';
import {getListAllBooking, getListBooked} from '../../../modules/booking';

const useWorkScheduleManager = () => {
  const dispatch = useDispatch();
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    dispatch(
      getListAllBooking({
        onSuccess: () => {},
        onFail: () => {},
      }),
    );
  }, [refresh]);

  const pullRefresh = ()=>{
    setRefresh(true);
  }
  const onSuccess = ()=>{
    setLoading(false);
    setRefresh(false);
  }

  const onFail = ()=>{
    setLoading(false);
    setRefresh(false);
  }
  return {bookings};
};

export default useWorkScheduleManager;
