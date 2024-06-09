import * as SCREEN_KEYS from '../constants/screen_key';
import {AuthStackParamList, MainStackParamList} from './StackParamList';
import LandingPage from '../screens/Authentication/LandingPage/index';
import WelcomeScreen from '../screens/Authentication/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Authentication/Login';
import VerifyPhoneScreen from '../screens/Authentication/VerifyPhone';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../screens/Authentication/Register';
import InformationScreen from '../screens/Authentication/Information';
import ChangePasswordScreen from '../screens/Authentication/ChangePassword';
import HomeScreen from '../screens/Home';
export type AuthStackObject = {
  [key in keyof Partial<AuthStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

export type MainStackObject = {
  [key in keyof Partial<MainStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

type StackProps = {
  initialRouteName?: string;
};

export const authStackScreens: AuthStackObject = {
  [SCREEN_KEYS.WELCOME_SCREEN]: WelcomeScreen,
  [SCREEN_KEYS.LOGIN_SCREEN]: LoginScreen,
  [SCREEN_KEYS.REGISTER_SCREEN]: RegisterScreen,
  [SCREEN_KEYS.VERIFY_PHONE_SCREEN]: VerifyPhoneScreen,
  [SCREEN_KEYS.INFORMATION_SCREEN]: InformationScreen,
  [SCREEN_KEYS.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
};

export const landingStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LANDING_PAGE]: LandingPage,
  ...authStackScreens,
};

export const mainStackScreens: MainStackObject = {
  [SCREEN_KEYS.HOME_SCREEN]: HomeScreen
};

const Stack = createStackNavigator();
export const AuthNavigator = ({initialRouteName}: StackProps) => {
  // const auth = useSelector<RootState, IAuthState>(state => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {Object.entries(landingStackScreens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export const MainNavigator = ({initialRouteName}: StackProps) => {
  // const auth = useSelector<RootState, IAuthState>(state => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {Object.entries(mainStackScreens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};
