import {createRef, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListService} from '../../modules/service';
import {RootState} from '../../redux/reducers';
import {IServiceState} from '../../modules/service/model';
import {IAuthState} from '../../modules/auth/model';
import NavigationActionService from '../../navigation/navigation';
import {
  BRANCH_SCREEN,
  NOTIFICATION_SCREEN,
  STYLIST_SCREEN,
} from '../../constants/screen_key';
import {ICarouselInstance} from 'react-native-reanimated-carousel';
import {FlatList} from 'react-native';
import {IBranchState} from '../../modules/branch/model';
import {getListBranchs} from '../../modules/branch';

const useDasboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  const {services} = useSelector<RootState, IServiceState>(
    state => state.service,
  );
  const {branchs} = useSelector<RootState, IBranchState>(state => state.branch);
  const discountRef = createRef<ICarouselInstance>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const serviceListRef = createRef<FlatList>();
  const branchListRef = createRef<FlatList>();
  const stylistListRef = createRef<FlatList>();
  const [refresh, setRefresh] = useState(false);
  const pullRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);
  useEffect(() => {
    dispatch(getListService({page: 1, limit: 4}));
    dispatch(
      getListBranchs({
        page: 1,
        limit: 4,
      }),
    );
  }, []);

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };

  const goToBranch = () => {
    NavigationActionService.navigate(BRANCH_SCREEN);
  };

  const goToStylists = () => {
    NavigationActionService.navigate(STYLIST_SCREEN);
  };

  return {
    currentUser,
    services,
    goToBranch,
    goToNotifcation,
    goToStylists,
    discountRef,
    currentIndex,
    setCurrentIndex,
    serviceListRef,
    branchListRef,
    stylistListRef,
    refresh,
    pullRefresh,
    branchs,
  };
};

export default useDasboard;
