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
        services: {
          ...action.payload.services,
          results: [
            ...state.services,
            ...action.payload.services,
          ],
        },
      };
    },
    SAVE_LIST_SERVICES_DISCOUNT: (
      state: IServiceState,
      action: PayloadAction<IActionSaveListServicesDiscountPayLoad>,
    ) => {
      return {
        ...state,
        servicesDiscount: action.payload.servicesDiscount,
      };
    },
    SAVE_LIST_SERVICES_DISCOUNT_LOAD_MORE: (
      state: IServiceState,
      action: PayloadAction<IActionSaveListServicesDiscountPayLoad>,
    ) => {
      return {
        ...state,
        services: {
          ...action.payload.servicesDiscount,
          results: [
            ...state.services,
            ...action.payload.servicesDiscount,
          ],
        },
      };
    },
  },
});

export const {reducer} = serviceSlice;
export const {
  SAVE_LIST_SERVICES: saveListServices,
  SAVE_LIST_SERVICES_LOAD_MORE: saveListServicesLoadMore,
  SAVE_LIST_SERVICES_DISCOUNT:saveListServicesDiscount,
  SAVE_LIST_SERVICES_DISCOUNT_LOAD_MORE:saveListServicesDiscountLoadMore
} = serviceSlice.actions;
