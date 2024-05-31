import { reducer as networkReducer } from './reducer';
import { createAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import * as FuncSaga from './saga';
import * as Models from './model';

export const getConnectionStatusAsync = createAction<Models.IChangeConnectionStatusAction>(Models.GET_CONNECTION_STATUS);

function* networkSaga() {
  yield takeLatest(getConnectionStatusAsync, FuncSaga.isNetworkAvailable);
}

export { networkSaga, networkReducer };
