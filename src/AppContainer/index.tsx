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
import {ApolloProvider} from '@apollo/client';
import client from '../api';
import {NativeEventEmitter} from 'react-native';
import {PayZaloBridge} from '../constants/api';
import {LogBox} from 'react-native';

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
const subscription = payZaloBridgeEmitter.addListener('EventPayZalo', data => {
  if (data.returnCode == 1) {
    console.log('Pay success!');
  } else {
    console.log('Pay errror! ' + data.returnCode);
  }
});
export const BaseService = BaseServiceClass.instance(store);
const Stack = createStackNavigator();
export const loadingRef = createRef<LoadingPageRef>();
const App = () => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const getStackScreenOptions: StackNavigationOptions = useMemo(() => {
    return {
      cardStyle: {backgroundColor: 'transparent'},
      presentation: 'transparentModal',
      gestureEnabled: false,
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => BootSplashScreen.hide({fade: true})}>
            <Stack.Navigator
              screenOptions={{headerShown: false, gestureEnabled: false}}>
              <Stack.Screen name={MAIN_SCREEN} component={AppComponent} />
              <Stack.Screen
                options={getStackScreenOptions}
                name={CUSTOM_POPUP}
                component={CustomPopup}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <LoadingPage ref={loadingRef} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
