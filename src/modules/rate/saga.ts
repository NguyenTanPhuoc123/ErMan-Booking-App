import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionCreateRatingPayload,
  IActionGetRatingBookingPayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import * as RatingService from './service';
import {call} from 'redux-saga/effects';
export function* createRatingFn(
  action: PayloadAction<IActionCreateRatingPayload>,
) {
  const {bookingId, review, reviewer, rate, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    RatingService.createRating,
    reviewer,
    bookingId,
    rate,
    review,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getRatingBookingFn(
  action: PayloadAction<IActionGetRatingBookingPayload>,
) {
  const {bookingId, reviewerId, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    RatingService.getRatingBooking,
    bookingId,
    reviewerId,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
