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
export const getListAllBooking = createAction<Models.IActionGetListAllBooking>(
  Models.GET_LIST_ALL_BOOKING,
);
export const editBooking = createAction<Models.IActionEditBookingPayload>(
  Models.EDIT_BOOKING,
);
export const payBooking = createAction<Models.IActionPayBookingPayload>(
  Models.PAY_BOOKING,
);
export const getListImageBooking =
  createAction<Models.IActionGeListImageBookingPayload>(
    Models.GET_LIST_IMAGE_BOOKING,
  );
export const addListImageBooking =
  createAction<Models.IActionAddListImageBookingPayload>(
    Models.ADD_LIST_IMAGE_BOOKING,
  );
export const getListBookingsByBranch =
  createAction<Models.IActionGetListBookingsByBranchPayload>(
    Models.GET_LIST_BOOKINGS_BY_BRANCH,
  );

export const getBookingCustomerNearest =
  createAction<Models.IActionGetBookingCustomerNearestPayload>(
    Models.GET_BOOKING_CUSTOMER_NEAREST,
  );
function* bookingSaga() {
  yield takeLatest(createNewBooking, FuncSaga.createNewBookingFn);
  yield takeLatest(editBooking, FuncSaga.editBookingFn);
  yield takeLatest(getListBookings, FuncSaga.getListBookingsFn);
  yield takeLatest(updateStatusBooking, FuncSaga.updateStatusBookingFn);
  yield takeLatest(getListBooked, FuncSaga.getListBookedFn);
  yield takeLatest(getListAllBooking, FuncSaga.getListAllBookingFn);
  yield takeLatest(payBooking, FuncSaga.payBookingFn);
  yield takeLatest(getListImageBooking, FuncSaga.getListImageBookingFn);
  yield takeLatest(addListImageBooking, FuncSaga.addListImageBookingFn);
  yield takeLatest(getListBookingsByBranch, FuncSaga.getListBookingByBranchFn);
  yield takeLatest(
    getBookingCustomerNearest,
    FuncSaga.getBookingCustomerNearestFn,
  );
}

export {bookingReducer, bookingSaga};
