import { createAction } from "@reduxjs/toolkit";
import * as Models from './model'
import { takeLatest } from "redux-saga/effects";
import * as FuncSaga from './saga'
import {reducer as serviceReducer} from './reducer'
export const getListService = createAction<Models.IActionGetListServicesPayLoad>(Models.GET_LIST_SERVICES);

function* serviceSaga(){
    yield takeLatest(getListService,FuncSaga.getListServiceFn);
}

export {serviceReducer,serviceSaga};