import {createAction} from '@reduxjs/toolkit';
import * as Models from './model';
import * as FuncSaga from './saga';
import {takeLatest} from 'redux-saga/effects';
import {reducer as userReducer} from './reducer';

export const getListCustomer = createAction<Models.IActionGetListUserPayload>(
  Models.GET_LIST_CUSTOMER,
);
export const addNewStaff = createAction<Models.IActionAddNewStaffPayload>(
  Models.ADD_NEW_STAFF,
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

export const editProfile = createAction<Models.IActionEditProfileStaffPayload>(
  Models.EDIT_USER,
);

export const getListStaffByBranch =
  createAction<Models.IActionGetListStaffByBranchPayload>(
    Models.GET_LIST_STAFF_BY_BRANCH,
  );

function* userSaga() {
  yield takeLatest(getListCustomer, FuncSaga.getListCustomerFn);
  yield takeLatest(addNewStaff, FuncSaga.addNewStaffFn);
  yield takeLatest(getListStaff, FuncSaga.getListStaffFn);
  yield takeLatest(searchStaff, FuncSaga.searchStaffFn);
  yield takeLatest(searchCustomer, FuncSaga.searchCustomerFn);
  yield takeLatest(editProfile, FuncSaga.editProfileFn);
  yield takeLatest(deleteUser, FuncSaga.deleteUser);
  yield takeLatest(getListStaffByBranch, FuncSaga.getListStaffByBranchFn);
}

export {userReducer, userSaga};
