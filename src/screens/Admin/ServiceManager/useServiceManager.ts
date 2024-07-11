import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IServiceState, Service} from '../../../modules/service/model';
import {createRef, useEffect, useState} from 'react';
import {getListService, searchServiceByName} from '../../../modules/service';
import {FlatList} from 'react-native';
import NavigationActionService from '../../../navigation/navigation';
import {ADD_SERVICE_SCREEN} from '../../../constants/screen_key';
import {ApiError} from '../../../constants/api';
import {debounce} from 'lodash';

const useServiceManager = () => {
  const dispatch = useDispatch();
  const {services, hasNextPage, endCursor} = useSelector<
    RootState,
    IServiceState
  >(state => state.service);
  const listServiceRef = createRef<FlatList>();
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [listSearch, setListSearch] = useState<Service[]>([]);

  useEffect(() => {
    if (search == '') {
      getListServices();
    } else {
      searchService();
    }
  }, [refresh, search]);

  const onLoadServiceSuccess = () => {
    setLoading(false);
    setRefresh(false);
  };
  const onLoadServiceFail = (error?: ApiError) => {
    setLoading(false);
    setRefresh(false);
  };

  const getListServices = () => {
    setLoading(true);
    dispatch(
      getListService({
        page: 1,
        limit: 4,
        onSuccess: onLoadServiceSuccess,
        onFail: onLoadServiceFail,
      }),
    );
  };
  const onLoadMoreSuccess = () => {
    setIsLoadMore(false);
  };
  const searchService = debounce(() => {
    setLoading(true);
    dispatch(
      searchServiceByName({
        serviceName: search,
        onSuccess: (value: Service[]) => {
          setListSearch(value);
          setLoading(false);
        },
        onFail: () => {
          setListSearch([]);
          setLoading(false);
        },
      }),
    );
  }, 500);
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
      getListService({
        page: 2,
        limit: 4,
        endCursor: endCursor,
        onSuccess: onLoadMoreSuccess,
        onFail: onLoadMoreFail,
      }),
    );
  };

  const pullRequest = () => {
    setRefresh(true);
  };

  const goToAddService = () => {
    NavigationActionService.navigate(ADD_SERVICE_SCREEN);
  };

  return {
    services,
    listServiceRef,
    refresh,
    pullRequest,
    search,
    setSearch,
    goToAddService,
    listSearch,
    isLoadMore,
    loading,
    loadMore,
  };
};

export default useServiceManager;
