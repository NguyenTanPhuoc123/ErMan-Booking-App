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
import {useRoute} from '@react-navigation/native';
const useBranch = () => {
  const {branchs, hasNextPage, endCursor} = useSelector<
    RootState,
    IBranchState
  >(state => state.branch);
  const {params} = useRoute() as any;
  const dispatch = useDispatch();
  const listBranchRef = createRef<FlatList>();
  const [refresh, setRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [listBranch, setListBranch] = useState<Array<Branch>>(branchs);

  useEffect(() => {
    if (search === '') {
      getListBranch();
    } else {
      searchListBranch();
    }
  }, [search, refresh]);

  const getListBranch = () => {
    setLoading(true);
    dispatch(
      getListBranchs({
        page: 1,
        limit: 4,
        onSuccess: onLoadBranchSuccess,
        onFail: onLoadBranchFail,
      }),
    );
  };

  const searchListBranch = debounce(() => {
    setLoading(true);
    dispatch(
      searchBranch({
        search: search,
        limit: 4,
        onSuccess: value => {
          setListBranch(value);
          setLoading(false);
        },
        onFail: () => {
          setListBranch([]), setLoading(false);
        },
      }),
    );
  }, 500);

  const onLoadBranchSuccess = () => {
    setRefresh(false);
    setLoading(false);
    setListBranch(branchs);
  };

  const onLoadBranchFail = (error?: ApiError) => {
    setRefresh(false);
    setLoading(false);
    setIsLoadMore(false);
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi lấy danh sách',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const pullRefresh = () => {
    setRefresh(true);
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
      getListBranchs({
        page: 2,
        limit: 4,
        endCursor: endCursor,
        onSuccess: onLoadMoreSuccess,
        onFail: onLoadMoreFail,
      }),
    );
  };
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {
    goBack,
    listBranchRef,
    refresh,
    listBranch,
    pullRefresh,
    loadMore,
    isLoadMore,
    search,
    setSearch,
    branchs,
    loading,
    params,
  };
};

export default useBranch;
