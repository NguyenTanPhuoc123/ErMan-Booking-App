import { createAction } from "@reduxjs/toolkit";
import * as Models from './model'
import { take, takeLatest } from "redux-saga/effects";
import * as FuncSaga from './saga';
import {reducer as authReducer} from './reducer';  

export const login = createAction<Models.IActionLoginPayload>(Models.LOGIN);
export const getCurrentUser = createAction<Models.IActionGetCurrentUserPayload>(Models.GET_CURRENT_USER);
export const register = createAction<Models.IActionRegisterPayload>(Models.REGISTER);
export const verifyPhone = createAction<Models.IActionVerifyPhonePayload>(Models.VERIFY_PHONE);
export const userReadyLoadData = createAction(Models.USER_READY_LOAD_DATA);
function * authSaga() {
    yield takeLatest(login,FuncSaga.loginFn);
    yield takeLatest(getCurrentUser,FuncSaga.getCurrentUserFn);
    yield takeLatest(register,FuncSaga.registerFn);
    yield takeLatest(verifyPhone,FuncSaga.verifyPhoneFn);
    yield takeLatest(userReadyLoadData,FuncSaga.userReadyLoadDataFn);
    
}

export {authReducer,authSaga};