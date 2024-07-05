import { createAction } from "@reduxjs/toolkit";
import * as Models from './model'
import { takeLatest } from "redux-saga/effects";
import * as FuncSaga from './saga';
import {reducer as authReducer} from './reducer';  

export const login = createAction<Models.IActionLoginPayload>(Models.LOGIN);
export const getCurrentUser = createAction<Models.IActionGetCurrentUserPayload>(Models.GET_CURRENT_USER);
export const register = createAction<Models.IActionRegisterPayload>(Models.REGISTER);
export const verifyEmail = createAction<Models.IActionVerifyEmailPayload>(Models.VERIFY_EMAIL);
export const userReadyLoadData = createAction(Models.USER_READY_LOAD_DATA);
export const logout = createAction<Models.IActionLogoutPayload>(Models.LOG_OUT);
export const editProfile = createAction<Models.IActionEditProfilePayload>(Models.EDIT_PROFILE);

function * authSaga() {
    yield takeLatest(login,FuncSaga.loginFn);
    yield takeLatest(getCurrentUser,FuncSaga.getCurrentUserFn);
    yield takeLatest(register,FuncSaga.registerFn);
    yield takeLatest(verifyEmail,FuncSaga.verifyEmailFn);
    yield takeLatest(userReadyLoadData,FuncSaga.userReadyLoadDataFn);
    yield takeLatest(editProfile,FuncSaga.editProfileFn);
    yield takeLatest(logout,FuncSaga.logoutFn);
}

export {authReducer,authSaga};