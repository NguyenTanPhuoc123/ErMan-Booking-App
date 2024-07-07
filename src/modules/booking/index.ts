import { createAction } from '@reduxjs/toolkit'
import * as Models from'./model'
import * as FuncSaga from './saga'
import { takeLatest } from 'redux-saga/effects';

export const createNewBooking = createAction<Models.IActionCreateNewBookingPayLoad>(Models.CREATE_NEW_BOOKING);
export const getListBookings = createAction<Models.IActionGetListBookingPayLoad>(Models.GET_LIST_BOOKINGS);

export function* bookingSaga(){
    yield takeLatest(createNewBooking,FuncSaga.createNewBookingFn);
    yield takeLatest(getListBookings,FuncSaga.getListBookingsByStatusFn);
}

export default bookingSaga;