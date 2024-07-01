import {PayloadAction} from '@reduxjs/toolkit';
import * as ServiceSalonService from './service';
import {
  IActionGetListServicesPayLoad,
  IActionSearchServicesByNamePayLoad,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {saveListServices,saveListServicesLoadMore} from './reducer';

export function* getListServiceFn(
  action: PayloadAction<IActionGetListServicesPayLoad>,
) {
  const {onSuccess, onFail, limit, page, q} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.getListServices,
    q,
    limit,
  );
  if (!error) {
    if(page===1){
    yield put(saveListServices({services: result}));
    }
    else{
      yield put(saveListServicesLoadMore({services: result}));
    }
    onSuccess && onSuccess(result);
  } else {
    onFail && onFail(error);
  }
}

export function* getListServicesDiscountFn(
  action: PayloadAction<IActionGetListServicesPayLoad>,
) {
  const {onSuccess, onFail, limit, q} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.getListServicesDiscount,
    q,
    limit,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else {
    onFail && onFail(error);
  }
}

export function* searchServiceByNameFn(
  action: PayloadAction<IActionSearchServicesByNamePayLoad>,
) {
  const {onSuccess, onFail, serviceName} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.searchServiceByName,
    serviceName,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else {
    onFail && onFail(error);
  }
}
