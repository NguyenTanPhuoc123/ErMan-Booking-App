import * as FuncSaga from './saga';
import * as Models from './model'
import { createAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
export const getListBranchs = createAction<Models.IActionGetListBranch>(Models.GET_LIST_BRANCHS);
export const searchBranch = createAction<Models.IActionSearchBranch>(Models.SEARCH_BRANCH);

function* branchSaga(){
    yield takeLatest(getListBranchs,FuncSaga.getListBranchsFn);
    yield takeLatest(searchBranch,FuncSaga.searchBranchFn);
}

export default branchSaga;