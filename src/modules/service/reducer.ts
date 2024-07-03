import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IActionSaveListServicesPayLoad, IServiceState} from './model';

const initialState: IServiceState = {
  services: [],
  hasNextPage:true,
  endCursor:''
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    SAVE_LIST_SERVICES: (
      state: IServiceState,
      action: PayloadAction<IActionSaveListServicesPayLoad>,
    ) => {
      return {
        ...state,
        services: action.payload.services,
        hasNextPage:action.payload.hasNextPage,
        endCursor:action.payload.endCursor
      };
    },
    SAVE_LIST_SERVICES_LOAD_MORE: (
      state: IServiceState,
      action: PayloadAction<IActionSaveListServicesPayLoad>,
    ) => {
      return {
        ...state,
        hasNextPage:action.payload.hasNextPage,
        endCursor:action.payload.endCursor,
        branchs: [
          ...state.services,
          ...action.payload.services,
        ],
      };
    },
   
  },
});

export const {reducer} = serviceSlice;
export const {
  SAVE_LIST_SERVICES: saveListServices,
  SAVE_LIST_SERVICES_LOAD_MORE: saveListServicesLoadMore,
} = serviceSlice.actions;
