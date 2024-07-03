import { createAction } from "@reduxjs/toolkit";
import * as Models from './model'
import { takeLatest } from "redux-saga/effects";
import * as FuncSaga from './saga'
import {reducer as serviceReducer} from './reducer'
export const getListService = createAction<Models.IActionGetListServicesPayLoad>(Models.GET_LIST_SERVICES);
export const searchServiceByName = createAction<Models.IActionSearchServicesByNamePayLoad>(Models.SEARCH_SERVICE_BY_NAME);
function* serviceSaga(){
    yield takeLatest(getListService,FuncSaga.getListServiceFn);
    yield takeLatest(searchServiceByName,FuncSaga.searchServiceByNameFn)
}

export {serviceReducer,serviceSaga};