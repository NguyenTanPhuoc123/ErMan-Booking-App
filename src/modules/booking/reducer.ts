import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAcionSaveListBookingPayLoad,
  IActionUpdateStatusBookingPayload,
  IBookingState,
} from './model';

const initialState: IBookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    SAVE_LIST_BOOKINGS: (
      state: IBookingState,
      action: PayloadAction<IAcionSaveListBookingPayLoad>,
    ) => {
      return {
        ...state,
        bookings: action.payload.bookings,
      };
    },
    SAVE_LIST_BOOKINGS_LOAD_MORE: (
      state: IBookingState,
      action: PayloadAction<IAcionSaveListBookingPayLoad>,
    ) => {
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
        endCursor: action.payload.endCursor,
        branchs: [...state.bookings, ...action.payload.bookings],
      };
    },
    UPDATE_STATUS: (
      state: IBookingState,
      action: PayloadAction<IActionUpdateStatusBookingPayload>,
    ) => {
      const {id, status} = action.payload;
      const bookingExist = state.bookings.find(booking => booking.id === id);
      if (bookingExist) {
        bookingExist.status = status;
      }
    },
  },
});

export const {reducer} = bookingSlice;
export const {
  SAVE_LIST_BOOKINGS: saveListBookings,
  SAVE_LIST_BOOKINGS_LOAD_MORE: saveListBookingsLoadMore,
  UPDATE_STATUS: updateStatus,
} = bookingSlice.actions;
