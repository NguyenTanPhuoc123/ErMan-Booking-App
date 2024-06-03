import * as SCREEN_KEYS from '../constants/screen_key';
import {AuthStackParamList} from './StackParamList';
import LandingPage from '../screens/Authentication/LandingPage/index';
import WelcomeScreen from '../screens/Authentication/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import VerifyPhoneScreen from '../screens/Authentication/VerifyPhoneScreen';
import { createStackNavigator } from '@react-navigation/stack';
export type AuthStackObject = {
  [key in keyof Partial<AuthStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

 type AuthStackProps = {
  initialRouteName?: string
}

export const authStackScreens: AuthStackObject = {
  [SCREEN_KEYS.WELCOME_SCREEN]: WelcomeScreen,
  [SCREEN_KEYS.LOGIN_SCREEN]: LoginScreen,
  [SCREEN_KEYS.VERIFY_PHONE_SCREEN]: VerifyPhoneScreen,
};

export const landingStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LANDING_PAGE]: LandingPage,
  ...authStackScreens,
};

const Stack = createStackNavigator();
export const AuthNavigator = ({ initialRouteName }: AuthStackProps) => {
  // const auth = useSelector<RootState, IAuthState>(state => state.auth);
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={initialRouteName}>
      {Object.entries(landingStackScreens).map(([name,component])=>(
        <Stack.Screen key={name} name={name} component={component}/>
      ))}
    </Stack.Navigator>
  );
};


