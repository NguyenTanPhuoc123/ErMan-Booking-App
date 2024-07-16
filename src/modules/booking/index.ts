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

export const getListBooked = createAction<Models.IActionGetListBookedPayload>(
  Models.GET_LIST_BOOKED,
);

export const getListAllBooking = createAction<Models.IActionGetListAllBooking>(Models.GET_LIST_ALL_BOOKING);
export const editBooking = createAction<Models.IActionEditBookingPayload>(
  Models.EDIT_BOOKING,
);

export const payBooking = createAction<Models.IActionPayBookingPayload>(Models.PAY_BOOKING);

function* bookingSaga() {
  yield takeLatest(createNewBooking, FuncSaga.createNewBookingFn);
  yield takeLatest(editBooking, FuncSaga.editBookingFn);
  yield takeLatest(getListBookings, FuncSaga.getListBookingsFn);
  yield takeLatest(updateStatusBooking, FuncSaga.updateStatusBookingFn);
  yield takeLatest(getListBooked, FuncSaga.getListBookedFn);
  yield takeLatest(getListAllBooking,FuncSaga.getListAllBookingFn);
  yield takeLatest(payBooking,FuncSaga.payBookingFn);
}

export {bookingReducer, bookingSaga};
