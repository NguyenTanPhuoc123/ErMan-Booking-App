import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IActionSaveListNotificationsPayload, INotificationState} from './model';

const initialState: INotificationState = {
  notifications: [],
  endCursor: '',
  hasNextPage: true,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    SAVE_LIST_NOTIFICATIONS: (
      state: INotificationState,
      action: PayloadAction<IActionSaveListNotificationsPayload>,
    ) => {
      return {
        ...state,
        endCursor: action.payload.endCursor,
        hasNextPage: action.payload.hasNextPage,
        notifications: action.payload.notifications,
      };
    },
    SAVE_LIST_NOTIFICATIONS_LOAD_MORE: (
      state: INotificationState,
      action: PayloadAction<IActionSaveListNotificationsPayload>,
    ) => {
      return {
        ...state,
        endCursor: action.payload.endCursor,
        hasNextPage: action.payload.hasNextPage,
        notifications: [
          ...state.notifications,
          ...action.payload.notifications,
        ],
      };
    },
  },
});

export const {reducer} = notificationSlice;
export const {
  SAVE_LIST_NOTIFICATIONS: saveListNotifications,
  SAVE_LIST_NOTIFICATIONS_LOAD_MORE: saveListNotificationsLoadMore,
} = notificationSlice.actions;
