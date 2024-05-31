import { IActionCallback } from "../base";

const ROOT_MODULE = 'network';
export const GET_CONNECTION_STATUS = `${ROOT_MODULE}/GET_CONNECTION_STATUS`;

export interface INetworkStatus{
    isConnected: boolean;
}

export interface IChangeConnectionStatusPayload {
    isConnected: boolean;
}

export interface IChangeConnectionStatusAction extends IActionCallback{
    
}