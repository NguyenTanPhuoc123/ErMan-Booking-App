import { PayloadAction } from '@reduxjs/toolkit';
import * as UserService from './service'
import { IActionAddNewUserPayload, IActionGetListUserPayload } from './model';
import { isNetworkAvailable } from '../network/saga';
import { call, put } from 'redux-saga/effects';
import { addToList, saveListUser } from './reducer';

export function* getListCustomerFn(action:PayloadAction<IActionGetListUserPayload>){
    const {onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }

    const {result,error} = yield call(UserService.getListUsers);
    if(!error){
        onSuccess && onSuccess(result);
        yield put(saveListUser({users:result}));
    }
    else if(onFail){
        onFail && onFail(error);
    }
}

export function* addNewUserFn(action:PayloadAction<IActionAddNewUserPayload>){
    const {body,typeAccount,onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }

    const {result,error} = yield call(UserService.addNewUser,body,typeAccount);
    if(!error){
        onSuccess && onSuccess(result);
        // yield put(addToList({user:result}));
    }
    else if(onFail){
        onFail && onFail(error);
    }
}