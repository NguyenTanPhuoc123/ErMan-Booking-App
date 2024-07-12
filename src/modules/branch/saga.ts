import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionCheckBranchExist,
  IActionCreateNewBranchPayload,
  IActionDeleteBranchPayload,
  IActionGetListBranch,
  IActionSearchBranch,
  IActionUpdateBranchPayload,
} from './model';
import * as BranchService from './service';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {removeBranch, saveListBranch, saveListBranchLoadMore} from './reducer';

export function* getListBranchsFn(action: PayloadAction<IActionGetListBranch>) {
  const {endCursor, page, limit, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    BranchService.getListBranchs,
    endCursor,
    limit,
  );
  if (!error) {
    if (page === 1) {
      yield put(saveListBranch(result));
    } else {
      yield put(saveListBranchLoadMore(result));
    }
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* searchBranchFn(action: PayloadAction<IActionSearchBranch>) {
  const {search, limit, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(BranchService.searchBranch, search);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* checkBranchExistFn(
  action: PayloadAction<IActionCheckBranchExist>,
) {
  const {onSuccess, onFail, branchName} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    BranchService.checkBranchExist,
    branchName,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* addNewBranchFn(
  action: PayloadAction<IActionCreateNewBranchPayload>,
) {
  const {
    onSuccess,
    onFail,
    branchName,
    openTime,
    closeTime,
    address,
    description,
    image,
  } = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    BranchService.addNewBranch,
    branchName,
    openTime,
    closeTime,
    address,
    image,
    description,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* updateBranchFn(
  action: PayloadAction<IActionUpdateBranchPayload>,
) {
  const {onSuccess, onFail, branch} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    BranchService.updateBranch,
    branch,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* deleteBranchFn(
  action: PayloadAction<IActionDeleteBranchPayload>,
) {
  const {onSuccess, onFail, branchId} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(BranchService.deleteBranch, branchId);
  if (!error) {
    yield put(removeBranch({id:branchId}));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}