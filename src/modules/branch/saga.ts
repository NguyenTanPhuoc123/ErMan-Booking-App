import { PayloadAction } from '@reduxjs/toolkit';
import { IActionGetListBranch, IActionSearchBranch } from './model';
import * as BranchService from './service'
import { isNetworkAvailable } from '../network/saga';
import { call, put } from 'redux-saga/effects';
import { saveListBranch, saveListBranchLoadMore } from './reducer';

export function* getListBranchsFn(action:PayloadAction<IActionGetListBranch>){
    const {q,page,limit,onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }

    const {result,error} = yield call(BranchService.getListBranchs,q,limit);
    if(!error){
        if(page===1){
        yield put(saveListBranch({branchs:result}));
        }
        else{    
            yield put(saveListBranchLoadMore({branchs:result}));
        }
        onSuccess && onSuccess(result);
    }
    else if(onFail){
        onFail && onFail(error);
    }
} 

export function* searchBranchFn(action:PayloadAction<IActionSearchBranch>){
    const {search,q,limit,onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }

    const {result,error} = yield call(BranchService.searchBranch,search,q,limit);
    if(!error){
        onSuccess && onSuccess(result);
    }
    else if(onFail){
        onFail && onFail(error);
    }
} 