import React, {useMemo} from 'react';
import useStartup from '../modules/startup/startup';
import { AuthNavigator } from '../navigation/initScreen';

const AppComponent = () => {
  useStartup();
  
  return useMemo(() => <AuthNavigator />, []);
};

export default AppComponent;
