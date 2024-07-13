import {IActionCallback} from '../base';
import {Branch} from '../branch/model';
export const ROOT_MODULE = 'user';
export const GET_LIST_CUSTOMER = `${ROOT_MODULE}/GET_LIST_CUSTOMER`;
export const GET_LIST_STAFF = `${ROOT_MODULE}/GET_LIST_STAFF`;
export const ADD_NEW_STAFF = `${ROOT_MODULE}/ADD_NEW_STAFF`;
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
  birthday: string;
  address: string;
  isVerified: boolean;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
}

export interface Staff extends User {
  workPlace: Branch;
  timeStartWork: string;
}

export interface Admin extends User {
  workPlace: Branch;
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

export interface IActionSaveListStaffPayload {
  staffs: (Staff | Admin)[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionAddToListUserPayload {
  user: User | Staff | Admin;
}

export interface IActionSearchUserPayload extends IActionCallback {
  search: string;
}
export interface IActionDeleteUserPayload extends IActionCallback {
  id: number;
}
export interface IActionAddNewStaffPayload extends IActionCallback {
  body:BodyAddStaffParams;
}

export interface BodyAddStaffParams {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  typeAccount: 'Customer' | 'Staff' | 'Admin';
  address: string;
  birthday: string;
  timeStartWork: string;
  workPlace: number;
}

export interface IActionEditProfileStaffPayload extends IActionCallback {
  id:number;
  workPlace: number;
}
