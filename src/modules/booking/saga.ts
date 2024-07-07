import { PayloadAction } from "@reduxjs/toolkit";
import { IActionCreateNewBookingPayLoad, IActionGetListBookingPayLoad} from "./model";
import { isNetworkAvailable } from "../network/saga";
import { call, put } from "redux-saga/effects";
import * as BookingService from './service'
import { saveListBookings, saveListBookingsLoadMore } from "./reducer";

export function* createNewBookingFn(action:PayloadAction<IActionCreateNewBookingPayLoad>){
    const {onSuccess,onFail,body} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail&&onFail();
        return;
    }
    const {result,error} = yield call(BookingService.createNewBooking,body);
    if(!error){
        onSuccess&&onSuccess(result);
    }
    else if(onFail){
        onFail && onFail(error);
    }
}

export function* getListBookingsByStatusFn(action:PayloadAction<IActionGetListBookingPayLoad>){
    const {onSuccess,onFail,limit,endCursor} = action.payload;
    const {isConnected} = yield isNetworkAvailable();
    if(!isConnected){
        onFail&&onFail();
        return;
    }

    const {result, error} = yield call(BookingService.getListBookings,limit,endCursor);
    if(!error){  
        yield put(saveListBookings(result));
        onSuccess&&onSuccess(result);
    }
    else if(onFail){
        onFail && onFail(error);
    }
}