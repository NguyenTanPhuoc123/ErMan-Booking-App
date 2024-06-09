import { createAction } from "@reduxjs/toolkit";
import * as Models from './model'
import { takeLatest } from "redux-saga/effects";
import * as FuncSaga from './saga';
import {reducer as authReducer} from './reducer';  

export const login = createAction<Models.IActionLoginPayload>(Models.LOGIN);
export const register = createAction<Models.IActionRegisterPayload>(Models.REGISTER);
function * authSaga() {
    yield takeLatest(login,FuncSaga.loginFn);
    yield takeLatest(register,FuncSaga.registerFn);
}

export {authReducer,authSaga};