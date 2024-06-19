import { Pagination } from "../../constants/type";
import { IActionCallback } from "../base";

export const ROOT_MODULE = 'service';
export const GET_LIST_SERVICES = `${ROOT_MODULE}/GET_LIST_SERVICE`;

export interface IServiceState{
    services: Service[];
}

export interface Service{
    id:string;
    image:string;
    serviceName: string;
    price:number;
    description?:string;
    discount?: number;
}

export interface IActionSaveListServicesPayLoad{
    services: Service[];
}

export interface IActionGetListServicesPayLoad extends IActionCallback{
    q?:string;
    page?:number;
    limit:number;
}
