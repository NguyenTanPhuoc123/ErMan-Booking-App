import {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {Admin, IUserState, Staff} from '../../../modules/user/model';
import {FlatList} from 'react-native';
import {getListStaff, searchStaff} from '../../../modules/user';
import {ApiError} from '../../../constants/api';
import {debounce} from 'lodash';

const useStaffManage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const {staffs} = useSelector<RootState, IUserState>(state => state.user);
  const listStaffRef = createRef<FlatList>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [listStaff, setListStaff] = useState<(Staff | Admin)[]>();

  useEffect(() => {
    setLoading(true);
    if (search == '') {
      getListStaffs();
    } else {
      searchStaffs();
    }
  }, [refresh, search]);

  const pullRefresh = () => {
    setRefresh(true);
  };

  const searchStaffs = debounce(() => {
    dispatch(
      searchStaff({
        search: search,
        onSuccess: value => {
          setListStaff(value);
          setLoading(false);
        },
        onFail: (error?: ApiError) => {
          setLoading(false);
        },
      }),
    );
  }, 500);

  const getListStaffs = () => {
    dispatch(
      getListStaff({
        page: 1,
        limit: 10,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
  };

  const loadSuccess = () => {
    setRefresh(false);
    setLoading(false);
  };

  const loadFail = () => {
    setRefresh(false);
    setLoading(false);
  };

  return {
    listStaffRef,
    pullRefresh,
    refresh,
    staffs,
    search,
    setSearch,
    loading,
    listStaff,
  };
};
export default useStaffManage;
