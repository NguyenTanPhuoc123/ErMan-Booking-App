import { createAction } from '@reduxjs/toolkit'
import * as Models from './model'
import * as FuncSaga from './saga' 
import { takeLatest } from 'redux-saga/effects';
export const getListWorkSchedule = createAction<Models.IActionGetListWorkSchedule>(Models.GET_LIST_WORK_SCHEDULE);

function* workScheduleSaga(){
    yield takeLatest(getListWorkSchedule,FuncSaga.getListWorkScheduleFn);
}

export default workScheduleSaga;