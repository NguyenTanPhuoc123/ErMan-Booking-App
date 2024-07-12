import {IActionCallback} from '../base';

export const ROOT_MODULE = 'service';
export const GET_LIST_SERVICES = `${ROOT_MODULE}/GET_LIST_SERVICE`;
export const GET_LIST_SERVICES_DISCOUNT = `${ROOT_MODULE}/GET_LIST_SERVICES_DISCOUNT`;
export const SEARCH_SERVICE_BY_NAME = `${ROOT_MODULE}/SEARCH_SERVICE_BY_NAME`;
export const CHECK_SERVICE_NAME_EXIST = `${ROOT_MODULE}/CHECK_SERVICE_NAME_EXIST`;
export const ADD_NEW_SERVICE = `${ROOT_MODULE}/ADD_NEW_SERVICE`;
export const UPDATE_SERVICE = `${ROOT_MODULE}/UPDATE_SERVICE`;
export const DELETE_SERVICE = `${ROOT_MODULE}/DELETE_SERVICE`;
export interface IServiceState {
  services: Service[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface Service {
  id: number;
  image: string;
  serviceName: string;
  price: number;
  description?: string;
  time: number;
}

export interface IActionSaveListServicesPayLoad {
  services: Service[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionSearchServicesByNamePayLoad extends IActionCallback {
  serviceName: string;
}

export interface IActionCheckServiceNameExistPayLoad extends IActionCallback {
  serviceName: string;
}

export interface IActionRemoveServicePayload extends IActionCallback {
  id: number;
}

export interface IActionDeleteServicePayload extends IActionCallback {
  id: number;
}
export interface IActionAddNewServicePayload extends IActionCallback {
  serviceName: string;
  price: number;
  description?: string;
  image?: string;
  time: number;
}

export interface IActionGetListServicesPayLoad extends IActionCallback {
  page?: number;
  endCursor?: string;
  limit: number;
}

export interface IActionUpdateServicePayload extends IActionCallback {
  service: Service;
}
