import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {RootState} from '../../redux/reducers';
import {IUserState, Staff} from '../../modules/user/model';
import {createRef, useEffect, useState} from 'react';
import {getListStaff, searchStaff} from '../../modules/user';
import {FlatList} from 'react-native';

const useStylist = () => {
  const dispatch = useDispatch();
  const {endCursor, hasNextPage} = useSelector<RootState, IUserState>(
    state => state.user,
  );
  const stylists = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user => user.typeAccount === 'Staff');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloadMore, setLoadMore] = useState(false);
  const listStaffRef = createRef<FlatList>();
  const [search, setSearch] = useState('');
  const [listStylist,setListStylist] = useState<(Staff)[]>(stylists as Staff[]);
  useEffect(() => {
    setLoading(true);
    if (search == '') {
      dispatch(
        getListStaff({
          limit: 4,
          page: 1,
          endCursor: endCursor,
          onSuccess: onLoadSuccess,
          onFail: onLoadFail,
        }),
      );
    }
    else{
        searchStylist();
    }
  }, [search, refresh]);
  const onLoadSuccess = () => {
    setLoading(false);
    setRefresh(false);
  };

  const onLoadFail = () => {
    setLoading(false);
    setRefresh(false);
  };

  const pullRefresh = () => {
    setRefresh(true);
  };

  const loadMore = () => {
    setLoadMore(true);
    if (!hasNextPage && search != '') {
      setLoadMore(false);
      return;
    }

    dispatch(
      getListStaff({
        limit: 4,
        page: 2,
        endCursor: endCursor,
        onSuccess: () => setLoadMore(false),
        onFail: () => setLoadMore(false),
      }),
    );
  };

  const searchStylist = ()=>{
    setLoading(true);
    dispatch(searchStaff({
        search:search,
        onSuccess:(value)=>{setListStylist(value);setLoading(false)},
        onFail:()=>{setListStylist([]);setLoading(false)}
    }))
  }

  const goBack = () => {
    NavigationActionService.pop();
  };

  return {
    goBack,
    stylists,
    pullRefresh,
    refresh,
    loading,
    search,
    setSearch,
    listStaffRef,
    isloadMore,
    loadMore,
    listStylist,
  };
};

export default useStylist;
