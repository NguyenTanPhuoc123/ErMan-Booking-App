import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAcionSaveListBookingPayLoad, IBookingState} from './model';

const initialState: IBookingState = {
  bookings: [],
  endCursor: '',
  hasNextPage: true,
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
        endCursor: action.payload.endCursor,
        hasNextPage: action.payload.hasNextPage,
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
  },
});

export const {reducer} = bookingSlice;
export const {
  SAVE_LIST_BOOKINGS: saveListBookings,
  SAVE_LIST_BOOKINGS_LOAD_MORE: saveListBookingsLoadMore,
} = bookingSlice.actions;
