import {createRef, useCallback, useEffect, useState} from 'react';
import NavigationActionService from '../../navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IWorkScheduleState} from '../../modules/workschedule/model';
import {IAuthState} from '../../modules/auth/model';
import {getListWorkSchedule} from '../../modules/workschedule';
import {FlatList} from 'react-native';
import {ApiError} from '../../constants/api';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {EventTypes} from 'react-native-month-year-picker';

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
  const [date, setDate] = useState(new Date());
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

  const onValueChange = useCallback(
    (event: EventTypes, newDate: Date) => {
      const selectedDate = newDate || date;

      closePicker();
      setDate(selectedDate);
    },
    [date, open],
  );

  const onLoadSuccess = () => {
    setRefresh(false);
    setLoading(false);
  };

  const onLoadFail = (error?: ApiError) => {
    setRefresh(false);
    setLoading(false);
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi lấy lịch làm việc',
      message:
        error?.message || 'Có lỗi gì đó đã xảy ra trong lúc lấy lịch làm việc',
    });
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
    listWorkScheduleRef,
    date,
    onValueChange,
  };
};

export default useCalendar;
