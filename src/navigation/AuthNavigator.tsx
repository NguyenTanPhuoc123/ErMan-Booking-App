import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage from '../screens/Authentication/LandingPage/index';
import WelcomeScreen from '../screens/Authentication/Welcome/WelcomeScreen';
import { LANDING_PAGE, LOGIN_SCREEN, WELCOME_SCREEN } from '../constants/screen_key';
import LoginScreen from '../screens/Authentication/LoginScreen';

type AuthStackProps = {
  initialRouteName?: string;
};
const Stack = createStackNavigator();
const AuthNavigator = ({initialRouteName}: AuthStackProps) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LANDING_PAGE} component={LandingPage} />
      <Stack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
