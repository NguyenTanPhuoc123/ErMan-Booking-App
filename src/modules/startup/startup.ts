import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {BaseService} from '../../AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusConnection} from '../network/reducer';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../auth/model';
import {useSubscription} from '@apollo/client';
import {onAuthStateChanged} from '../../api/user/queries';
import {useEffect} from 'react';
import {saveUser} from '../auth/reducer';
import {User} from '../user/model';
import {updateBookingRealtime} from '../booking/service';
import {getCurrentUser} from '../auth';
import {UpdateDataFromServer} from '../../api/booking/queries';
import {getListBookings} from '../booking';

const useStartup = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {data, error} = useSubscription(onAuthStateChanged, {
    variables: {id: userData ? userData.id : 0},
  });
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
  }, [data, dataBooking]);

  const onConnectionChanged = (state: NetInfoState) => {
    NetInfo.addEventListener(onConnectionChanged);
    BaseService.onConnectionChange(state);
    dispatch(
      changeStatusConnection({isConnected: state.isInternetReachable || false}),
    );
  };
};

export default useStartup;
