import {createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit';
import {IChangeConnectionStatusPayload, INetworkStatus} from './model';

const initialState: INetworkStatus = {
  isConnected: true,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    CHANGE_STATUS_CONNECTION: (
      state: INetworkStatus,
      action: PayloadAction<IChangeConnectionStatusPayload>,
    ) => {
      const {isConnected} = action.payload;
      return {...state, isConnected};
    },
  },
});
export const {CHANGE_STATUS_CONNECTION: changeStatusConnection} =
  networkSlice.actions;
export const reducer: Reducer<INetworkStatus> = networkSlice.reducer;
