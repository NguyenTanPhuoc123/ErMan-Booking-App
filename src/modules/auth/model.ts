import {IActionCallback} from '../base';
import {User} from '../user/model';
export const ROOT_MODULE = 'auth';
export const LOGIN = `${ROOT_MODULE}/LOGIN`;
export const REGISTER = `${ROOT_MODULE}/REGISTER`;
export const FORGOT_PASSWORD = `${ROOT_MODULE}/FORGOT_PASSWORD`;
export const LOG_OUT = `${ROOT_MODULE}/LOG_OUT`;
export const GET_AUTH_TOKEN = `${ROOT_MODULE}/GET_AUTH_TOKEN`;
export const REFRESH_TOKEN = `${ROOT_MODULE}/REFRESH_TOKEN`;
export const VERIFY_OTP = `${ROOT_MODULE}/VERIFY_OTP`;

export interface IAuthState {
  isLogged: boolean;
  userData: User;
}

export type IActionGetCurrentUserPayload = IActionCallback;
export type IActionLogoutPayload = IActionCallback;

export interface IActionSaveUserPayload {
  user: User;
}

export interface IActionLoginPayload extends IActionCallback {
  phone: string;
  password: string;
}

export interface IActionRegisterPayload extends IActionCallback {
  body: BodyParams;
}

export interface BodyParams {
  phone: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
}
export interface IActionForgotPasswordPayload extends IActionCallback {
  newPassword: string;
}
