import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {BaseService} from '../../AppContainer';
import {useDispatch} from 'react-redux';
import {changeStatusConnection} from '../network/reducer';

const useStartup = () => {
  const dispatch = useDispatch();
  const onConnectionChanged = (state: NetInfoState) => {
    NetInfo.addEventListener(onConnectionChanged);
    BaseService.onConnectionChange(state);
    dispatch(
      changeStatusConnection({isConnected: state.isInternetReachable || false}),
    );
  };
};

export default useStartup;
