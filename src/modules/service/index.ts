import {createAction} from '@reduxjs/toolkit';
import * as Models from './model';
import {takeLatest} from 'redux-saga/effects';
import * as FuncSaga from './saga';
import {reducer as serviceReducer} from './reducer';

export const getListService =
  createAction<Models.IActionGetListServicesPayLoad>(Models.GET_LIST_SERVICES);
export const searchServiceByName =
  createAction<Models.IActionSearchServicesByNamePayLoad>(
    Models.SEARCH_SERVICE_BY_NAME,
  );
export const checkServiceNameExist =
  createAction<Models.IActionCheckServiceNameExistPayLoad>(
    Models.CHECK_SERVICE_NAME_EXIST,
  );

export const addNewService = createAction<Models.IActionAddNewServicePayload>(
  Models.ADD_NEW_SERVICE,
);

export const updateService = createAction<Models.IActionUpdateServicePayload>(
  Models.UPDATE_SERVICE,
);

export const deleteService = createAction<Models.IActionDeleteServicePayload>(
  Models.DELETE_SERVICE,
);

function* serviceSaga() {
  yield takeLatest(getListService, FuncSaga.getListServiceFn);
  yield takeLatest(searchServiceByName, FuncSaga.searchServiceByNameFn);
  yield takeLatest(checkServiceNameExist, FuncSaga.checkServiceNameExistFn);
  yield takeLatest(addNewService, FuncSaga.addNewServiceFn);
  yield takeLatest(updateService, FuncSaga.updateServiceFn);
  yield takeLatest(deleteService, FuncSaga.deleteServiceFn);
}

export {serviceReducer, serviceSaga};
