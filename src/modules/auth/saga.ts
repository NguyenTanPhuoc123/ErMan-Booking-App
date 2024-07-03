import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionEditProfilePayload,
  IActionGetCurrentUserPayload,
  IActionLoginPayload,
  IActionLogoutPayload,
  IActionRegisterPayload,
  IActionVerifyPhonePayload,
} from './model';
import * as AuthService from './service';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {clearUser, saveUser, userReady} from './reducer';
import {getCurrentUser} from '.';

export function* loginFn(action: PayloadAction<IActionLoginPayload>) {
  const {phone, password, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error} = yield call(AuthService.login, phone, password);

  if (!error) {
    yield put(getCurrentUser({onSuccess, onFail}));
  } else if (onFail) {
    onFail(error);
  }
}

export function* getCurrentUserFn(
  action: PayloadAction<IActionGetCurrentUserPayload>,
) {
  const {onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();

  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(AuthService.getCurrentUser);

  if (!error) {
    yield put(saveUser({user: result}));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* verifyPhoneFn(
  action: PayloadAction<IActionVerifyPhonePayload>,
) {
  const {phone, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error} = yield call(AuthService.verifyPhone, phone);
  if (!error) {
    onSuccess && onSuccess();
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* registerFn(action: PayloadAction<IActionRegisterPayload>) {
  const {body, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error, result} = yield call(AuthService.register, body);

  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail(error);
  }
}

export function* userReadyLoadDataFn() {
  yield put(userReady());
}

export function* editProfileFn(
  action: PayloadAction<IActionEditProfilePayload>,
) {
  const {user, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(AuthService.editProfile, user);

  if (!error) {
    yield put(saveUser({user: result}));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* logoutFn(action: PayloadAction<IActionLogoutPayload>) {
  const {onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(AuthService.logout);
  if (!error) {
    yield put(clearUser());
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
