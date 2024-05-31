import { Action } from 'redux';
import { ApiError } from '../../constants/api';

export enum CommonActionType {
  RESET_ALL_STATE = 'RESET_ALL_STATE',
}

export interface IActionCallback {
  onSuccess?: (data?: any, identify?: string) => void;
  onFail?: (error?: ApiError) => void;
}

export interface IActionResetAllState extends Action {
  type: CommonActionType.RESET_ALL_STATE;
}

export interface IActionPaginationArg {
  page?: number;
  limit?: number;
}
