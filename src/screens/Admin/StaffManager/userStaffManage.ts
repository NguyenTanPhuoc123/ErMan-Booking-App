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
  const {staffs,endCursor,hasNextPage} = useSelector<RootState, IUserState>(state => state.user);
  const listStaffRef = createRef<FlatList>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [listStaff, setListStaff] = useState<(Staff | Admin)[]>();
  const [isLoadMore,setIsLoadMore] = useState(false);
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
        limit: 4,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
  };

  const onLoadMoreSuccess = () => {
    setIsLoadMore(false);
  };
  const onLoadMoreFail = () => {
    setIsLoadMore(false);
  };

  const loadMore = () => {
    setIsLoadMore(true);
    if (!hasNextPage || search != '') {
      setIsLoadMore(false);
      return;
    }
    dispatch(
      getListStaff({
        page: 2,
        limit: 4,
        endCursor: endCursor,
        onSuccess: onLoadMoreSuccess,
        onFail: onLoadMoreFail,
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
    isLoadMore,
    loadMore
  };
};
export default useStaffManage;
