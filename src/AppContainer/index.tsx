import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BaseService as BaseServiceClass } from '../services/BaseService'
import {store} from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AppComponent from './AppComponent'
import { createStackNavigator } from '@react-navigation/stack'
import { MAIN_SCREEN } from '../constants/screen_key'
import { navigationRef } from '../navigation/navigation'
export const BaseService = BaseServiceClass.instance(store);
const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name={MAIN_SCREEN} component={AppComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
      
    </Provider>
    
  )
}

export default App
