import {takeLatest} from 'redux-saga/effects';
import * as Models from './model';
import * as FuncSaga from './saga';
import {createAction} from '@reduxjs/toolkit';
import {reducer as ratingReducer} from './reducer';
export const createRating = createAction<Models.IActionCreateRatingPayload>(
  Models.CREATE_RATING,
);
export const getRatingBooking =
  createAction<Models.IActionGetRatingBookingPayload>(
    Models.GET_RATING_BOOKING,
  );

function* ratingSaga() {
  yield takeLatest(createRating, FuncSaga.createRatingFn);
  yield takeLatest(getRatingBooking, FuncSaga.getRatingBookingFn);
}

export {ratingReducer, ratingSaga};
