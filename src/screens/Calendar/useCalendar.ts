import {createRef, useEffect, useState} from 'react';
import NavigationActionService from '../../navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IWorkScheduleState} from '../../modules/workschedule/model';
import {IAuthState} from '../../modules/auth/model';
import {getListWorkSchedule} from '../../modules/workschedule';
import { FlatList } from 'react-native';

const useCalendar = () => {
  const [open, setOpen] = useState(false);
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);
  const {workSchedules} = useSelector<RootState, IWorkScheduleState>(
    state => state.workschedule,
  );
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const listWorkScheduleRef = createRef<FlatList>();
  useEffect(() => {
    dispatch(
      getListWorkSchedule({
        idStaff: userData.id,
        onSuccess: onLoadSuccess,
        onFail: onLoadFail,
      }),
    );
  }, [refresh]);
  const goBack = () => {
    NavigationActionService.pop();
  };

  const onLoadSuccess = () => {
    setRefresh(false);
    setLoading(false);
  };

  const onLoadFail = () => {
    setRefresh(false);
    setLoading(false);
  };

  const pullRefresh = () => {
    setRefresh(true);
  };

  return {
    open,
    openPicker,
    closePicker,
    goBack,
    pullRefresh,
    refresh,
    loading,
    workSchedules,
    userData,
    listWorkScheduleRef
  };
};

export default useCalendar;
