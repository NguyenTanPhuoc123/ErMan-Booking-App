import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionChangePasswordPayload,
  IActionCheckEmailExist,
  IActionEditProfilePayload,
  IActionForgotPasswordPayload,
  IActionGetCurrentUserPayload,
  IActionLoginPayload,
  IActionLogoutPayload,
  IActionRegisterPayload,
  IActionVerifyEmailPayload,
} from './model';
import * as AuthService from './service';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {clearUser, saveUser, userReady} from './reducer';
import {getCurrentUser} from '.';

export function* loginFn(action: PayloadAction<IActionLoginPayload>) {
  const {email, password, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error} = yield call(AuthService.login, email, password);

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

export function* verifyEmailFn(
  action: PayloadAction<IActionVerifyEmailPayload>,
) {
  const {email, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error, result} = yield call(AuthService.verifyEmail, email);
  if (!error) {
    console.log('Result: ', result);

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

export function* changePasswordFn(action:PayloadAction<IActionChangePasswordPayload>){
  const {newPassword, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
    const {error} = yield call(AuthService.changePassword, newPassword);
  if(!error){
    onSuccess && onSuccess(newPassword);
  }
  else if(onFail){
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

export function* checkEmailExistFn(
  action: PayloadAction<IActionCheckEmailExist>,
) {
  const {onSuccess, onFail,email} = action.payload;
  const {isConnected} = yield isNetworkAvailable();

  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(AuthService.checkEmailExist,email);

  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* forgotPasswordFn(
  action: PayloadAction<IActionForgotPasswordPayload>,
) {
  const {onSuccess, onFail,email} = action.payload;
  const {isConnected} = yield isNetworkAvailable();

  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(AuthService.resetPassword,email);

  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}