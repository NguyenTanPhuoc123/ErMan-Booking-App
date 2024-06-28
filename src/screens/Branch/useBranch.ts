import {useDispatch, useSelector} from 'react-redux';
import {NOTIFICATION_SCREEN} from '../../constants/screen_key';
import NavigationActionService from '../../navigation/navigation';
import {RootState} from '../../redux/reducers';
import {Branch, IBranchState} from '../../modules/branch/model';
import {FlatList} from 'react-native';
import {createRef, useCallback, useEffect, useState} from 'react';
import {getListBranchs, searchBranch} from '../../modules/branch';
import {ApiError} from '../../constants/api';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {debounce} from 'lodash';
const useBranch = () => {
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);
  const dispatch = useDispatch();
  const listBranchRef = createRef<FlatList>();
  const [refresh, setRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const [listBranch, setListBranch] = useState<Array<Branch>>(branchs);
  useEffect(() => {
    if (search==='') {
      getListBranch();
    } else {
      searchListBranch();
    }
  }, [search, refresh]);
  
  const getListBranch = () => {
    dispatch(
      getListBranchs({
        page: 1,
        limit: 2,
        onSuccess: onLoadBranchSuccess,
        onFail: onLoadBranchFail,
      }),
    );
  };

  const searchListBranch = debounce(() => {
    dispatch(
      searchBranch({
        search: search,
        limit:2,
        onSuccess: value => setListBranch(value),
        onFail: () => setListBranch([]),
      }),
    );
  },500);

  const onLoadBranchSuccess = () => {
    setRefresh(false);
    setListBranch(branchs);
  };

  const onLoadBranchFail = (error?: ApiError) => {
    setRefresh(false);
    setIsLoadMore(false);
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi lấy danh sách',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const pullRefresh = useCallback(() => {
    setRefresh(true);
  },[]);

  const onLoadMoreSuccess = (value:Branch[]) => {
    setIsLoadMore(false);
    
  };

  const onLoadMoreFail = () => {
    setIsLoadMore(false);
  };

  const loadMore = useCallback(() => {
    if(listBranch.length===0 && branchs[branchs.length]){
      setIsLoadMore(false);
      return;
    }
    setIsLoadMore(true);
    if (branchs[branchs.length - 1].branchName && search==='') {
      dispatch(
        getListBranchs({
          page: 2,
          limit: 2,
          q: branchs[branchs.length - 1].branchName,
          onSuccess: onLoadMoreSuccess,
          onFail: onLoadMoreFail,
        }),
      );
    }
  
  },[]);
  const goBack = () => {
    NavigationActionService.pop();
  };

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };
  return {
    goBack,
    goToNotifcation,
    listBranchRef,
    refresh,
    listBranch,
    pullRefresh,
    loadMore,
    isLoadMore,
    search,
    setSearch,
  };
};

export default useBranch;
