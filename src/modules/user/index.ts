import {createAction} from '@reduxjs/toolkit';
import * as Models from './model';
import * as FuncSaga from './saga';
import {takeLatest} from 'redux-saga/effects';
import {reducer as userReducer} from './reducer';

export const getListCustomer = createAction<Models.IActionGetListUserPayload>(
  Models.GET_LIST_CUSTOMER,
);
export const addNewUser = createAction<Models.IActionAddNewUserPayload>(
  Models.ADD_NEW_USER,
);
export const deleteUser = createAction<Models.IActionDeleteUserPayload>(
  Models.DELETE_USER,
);
export const getListStaff = createAction<Models.IActionGetListStaffPayload>(
  Models.GET_LIST_STAFF,
);
export const searchStaff = createAction<Models.IActionSearchUserPayload>(
  Models.SEARCH_STAFF,
);

export const searchCustomer = createAction<Models.IActionSearchUserPayload>(
  Models.SEARCH_CUSTOMER,
);

function* userSaga() {
  yield takeLatest(getListCustomer, FuncSaga.getListCustomerFn);
  // yield takeLatest(addNewUser,FuncSaga.addNewUserFn);
  yield takeLatest(getListStaff, FuncSaga.getListStaffFn);
  yield takeLatest(searchStaff, FuncSaga.searchStaffFn);
  yield takeLatest(searchCustomer, FuncSaga.searchCustomerFn);
}

export {userReducer, userSaga};
