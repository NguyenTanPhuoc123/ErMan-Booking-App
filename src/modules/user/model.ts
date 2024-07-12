import {BodyParams} from '../auth/model';
import {IActionCallback} from '../base';
export const ROOT_MODULE = 'user';
export const GET_LIST_CUSTOMER = `${ROOT_MODULE}/GET_LIST_CUSTOMER`;
export const GET_LIST_STAFF = `${ROOT_MODULE}/GET_LIST_STAFF`;
export const ADD_NEW_USER = `${ROOT_MODULE}/ADD_NEW_USER`;
export const DELETE_USER = `${ROOT_MODULE}/DELETE_USER`;
export const EDIT_USER = `${ROOT_MODULE}/EDIT_USER`;
export const SEARCH_STAFF = `${ROOT_MODULE}/SEARCH_STAFF`;
export const SEARCH_CUSTOMER = `${ROOT_MODULE}/SEARCH_CUSTOMER`;
export interface IUserState {
  users: User[];
  staffs: (Staff | Admin)[];
  hasNextPage: boolean;
  endCursor?: string;
}
export interface User {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: boolean;
  birthday: string;
  address: string;
  isVerified: boolean;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
}

export interface Staff extends User {
  workPlace: string;
  timeStartWork: string;
}

export interface Admin extends User {
  workPlace: string;
  timeStartWork: string;
}

export interface IActionGetListUserPayload extends IActionCallback {
  page: number;
  limit: number;
  endCursor?: string;
}

export interface IActionGetListStaffPayload extends IActionCallback {
  endCursor?: string;
  limit: number;
  page: number;
}

export interface IActionSaveListUserPayload {
  users: (User | Staff | Admin)[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionAddToListUserPayload {
  user: User | Staff | Admin;
}

export interface IActionSearchUserPayload extends IActionCallback {
  search: string;
}
export interface IActionDeleteUserPayload {
  id: string;
}
export interface IActionAddNewUserPayload extends IActionCallback {
  body: BodyParams;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
  workPlace?: number;
  timeStartWork?: string;
}
