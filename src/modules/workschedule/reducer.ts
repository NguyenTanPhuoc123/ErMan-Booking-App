import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActionSaveListWorkSchedulePayLoad, IWorkScheduleState } from "./model";

const initialState:IWorkScheduleState = {
    workSchedules:[]
}

const workScheduleSlice = createSlice({
    name:'workschedule',
    initialState,
    reducers:{
       SAVE_LIST_WORK_SCHEDULE: (state:IWorkScheduleState,action:PayloadAction<IActionSaveListWorkSchedulePayLoad>)=>{
        return {
            ...state,
            workSchedules:action.payload.workSchedules
        }
       }
    }
})

export const {reducer} = workScheduleSlice;
export const {SAVE_LIST_WORK_SCHEDULE : saveListWorkSchedule} = workScheduleSlice.actions;