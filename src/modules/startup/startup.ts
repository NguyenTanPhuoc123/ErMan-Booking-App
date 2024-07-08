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
import {Staff, User} from '../user/model';

const useStartup = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {data, error} = useSubscription(onAuthStateChanged, {
    variables: {id: userData ? userData.id : 0},
  });

  useEffect(() => {
    if (data && !error) {
      if (data.User[0].typeAccount != 'Customer')
        dispatch(
          saveUser({
            user: {
              workPlace: data.User[0].Staff.Branch.branchName,
              timeStartWork: data.User[0].Staff.timeStartWork,
              ...data.User[0],
            },
          }),
        );
      else {
        dispatch(saveUser({user: data.User[0] as User}));
      }
    }
  }, [data]);

  const onConnectionChanged = (state: NetInfoState) => {
    NetInfo.addEventListener(onConnectionChanged);
    BaseService.onConnectionChange(state);
    dispatch(
      changeStatusConnection({isConnected: state.isInternetReachable || false}),
    );
  };
};

export default useStartup;
