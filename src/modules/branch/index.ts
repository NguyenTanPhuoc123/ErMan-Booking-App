import * as FuncSaga from './saga';
import * as Models from './model'
import { createAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import {reducer as branchReducer} from './reducer';
export const getListBranchs = createAction<Models.IActionGetListBranch>(Models.GET_LIST_BRANCHS);
export const searchBranch = createAction<Models.IActionSearchBranch>(Models.SEARCH_BRANCH);
export const checkBranchExist = createAction<Models.IActionCheckBranchExist>(Models.CHECK_BRANCH_EXIST);
export const addNewBranch = createAction<Models.IActionCreateNewBranchPayload>(Models.ADD_NEW_BRANCH);
export const updateBranch = createAction<Models.IActionUpdateBranchPayload>(Models.UPDATE_BRANCH);
export const deleteBranch = createAction<Models.IActionDeleteBranchPayload>(Models.DELETE_BRANCH);

function* branchSaga(){
    yield takeLatest(getListBranchs,FuncSaga.getListBranchsFn);
    yield takeLatest(searchBranch,FuncSaga.searchBranchFn);
    yield takeLatest(checkBranchExist,FuncSaga.checkBranchExistFn);
    yield takeLatest(addNewBranch,FuncSaga.addNewBranchFn);
    yield takeLatest(updateBranch,FuncSaga.updateBranchFn);
    yield takeLatest(deleteBranch,FuncSaga.deleteBranchFn);
}

export {branchReducer,branchSaga};