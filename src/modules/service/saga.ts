import {PayloadAction} from '@reduxjs/toolkit';
import * as ServiceSalonService from './service';
import {
  IActionAddNewServicePayload,
  IActionCheckServiceNameExistPayLoad,
  IActionDeleteServicePayload,
  IActionGetListServicesPayLoad,
  IActionSearchServicesByNamePayLoad,
  IActionUpdateServicePayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {removeService, saveListServices, saveListServicesLoadMore} from './reducer';

export function* getListServiceFn(
  action: PayloadAction<IActionGetListServicesPayLoad>,
) {
  const {onSuccess, onFail, limit, page, endCursor} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.getListServices,
    endCursor,
    limit,
  );
  if (!error) {
    if (page === 1) {
      yield put(saveListServices(result));
    } else {
      yield put(saveListServicesLoadMore(result));
    }
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

export function* checkServiceNameExistFn(
  action: PayloadAction<IActionCheckServiceNameExistPayLoad>,
) {
  const {onSuccess, onFail, serviceName} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.checkServiceNameExist,
    serviceName,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* addNewServiceFn(
  action: PayloadAction<IActionAddNewServicePayload>,
) {
  const {onSuccess, onFail, serviceName, price, time, image, description} =
    action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.addNewService,
    serviceName,
    price,
    time,
    image,
    description,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* updateServiceFn(
  action: PayloadAction<IActionUpdateServicePayload>,
) {
  const {onSuccess, onFail, service} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    ServiceSalonService.updateService,
    service,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* deleteServiceFn(
  action: PayloadAction<IActionDeleteServicePayload>,
) {
  const {onSuccess, onFail, id} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(ServiceSalonService.deleteService, id);
  if (!error) {
    yield put(removeService({id:id}));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
