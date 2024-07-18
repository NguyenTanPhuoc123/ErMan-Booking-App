import {PayloadAction} from '@reduxjs/toolkit';
import * as NotificationService from './service';
import {
  IActionCreateNotificationPayload,
  IActionGetListNotificationsPayload,
  IActionUpdateStatusReadPayload,
} from './model';
import {isNetworkAvailable} from '../network/saga';
import {call, put} from 'redux-saga/effects';
import {saveListNotifications, saveListNotificationsLoadMore} from './reducer';

export function* getListNotificationsFn(
  action: PayloadAction<IActionGetListNotificationsPayload>,
) {
  const {limit, page, endCursor, receiverId, onSuccess, onFail} =
    action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }

  const {result, error} = yield call(
    NotificationService.getListNotifications,
    receiverId,
    limit,
    endCursor,
  );
  if (!error) {
    if (page === 1) {
      yield put(saveListNotifications(result));
    } else {
      yield put(saveListNotificationsLoadMore(result));
    }
    onSuccess && onSuccess();
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* createNotificationFn(
  action: PayloadAction<IActionCreateNotificationPayload>,
) {
  const {title, message, receiverId, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    NotificationService.createNotification,
    title,
    message,
    receiverId,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}

export function* updateStatusReadFn(
  action: PayloadAction<IActionUpdateStatusReadPayload>,
) {
  const {notificationId, onSuccess, onFail} = action.payload;
  const {isConnected} = yield isNetworkAvailable();
  if (!isConnected) {
    onFail && onFail();
    return;
  }
  const {result, error} = yield call(
    NotificationService.updateStatusRead,
    notificationId,
  );
  if (!error) {
    onSuccess && onSuccess(result);
  } else if (onFail) {
    onFail && onFail(error);
  }
}
