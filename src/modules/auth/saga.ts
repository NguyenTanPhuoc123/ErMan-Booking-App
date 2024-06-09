import { PayloadAction } from '@reduxjs/toolkit';
import { IActionLoginPayload, IActionRegisterPayload } from './model';
import * as AuthService from './service';
import { isNetworkAvailable } from '../network/saga';
import { call } from 'redux-saga/effects';

export function * loginFn(action:PayloadAction<IActionLoginPayload>){
    const {phone,password,onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }
    const {error} = yield call(AuthService.login,phone,password);
    if(!error){
        onSuccess && onSuccess();
        console.log("Login success");
        
    }
    else if(onFail){
        onFail(error);
    }
}

export function* registerFn(action:PayloadAction<IActionRegisterPayload>){
    const {body,onSuccess,onFail} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail && onFail();
        return;
    }
    const {error,result} = yield call(AuthService.register,body);

    if(!error){
        onSuccess && onSuccess(result);
    }
    else if(onFail){
        onFail(error);
    }
}