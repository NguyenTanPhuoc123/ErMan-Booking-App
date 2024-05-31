import * as SCREEN_KEYS from '../constants/screen_key';
import {AuthStackParamList} from './StackParamList';
import LandingPage from '../screens/Authentication/LandingPage/index';
import WelcomeScreen from '../screens/Authentication/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';

export type AuthStackObject = {
  [key in keyof Partial<AuthStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

export const authStackScreens: AuthStackObject = {
  [SCREEN_KEYS.WELCOME_SCREEN]: WelcomeScreen,
  [SCREEN_KEYS.LOGIN_SCREEN]: LoginScreen,
};

export const landingStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LANDING_PAGE]: LandingPage,
  ...authStackScreens,
};


