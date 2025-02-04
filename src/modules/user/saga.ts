import {PayloadAction} from '@reduxjs/toolkit';
import * as UserService from './service';
import {
  IActionAddNewStaffPayload,
  IActionDeleteUserPayload,
  IActionEditProfileStaffPayload,
  IActionGetListStaffByBranchPayload,
  IActionGetListStaffPayload,
  IActionGetListUserPayload,
  IActionSearchUserPayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {
  saveListStaffLoadmore,
  saveListUser,
  saveListUserLoadmore,
} from './reducer';

export function* getListCustomerFn(
  action: PayloadAction<IActionGetListUserPayload>,
) {
  const {onSuccess, onFail, endCursor, limit, page} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    UserService.getListCustomer,
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
      yield put(saveListStaffLoadmore(result));
    }
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* addNewStaffFn(
  action: PayloadAction<IActionAddNewStaffPayload>,
) {
  const {body, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(UserService.addNewStaff, body);
  if (!error) {
    // yield put(addToList({user: result}));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* searchStaffFn(
  action: PayloadAction<IActionSearchUserPayload>,
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

export function* searchCustomerFn(
  action: PayloadAction<IActionSearchUserPayload>,
) {
  const {search, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(UserService.searchCustomer, search);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* editProfileFn(
  action: PayloadAction<IActionEditProfileStaffPayload>,
) {
  const {id, workPlace, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(UserService.editProfile, id, workPlace);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* deleteUser(action: PayloadAction<IActionDeleteUserPayload>) {
  const {id, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(UserService.deleteUser, id);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getListStaffByBranchFn(
  action: PayloadAction<IActionGetListStaffByBranchPayload>,
) {
  const {onSuccess, onFail, branchId} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    UserService.getListStaffByBranch,
    branchId,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
