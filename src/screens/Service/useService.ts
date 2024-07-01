import {useRoute} from '@react-navigation/native';
import {createRef, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getListService, getListServicesDiscount, searchServiceByName} from '../../modules/service';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IServiceState} from '../../modules/service/model';
import NavigationActionService from '../../navigation/navigation';
import {ApiError} from '../../constants/api';
import {NOTIFICATION_SCREEN} from '../../constants/screen_key';
import {SkeletonLoadingRef} from '../../component/CustomSketelonService/type';

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
  const dispatch = useDispatch();
  const {services, servicesDiscount} = useSelector<RootState, IServiceState>(
    state => state.service,
  );
  const [loadMore,setLoadMore] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [search,setSearch] = useState('');
  const [categoryService, setCategoryService] = useState(0);
  const skeletonRef = createRef<SkeletonLoadingRef>();
  const onLoadServiceSuccess = () => {
    skeletonRef.current?.hideSkeletonLoading();
    setRefresh(false);
  };
  const onLoadServiceFail = (error?: ApiError) => {
    skeletonRef.current?.hideSkeletonLoading();
    setRefresh(false);
    console.log(error?.message);
  };
  useEffect(() => {
    // skeletonRef.current?.showSkeletonLoading();
    if (search==='') {
      getListServices();
    }else{
      dispatch(searchServiceByName({
        serviceName:search,
        onSuccess:onLoadServiceSuccess,
        onFail:onLoadServiceFail
      }))
    }
      
  }, [refresh,search]);
  const pullRefresh = useCallback(() => {
    setRefresh(true);
  }, []);

  const getListDiscount = () => {
    dispatch(
      getListServicesDiscount({
        limit: 4,
        onSuccess: onLoadServiceSuccess,
        onFail: onLoadServiceFail,
      }),
    );
  };

  const getListServices = () => {
    dispatch(
      getListService({
        page: 1,
        limit: 4,
        onSuccess: onLoadServiceSuccess,
        onFail: onLoadServiceFail,
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
    servicesDiscount,
    category,
    skeletonRef,
    search,
    setSearch
  };
};

export default useService;
