import { PayloadAction } from '@reduxjs/toolkit'
import * as WorkScheduleService from './service'
import { IActionGetListWorkSchedule } from './model'
import { isNetworkAvailable } from '../network/saga';
import { call, put } from 'redux-saga/effects';
import { saveListWorkSchedule } from './reducer';


export  function* getListWorkScheduleFn(action:PayloadAction<IActionGetListWorkSchedule>){
    const {onSuccess,onFail,idStaff} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }

    const {result,error} = yield call(WorkScheduleService.getListWorkSchedule,idStaff);
    if(!error){
        yield put(saveListWorkSchedule({workSchedules:result}));
        onSuccess && onSuccess(result);
    }
    else if(onFail){
        onFail && onFail(error);
    }
}