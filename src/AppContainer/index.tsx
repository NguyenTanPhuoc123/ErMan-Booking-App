import React, {createRef, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BaseService as BaseServiceClass} from '../services/BaseService';
import {persistor, store} from '../redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppComponent from './AppComponent';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {CUSTOM_POPUP, MAIN_SCREEN} from '../constants/screen_key';
import {navigationRef} from '../navigation/navigation';
import CustomPopup from '../component/CustomPopup';
import {LoadingPageRef} from '../component/LoadingPage/type';
import LoadingPage from '../component/LoadingPage';
import BootSplashScreen from 'react-native-bootsplash';
import { SkeletonLoadingRef } from '../component/CustomSketelonService/type';
import CustomSketelonService from '../component/CustomSketelonService';


export const BaseService = BaseServiceClass.instance(store);
const Stack = createStackNavigator();
export const loadingRef = createRef<LoadingPageRef>();
const App = () => {
  const getStackScreenOptions = useMemo(() => {
    return {
      cardStyle: {backgroundColor: 'transparent'},
      presentation: 'transparentModal',
      gestureEnabled: false,
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => BootSplashScreen.hide({fade: true})}>
          <Stack.Navigator
            screenOptions={{headerShown: false, gestureEnabled: false}}>
            <Stack.Screen name={MAIN_SCREEN} component={AppComponent} />
            <Stack.Screen
              options={getStackScreenOptions as StackNavigationOptions}
              name={CUSTOM_POPUP}
              component={CustomPopup}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <LoadingPage ref={loadingRef} />
      </PersistGate>
    </Provider>
  );
};

export default App;
