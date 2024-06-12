import React, {useMemo} from 'react';
import useStartup from '../modules/startup/startup';
import {AuthNavigator, MainNavigator} from '../navigation/initScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IAuthState} from '../modules/auth/model';
import {get} from 'lodash';
const AppComponent = () => {
  useStartup();
  const auth = useSelector<RootState, IAuthState>(state => state.auth);
  const is_verified = get(auth, 'userData.isVerified', false);
  return useMemo(() => {
    if (!auth.isLogged || !is_verified) {
      return <AuthNavigator />;
    }
    return <MainNavigator />;
  }, [auth]);
};

export default React.memo(AppComponent);
