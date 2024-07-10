import {createAction} from '@reduxjs/toolkit';
import * as Models from './model';
import * as FuncSaga from './saga';
import {takeLatest} from 'redux-saga/effects';
import {reducer as bookingReducer} from './reducer';
export const createNewBooking =
  createAction<Models.IActionCreateNewBookingPayLoad>(
    Models.CREATE_NEW_BOOKING,
  );
export const getListBookings =
  createAction<Models.IActionGetListBookingPayLoad>(Models.GET_LIST_BOOKINGS);
export const updateStatusBooking =
  createAction<Models.IActionUpdateStatusBookingPayload>(
    Models.UPDATE_STATUS_BOOKING,
  );

function* bookingSaga() {
  yield takeLatest(createNewBooking, FuncSaga.createNewBookingFn);
  yield takeLatest(getListBookings, FuncSaga.getListBookingsFn);
  yield takeLatest(updateStatusBooking, FuncSaga.updateStatusBookingFn);
}

export {bookingReducer, bookingSaga};
