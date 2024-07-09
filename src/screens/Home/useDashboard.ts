import {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListService} from '../../modules/service';
import {RootState} from '../../redux/reducers';
import {IServiceState} from '../../modules/service/model';
import {IAuthState} from '../../modules/auth/model';
import NavigationActionService from '../../navigation/navigation';
import {
  BRANCH_SCREEN,
  MY_BOOKING_SCREEN,
  MY_BOOKING_STACK,
  NOTIFICATION_SCREEN,
  STYLIST_SCREEN,
} from '../../constants/screen_key';
import {ICarouselInstance} from 'react-native-reanimated-carousel';
import {FlatList} from 'react-native';
import {IBranchState} from '../../modules/branch/model';
import {getListBranchs} from '../../modules/branch';
import {IUserState} from '../../modules/user/model';
import {getListStaff} from '../../modules/user';
import {IBookingState} from '../../modules/booking/model';
import {getListBookings} from '../../modules/booking';
import {APP_TYPE} from '../../constants/app_info';
import moment from 'moment';

const useDasboard = () => {
  const dispatch = useDispatch();
  const stylists = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user => user.typeAccount === 'Staff');
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
  const {bookings} = useSelector<RootState, IBookingState>(
    state => state.booking,
  );
  const bookingNear =
    APP_TYPE === 'Staff'
      ? bookings.filter(booking => {
          const [date, time] = booking.datetimeBooking.split(' ');
          const dateNow = moment(new Date()).format('DD-MM-YYYY');
          const timeNow = moment(new Date()).format('HH:mm');
          if (
            date === dateNow &&
            moment(time, 'HH:mm').isAfter(moment(timeNow, 'HH:mm'))
          )
            return booking;
        })[0]
      : null;

  const pullRefresh = () => {
    setRefresh(true);
  };
  useEffect(() => {
    dispatch(getListService({page: 1, limit: 4}));
    dispatch(
      getListBranchs({
        page: 1,
        limit: 4,
      }),
    );
    dispatch(
      getListStaff({
        limit: 4,
        page: 1,
      }),
    );
    dispatch(
      getListBookings({
        limit: 100,
        id: currentUser.id,
      }),
    );
    setRefresh(false);
  }, [refresh]);

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };

  const goToBranch = () => {
    NavigationActionService.navigate(BRANCH_SCREEN);
  };

  const goToStylists = () => {
    NavigationActionService.navigate(STYLIST_SCREEN);
  };

  const goToBooking = () => {
    NavigationActionService.navigate(MY_BOOKING_STACK);
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
    stylists,
    bookingNear,
    goToBooking
  };
};

export default useDasboard;
