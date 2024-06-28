import {
  ADD_USER_SCREEN,
  BRANCH_DETAIL_SCREEN,
  BRANCH_SCREEN,
  CHANGE_PASSWORD_SCREEN,
  DASHBOARD_SCREEN,
  EDIT_PROFILE_SCREEN,
  HOME_SCREEN,
  INFORMATION_SCREEN,
  LANDING_PAGE,
  LOGIN_SCREEN,
  MESSAGE_SCREEN,
  MY_BOOKING_SCREEN,
  NEWS_SCREEN,
  NOTIFICATION_SCREEN,
  PERSONAL_SCREEN,
  PROFILE_SCREEN,
  REGISTER_SCREEN,
  SERVICE_DETAIL_SCREEN,
  SERVICE_MANAGER_SCREEN,
  SERVICE_SCREEN,
  USER_MANAGER_SCREEN,
  VERIFY_PHONE_SCREEN,
} from '../constants/screen_key';
import { ADD_NEW_USER } from '../modules/user/model';

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
  [BRANCH_SCREEN]:undefined;
  [NOTIFICATION_SCREEN]:undefined;
  [NEWS_SCREEN]:undefined;
  [BRANCH_DETAIL_SCREEN]:undefined;
};

export type AdminStackParamList = {
  [DASHBOARD_SCREEN]:undefined;
  [USER_MANAGER_SCREEN]:undefined;
  [SERVICE_MANAGER_SCREEN]:undefined;
  [PROFILE_SCREEN]:undefined;
  [EDIT_PROFILE_SCREEN]:undefined;
  [ADD_USER_SCREEN]: undefined;
}
