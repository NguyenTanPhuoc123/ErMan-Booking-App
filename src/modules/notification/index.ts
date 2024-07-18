import * as FuncSaga from './saga';
import * as Models from './model';
import {createAction} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {reducer as notificationReducer} from './reducer';

export const getListNotifications =
  createAction<Models.IActionGetListNotificationsPayload>(
    Models.GET_LIST_NOTIFICATIONS,
  );

export const createNotification =
  createAction<Models.IActionCreateNotificationPayload>(
    Models.CREATE_NOTIFICATION,
  );

export const updateStatusRead =
  createAction<Models.IActionUpdateStatusReadPayload>(
    Models.UPDATE_STATUS_READ,
  );

function* notificationSaga() {
  yield takeLatest(getListNotifications, FuncSaga.getListNotificationsFn);
  yield takeLatest(createNotification, FuncSaga.createNotificationFn);
  yield takeLatest(updateStatusRead, FuncSaga.updateStatusReadFn);
}

export {notificationSaga, notificationReducer};
