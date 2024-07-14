import {PayloadAction} from '@reduxjs/toolkit';
import {
  IActionCreateNewBookingPayLoad,
  IActionGetListAllBooking,
  IActionGetListBookedPayload,
  IActionGetListBookingPayLoad,
  IActionUpdateStatusBookingPayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import * as BookingService from './service';
import {
  saveListBookings,
  saveListBookingsLoadMore,
  updateStatus,
} from './reducer';

export function* createNewBookingFn(
  action: PayloadAction<IActionCreateNewBookingPayLoad>,
) {
  const {onSuccess, onFail, body} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(BookingService.createNewBooking, body);
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getListBookingsFn(
  action: PayloadAction<IActionGetListBookingPayLoad>,
) {
  const {onSuccess, onFail, limit, endCursor, id} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    BookingService.getListBookings,
    limit,
    id,
    endCursor,
  );
  if (!error) {
    yield put(saveListBookings(result));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getListAllBookingFn(
  action: PayloadAction<IActionGetListAllBooking>,
) {
  const {onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    BookingService.getListAllBooking,
  );
  if (!error) {
    yield put(saveListBookings(result));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* updateStatusBookingFn(
  action: PayloadAction<IActionUpdateStatusBookingPayload>,
) {
  const {onSuccess, onFail, id, status, isPaid} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {error, result} = yield call(
    BookingService.updateStatusBooking,
    id,
    status,
    isPaid,
  );
  if (!error) {
    yield put(updateStatus(result));
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* getListBookedFn(
  action: PayloadAction<IActionGetListBookedPayload>,
) {
  const {onSuccess, onFail, staffId, dateBooking} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    BookingService.getListBooked,
    staffId,
    dateBooking,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
