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
import {Admin, Staff} from '../../../modules/user/model';
import {getListBookingsByBranch} from '../../../modules/booking/';
import {getListStaffByBranch} from '../../../modules/user';

const useWorkScheduleManager = () => {
  const dispatch = useDispatch();
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [branchId, setBranchId] = useState((userData as Admin).workPlace.id);
  const [staffId, setStaffId] = useState(0);
  const listBookingRef = createRef<FlatList>();
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(
      getListStaffByBranch({
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
  const onSuccess = (result: Staff[]) => {
    setLoading(false);
    setRefresh(false);

    setStaffs(result);
  };

  const onFail = () => {
    setLoading(false);
    setRefresh(false);
  };
  return {
    staffs,
    loading,
    refresh,
    pullRefresh,
    listBookingRef,
    branchs,
    branchId,
    setBranchId,
    date,
    setDate,
    open,
    setOpen,
    staffId,
    setStaffId,
  };
};

export default useWorkScheduleManager;
