import { createAction } from '@reduxjs/toolkit'
import * as Models from './model'
import * as FuncSaga from './saga'
import { takeLatest } from 'redux-saga/effects';
export const getListUser = createAction<Models.IActionGetListUserPayload>(Models.GET_LIST_USERS);
export const addNewUser = createAction<Models.IActionAddNewUserPayload>(Models.ADD_NEW_USER);
export const deleteUser = createAction<Models.IActionDeleteUserPayload>(Models.DELETE_USER);
function* userSaga(){
    yield takeLatest(getListUser,FuncSaga.getListCustomerFn);
    yield takeLatest(addNewUser,FuncSaga.addNewUserFn);
}

export default userSaga;