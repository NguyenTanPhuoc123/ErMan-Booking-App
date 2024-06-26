import {PayloadAction} from '@reduxjs/toolkit';
import * as ServiceSalonService from './service';
import {IActionGetListServicesPayLoad} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {saveListServices, saveListServicesDiscount} from './reducer';

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
    page,
    limit,
  );
  if (!error) {
    yield put(saveListServices({services: result}));
    onSuccess && onSuccess(result);
  } else {
    onFail && onFail(error);
  }
}

export function* getListServicesDiscountFn(
  action: PayloadAction<IActionGetListServicesPayLoad>,
) {
  const {onSuccess, onFail, limit, page, q} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.getListServicesDiscount,
    q,
    page,
    limit,
  );
  if (!error) {
    yield put(saveListServicesDiscount({servicesDiscount: result}));
    onSuccess && onSuccess(result);
  } else {
    onFail && onFail(error);
  }
}
