import { IActionCallback } from '../base';
import {Admin, Staff, User} from '../user/model';

const ROOT_MODULE = 'notification';
export const GET_LIST_NOTIFICATIONS = `${ROOT_MODULE}/GET_LIST_NOTIFICATIONS`;
export const UPDATE_STATUS_READ = `${ROOT_MODULE}/UPDATE_STATUS_READ`;
export const CREATE_NOTIFICATION = `${ROOT_MODULE}/CREATE_NOTIFICATION`;
export const UPDATE_ALL_STATUS_READ = `${ROOT_MODULE}/UPDATE_ALL_STATUS_READ`;

export interface INotificationState {
    notifications: Array<Notification>;
    endCursor?:string;
    hasNextPage:boolean;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  createTime: Date;
  isRead: boolean;
  receiver: User | Staff | Admin;
}

export interface IActionGetListNotificationsPayload extends IActionCallback {
    page:number;
    endCursor?:string;
    limit:number;
    receiverId:number;
}

export interface IActionCreateNotificationPayload extends IActionCallback {
    title:string;
    message:string;
    receiverId:number;
}

export interface IActionSaveListNotificationsPayload{
    notifications:Array<Notification>;
    endCursor?:string;
    hasNextPage:boolean;
}

export interface IActionUpdateStatusReadPayload extends IActionCallback {
    notificationId:number;
}

export type IActionUpdateAllStatusReadPayload = IActionCallback;