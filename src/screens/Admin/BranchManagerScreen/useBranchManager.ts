import {createRef, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getListBranchs, searchBranch} from '../../../modules/branch';
import {RootState} from '../../../redux/reducers';
import {
  Branch,
  IActionSaveListBranch,
  IBranchState,
} from '../../../modules/branch/model';
import {debounce} from 'lodash';
import NavigationActionService from '../../../navigation/navigation';
import {ADD_BRANCH_SCREEN} from '../../../constants/screen_key';

const useBranchManager = () => {
  const {branchs} = useSelector<RootState, IActionSaveListBranch>(
    state => state.branch,
  );
  const {hasNextPage, endCursor} = useSelector<RootState, IBranchState>(
    state => state.branch,
  );
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const listBranchRef = createRef<FlatList>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [listBranch, setListBranch] = useState<Array<Branch>>(branchs);

  const onGetSuccess = () => {
    setRefresh(false);
  };

  const onGetFail = () => {
    setRefresh(false);
  };
  const onLoadMoreSuccess = () => {
    setIsLoadMore(false);
  };
  const onLoadMoreFail = () => {
    setIsLoadMore(false);
  };

  useEffect(() => {
    if (search == '') {
      dispatch(
        getListBranchs({
          limit: 3,
          page: 1,
          onSuccess: onGetSuccess,
          onFail: onGetFail,
        }),
      );
    } else {
      searchListBranch();
    }
  }, [search, refresh]);

  const pullRequest = () => {
    setRefresh(true);
  };
  const searchListBranch = debounce(() => {
    setLoading(true);
    dispatch(
      searchBranch({
        search: search,
        limit: 100,
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

  const goToAddBranch = () => {
    NavigationActionService.navigate(ADD_BRANCH_SCREEN);
  };
  return {
    branchs,
    listBranchRef,
    refresh,
    pullRequest,
    isLoadMore,
    loadMore,
    search,
    setSearch,
    listBranch,
    loading,
    goToAddBranch,
  };
};

export default useBranchManager;
