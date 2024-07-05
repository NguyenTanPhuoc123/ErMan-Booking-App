import {PayloadAction} from '@reduxjs/toolkit';
import * as UserService from './service';
import {
  IActionAddNewUserPayload,
  IActionGetListStaffPayload,
  IActionGetListUserPayload,
  IActionSearchStylistPayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {saveListUser, saveListUserLoadmore} from './reducer';

export function* getListCustomerFn(
  action: PayloadAction<IActionGetListUserPayload>,
) {
  const {onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(UserService.getListCustomer);
  if (!error) {
    onSuccess && onSuccess(result);
    yield put(saveListUser(result));
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getListStaffFn(
  action: PayloadAction<IActionGetListStaffPayload>,
) {
  const {onSuccess, onFail, endCursor, limit, page} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    UserService.getListStaffs,
    limit,
    endCursor,
  );
  if (!error) {
    if (page === 1) {
      yield put(saveListUser(result));
    } else {
      yield put(saveListUserLoadmore(result));
    }
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

// export function* addNewUserFn(action: PayloadAction<IActionAddNewUserPayload>) {
//   const {body, typeAccount,workPlace,timeStartWork,onSuccess, onFail} = action.payload;
//   const {isConnected} = yield isNetworkAvailable();
//   if (!isConnected) {
//     onFail && onFail();
//     return;
//   }

//   const {result, error} = yield call(UserService.addNewUser, body, typeAccount,workPlace,timeStartWork);
//   if (!error) {
//     onSuccess && onSuccess(result);
//     // yield put(addToList({user:result}));
//   } else if (onFail) {
//     onFail && onFail(error);
//   }
// }

export function* searchStaffFn(
  action: PayloadAction<IActionSearchStylistPayload>,
) {
  const {search, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(UserService.searchStaff, search);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
