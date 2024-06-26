import {useRoute} from '@react-navigation/native';
import {createRef, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {getListService, getListServicesDiscount} from '../../modules/service';
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
  const [refresh, setRefresh] = useState(false);
  const [categoryService, setCategoryService] = useState(0);
  const [skeleton,setSkeleton] = useState(false);
  const onLoadServiceSuccess = () => {
    setSkeleton(true);
    setRefresh(false);
  };
  const onLoadServiceFail = (error?: ApiError) => {
    setSkeleton(false);
    setRefresh(false);
    console.log(error?.message);
  };
  useEffect(() => {
    setSkeleton(false);
    if (categoryService === 1) {
      getListDiscount();
    } else {
      getListServices();
    }
  }, [categoryService]);
  const pullRefresh = useCallback(() => {
    setRefresh(true);
    if (categoryService === 1) {
      getListDiscount();
    } else {
      getListServices();
    }
  }, []);

  const getListDiscount = () => {
    dispatch(
      getListServicesDiscount({
        page: 1,
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
    skeleton
  };
};

export default useService;
