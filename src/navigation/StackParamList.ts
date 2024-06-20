import {
  CHANGE_PASSWORD_SCREEN,
  EDIT_PROFILE_SCREEN,
  HOME_SCREEN,
  INFORMATION_SCREEN,
  LANDING_PAGE,
  LOGIN_SCREEN,
  MESSAGE_SCREEN,
  MY_BOOKING_SCREEN,
  PERSONAL_SCREEN,
  PROFILE_SCREEN,
  REGISTER_SCREEN,
  SERVICE_DETAIL_SCREEN,
  SERVICE_SCREEN,
  VERIFY_PHONE_SCREEN,
} from '../constants/screen_key';

export type AuthStackParamList = {
  [LANDING_PAGE]: undefined;
  [LOGIN_SCREEN]: undefined;
  [VERIFY_PHONE_SCREEN]: undefined;
  [REGISTER_SCREEN]: undefined;
  [INFORMATION_SCREEN]: undefined;
  [CHANGE_PASSWORD_SCREEN]: undefined;
};

export type MainStackParamList = {
  [HOME_SCREEN] : undefined;
  [SERVICE_SCREEN]:undefined;
  [MY_BOOKING_SCREEN]:undefined;
  [MESSAGE_SCREEN]:undefined;
  [PERSONAL_SCREEN]:undefined;
  [PROFILE_SCREEN]:undefined;
  [EDIT_PROFILE_SCREEN]:undefined;
  [SERVICE_DETAIL_SCREEN]:undefined;
};
