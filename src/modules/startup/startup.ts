import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {BaseService} from '../../AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusConnection} from '../network/reducer';
import { RootState } from '../../redux/reducers';
import { IAuthState } from '../auth/model';

const useStartup = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState,IAuthState>(state=>state.auth);
  const onConnectionChanged = (state: NetInfoState) => {
    NetInfo.addEventListener(onConnectionChanged);
    BaseService.onConnectionChange(state);
    dispatch(
      changeStatusConnection({isConnected: state.isInternetReachable || false}),
    );
  };

};

export default useStartup;
