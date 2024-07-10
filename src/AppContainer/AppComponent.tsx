import React, {useMemo} from 'react';
import useStartup from '../modules/startup/startup';
import {AdminNavigator, AuthNavigator, MainNavigator} from '../navigation/initScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import {IAuthState} from '../modules/auth/model';
import {get} from 'lodash';
import { APP_TYPE } from '../constants/app_info';

const AppComponent = () => {
  useStartup();
  const auth = useSelector<RootState, IAuthState>(state => state.auth);
  const is_verified = get(auth, 'userData.isVerified', false);
  const type_Account = get(auth, 'userData.typeAccount','Customer');
  return useMemo(() => {
    if (!auth.isLogged || !is_verified || APP_TYPE!=type_Account) {
      return <AuthNavigator />;
    }
    else if(APP_TYPE==='Admin' && type_Account==='Admin'){
      return <AdminNavigator/>
    }
    return <MainNavigator />;
  }, [auth]);
};

export default React.memo(AppComponent);
