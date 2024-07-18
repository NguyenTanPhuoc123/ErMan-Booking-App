import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {BaseService} from '../../AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusConnection} from '../network/reducer';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../auth/model';
import {useSubscription} from '@apollo/client';
import {onAuthStateChanged} from '../../api/user/queries';
import {useEffect} from 'react';
import {getCurrentUser} from '../auth';
import {UpdateDataFromServer} from '../../api/booking/queries';
import {getListBookings} from '../booking';
import {GetRealTimeNotification} from '../../api/notification/queries';
import {getListNotifications} from '../notification';

const useStartup = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {data, error} = useSubscription(onAuthStateChanged, {
    variables: {id: userData ? userData.id : 0},
  });
  const {data: dataNotification, error: errorNotification} = useSubscription(
    GetRealTimeNotification,
    {
      variables: {
        receiverId: userData.id,
      },
    },
  );

  const {data: dataBooking, error: errorBooking} =
    useSubscription(UpdateDataFromServer);
  useEffect(() => {
    if (data && data.User_connection.edges[0] && !error) {
      dispatch(getCurrentUser({}));
    }
    if (dataBooking && dataBooking.Booking_connection.edges && !errorBooking) {
      dispatch(
        getListBookings({
          id: userData.id,
          endCursor: '',
          limit: 100,
        }),
      );
    }
    if (
      dataNotification &&
      dataNotification.Notification_connection.edges &&
      !errorNotification
    ) {
      
      dispatch(
        getListNotifications({
          page: 1,
          endCursor: '',
          limit: 100,
          receiverId: userData.id,
        }),
      );
    }
  }, [data, dataBooking, dataNotification]);

  const onConnectionChanged = (state: NetInfoState) => {
    NetInfo.addEventListener(onConnectionChanged);
    BaseService.onConnectionChange(state);
    dispatch(
      changeStatusConnection({isConnected: state.isInternetReachable || false}),
    );
  };
};

export default useStartup;
