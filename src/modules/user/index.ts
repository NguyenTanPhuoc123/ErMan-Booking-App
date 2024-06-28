import { createAction } from '@reduxjs/toolkit'
import * as Models from './model'
import * as FuncSaga from './saga'
import { takeLatest } from 'redux-saga/effects';
export const getListCustomer = createAction<Models.IActionGetListCustomerPayload>(Models.GET_LIST_CUSTOMER);
export const addNewUser = createAction<Models.IActionAddNewUserPayload>(Models.ADD_NEW_USER);
export const deleteUser = createAction<Models.IActionDeleteUserPayload>(Models.DELETE_USER);
function* userSaga(){
    yield takeLatest(getListCustomer,FuncSaga.getListCustomerFn);
    yield takeLatest(addNewUser,FuncSaga.addNewUserFn);
}

export default userSaga;