import {
  CHANGE_PASSWORD_SCREEN,
  HOME_SCREEN,
  INFORMATION_SCREEN,
  LANDING_PAGE,
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  VERIFY_PHONE_SCREEN,
  WELCOME_SCREEN,
} from '../constants/screen_key';

export type AuthStackParamList = {
  [LANDING_PAGE]: undefined;
  [WELCOME_SCREEN]: undefined;
  [LOGIN_SCREEN]: undefined;
  [VERIFY_PHONE_SCREEN]: undefined;
  [REGISTER_SCREEN]: undefined;
  [INFORMATION_SCREEN]: undefined;
  [CHANGE_PASSWORD_SCREEN]: undefined;
};

export type MainStackParamList = {
  [HOME_SCREEN] : undefined;
};
