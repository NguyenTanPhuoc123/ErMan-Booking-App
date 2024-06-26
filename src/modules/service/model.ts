import { Pagination } from "../../constants/type";
import { IActionCallback } from "../base";

export const ROOT_MODULE = 'service';
export const GET_LIST_SERVICES = `${ROOT_MODULE}/GET_LIST_SERVICE`;
export const GET_LIST_SERVICES_DISCOUNT = `${ROOT_MODULE}/GET_LIST_SERVICES_DISCOUNT`;
export interface IServiceState{
    services: Service[];
    servicesDiscount:Service[];
}

export interface Service{
    id:string;
    image:string;
    serviceName: string;
    price:number;
    description?:string;
    time:number;
    discount: number;
}

export interface IActionSaveListServicesPayLoad{
    services: Service[];
    
}

export interface IActionSaveListServicesDiscountPayLoad{
    servicesDiscount: Service[];
    
}

export interface IActionGetListServicesPayLoad extends IActionCallback{
    q?:string;
    page?:number;
    limit:number;
}



