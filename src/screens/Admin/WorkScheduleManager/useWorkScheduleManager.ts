import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {Booking, IBookingState} from '../../../modules/booking/model';
import {createRef, useEffect, useState} from 'react';
import {getListAllBooking} from '../../../modules/booking';
import {FlatList} from 'react-native';
import moment from 'moment';
import {IBranchState} from '../../../modules/branch/model';
import {getListBranchs} from '../../../modules/branch';
import {IAuthState} from '../../../modules/auth/model';
import {Admin} from '../../../modules/user/model';
import {getListBookingsByBranch} from '../../../modules/booking/';

const useWorkScheduleManager = () => {
  const dispatch = useDispatch();
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [branchId, setBranchId] = useState((userData as Admin).workPlace.id);
  const listBookingRef = createRef<FlatList>();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getListBookingsByBranch({
        branchId: branchId,
        onSuccess: onSuccess,
        onFail: onFail,
      }),
    );
    dispatch(
      getListBranchs({
        page: 1,
        limit: 100,
        onSuccess: () => {},
        onFail: onFail,
      }),
    );
  }, [refresh, branchId]);

  const pullRefresh = () => {
    setRefresh(true);
  };
  const onSuccess = (result: Booking[]) => {
    setLoading(false);
    setRefresh(false);

    setBookings(
      result.filter(
        data => data.dateBooking === moment().format('DD-MM-YYYY'),
      ) || [],
    );
  };

  const onFail = () => {
    setLoading(false);
    setRefresh(false);
  };
  return {
    bookings,
    loading,
    refresh,
    pullRefresh,
    listBookingRef,
    branchs,
    branchId,
    setBranchId,
  };
};

export default useWorkScheduleManager;
