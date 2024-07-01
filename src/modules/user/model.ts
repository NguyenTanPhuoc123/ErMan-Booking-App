import {BodyParams} from '../auth/model';
import {IActionCallback} from '../base';

export const ROOT_MODULE = 'user';
export const GET_LIST_USERS = `${ROOT_MODULE}/GET_LIST_CUSTOMER`;
export const ADD_NEW_USER = `${ROOT_MODULE}/ADD_NEW_USER`;
export const DELETE_USER = `${ROOT_MODULE}/DELETE_USER`;
export const EDIT_USER = `${ROOT_MODULE}/EDIT_USER`;
export interface IUserState {
  users: User[];
}
export interface User {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  phone: string;
  gender: boolean;
  birthday: string;
  address: string;
  isVerified: boolean;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
}

export interface IActionGetListUserPayload extends IActionCallback {
  q?: string;
  page?: number;
  limit?: number;
}
export type IActionGetListStaffPayload = IActionCallback;

export interface IActionSaveListUserPayload {
  users: User[];
}

export interface IActionAddToListUserPayload {
  user: User;
}

export interface IActionDeleteUserPayload {
  id: string;
}
export interface IActionAddNewUserPayload extends IActionCallback {
  body: BodyParams;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
}
