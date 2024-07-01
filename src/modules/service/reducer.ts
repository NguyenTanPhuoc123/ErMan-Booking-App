import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IActionSaveListServicesDiscountPayLoad, IActionSaveListServicesPayLoad, IServiceState} from './model';

const initialState: IServiceState = {
  services: [],
  servicesDiscount:[]
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
      };
    },
    SAVE_LIST_SERVICES_LOAD_MORE: (
      state: IServiceState,
      action: PayloadAction<IActionSaveListServicesPayLoad>,
    ) => {
      return {
        ...state,
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
