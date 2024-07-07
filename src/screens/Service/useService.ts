import {useRoute} from '@react-navigation/native';
import {createRef, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getListService, searchServiceByName} from '../../modules/service';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IServiceState, Service} from '../../modules/service/model';
import NavigationActionService from '../../navigation/navigation';
import {ApiError} from '../../constants/api';
import {NOTIFICATION_SCREEN} from '../../constants/screen_key';
import {debounce} from 'lodash';

const category = [
  {
    id: 0,
    name: 'Tất cả',
  },
  {
    id: 1,
    name: 'Giảm giá',
  },
];

const useService = () => {
  const serviceListRef = createRef<FlatList>();
  const route = useRoute();
  const selected = route.params as any;
  const dispatch = useDispatch();
  const {services, hasNextPage, endCursor} = useSelector<
    RootState,
    IServiceState
  >(state => state.service);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryService, setCategoryService] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listSearch, setListSearch] = useState<Service[]>([]);
  const [listSelected, setListSelected] = useState<Service[]>(
    selected ? selected.services : [],
  );
  const onLoadServiceSuccess = () => {
    setLoading(false);
    setRefresh(false);
  };
  const onLoadServiceFail = (error?: ApiError) => {
    setLoading(false);
    setRefresh(false);
    console.log(error?.message);
  };
  useEffect(() => {
    // skeletonRef.current?.showSkeletonLoading();
    if (search === '') {
      getListServices();
    } else {
      searchService();
    }
  }, [refresh, search]);
  const pullRefresh = () => {
    setRefresh(true);
  };

  const addService = (service: Service) => {
    setListSelected([...listSelected, service]);
  };

  const removeService = (service: Service) => {
    setListSelected(listSelected.filter(item => item.id !== service.id));
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
    if (!hasNextPage && search != '') {
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
  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };
  return {
    serviceListRef,
    route,
    pullRefresh,
    refresh,
    services,
    goToNotifcation,
    categoryService,
    setCategoryService,
    category,
    loading,
    search,
    setSearch,
    loadMore,
    isLoadMore,
    listSearch,
    listSelected,
    addService,
    removeService,
  };
};

export default useService;
