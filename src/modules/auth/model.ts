import {IActionCallback} from '../base';
import {Admin, Staff, User} from '../user/model';
export const ROOT_MODULE = 'auth';
export const LOGIN = `${ROOT_MODULE}/LOGIN`;
export const REGISTER = `${ROOT_MODULE}/REGISTER`;
export const FORGOT_PASSWORD = `${ROOT_MODULE}/FORGOT_PASSWORD`;
export const LOG_OUT = `${ROOT_MODULE}/LOG_OUT`;
export const GET_AUTH_TOKEN = `${ROOT_MODULE}/GET_AUTH_TOKEN`;
export const REFRESH_TOKEN = `${ROOT_MODULE}/REFRESH_TOKEN`;
export const VERIFY_EMAIL = `${ROOT_MODULE}/VERIFY_EMAIL`;
export const GET_CURRENT_USER = `${ROOT_MODULE}/GET_CURRENT_USER`;
export const USER_READY_LOAD_DATA = `${ROOT_MODULE}/USER_READY_LOAD_DATA`;
export const EDIT_PROFILE = `${ROOT_MODULE}/EDIT_PROFILE`;

export interface IAuthState {
  isLogged: boolean;
  userData: User | Staff | Admin;
}

export type IActionGetCurrentUserPayload = IActionCallback;
export type IActionLogoutPayload = IActionCallback;
export interface IActionVerifyEmailPayload extends IActionCallback {
  email: string;
}
export interface IActionSaveUserPayload {
  user: Staff | User | Admin;
}

export interface IActionLoginPayload extends IActionCallback {
  email: string;
  password: string;
}

export interface IActionRegisterPayload extends IActionCallback {
  body: BodyParams;
}

export interface BodyParams {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
export interface IActionForgotPasswordPayload extends IActionCallback {
  newPassword: string;
}

export interface IActionChangePasswordPayload extends IActionCallback {
  oldPassword: string;
  newPassword: string;
}
export interface IActionEditProfilePayload extends IActionCallback {
  user: User | Staff | Admin;
}
