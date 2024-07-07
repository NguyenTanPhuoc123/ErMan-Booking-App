import {IActionCallback} from '../base';

export const ROOT_MODULE = 'service';
export const GET_LIST_SERVICES = `${ROOT_MODULE}/GET_LIST_SERVICE`;
export const GET_LIST_SERVICES_DISCOUNT = `${ROOT_MODULE}/GET_LIST_SERVICES_DISCOUNT`;
export const SEARCH_SERVICE_BY_NAME = `${ROOT_MODULE}/SEARCH_SERVICE_BY_NAME`;
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
  discount: number;
}

export interface IActionSaveListServicesPayLoad {
  services: Service[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionSearchServicesByNamePayLoad extends IActionCallback {
  serviceName: string;
}
export interface IActionGetListServicesPayLoad extends IActionCallback {
  page?: number;
  endCursor?: string;
  limit: number;
}
