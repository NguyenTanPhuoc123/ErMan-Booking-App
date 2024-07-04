import { IActionCallback } from "../base";

const ROOT_MODULE = 'workschedule';
export const GET_LIST_WORK_SCHEDULE = `${ROOT_MODULE}/GET_LIST_WORK_SCHEDULE`;

export interface WorkSchedule {
    id:number;
    idStaff:number;
    dayWork:string;
    timeStart: string;
    timeEnd:string;
}

export interface IWorkScheduleState {
    workSchedules:WorkSchedule[]
}

export interface IActionSaveListWorkSchedulePayLoad {
    workSchedules:WorkSchedule[];
}

export interface IActionGetListWorkSchedule extends IActionCallback {
    idStaff:number;
}