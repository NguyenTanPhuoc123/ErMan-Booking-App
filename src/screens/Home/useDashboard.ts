import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListService} from '../../modules/service';
import {RootState} from '../../redux/reducers';
import {IServiceState} from '../../modules/service/model';
import {IAuthState} from '../../modules/auth/model';
import NavigationActionService from '../../navigation/navigation';
import {
  BRANCH_SCREEN,
  NEWS_SCREEN,
  NOTIFICATION_SCREEN,
} from '../../constants/screen_key';

const useDasboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  const {services} = useSelector<RootState, IServiceState>(
    state => state.service,
  );
  useEffect(() => {
    dispatch(getListService({page: 1, limit: 4}));
  }, []);

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };

  const goToBranch = () => {
    NavigationActionService.navigate(BRANCH_SCREEN);
  };

  const goToNews = () => {
    NavigationActionService.navigate(NEWS_SCREEN);
  };

  return {
    currentUser,
    services,
    goToBranch,
    goToNotifcation,
    goToNews,
  };
};

export default useDasboard;
