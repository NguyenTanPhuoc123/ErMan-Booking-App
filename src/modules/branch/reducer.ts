import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IActionSaveListBranch, IBranchState} from './model';

const initialState: IBranchState = {
  branchs: [],
  hasNextPage: true,
  endCursor: '',
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    SAVE_LIST_BRANCH: (
      state: IBranchState,
      action: PayloadAction<IActionSaveListBranch>,
    ) => {
      return {
        ...state,
        branchs: action.payload.branchs,
        hasNextPage: action.payload.hasNextPage,
        endCursor: action.payload.endCursor,
      };
    },
    SAVE_LIST_BRANCH_LOAD_MORE: (
      state: IBranchState,
      action: PayloadAction<IActionSaveListBranch>,
    ) => {
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
        endCursor: action.payload.endCursor,
        branchs: [...state.branchs, ...action.payload.branchs],
      };
    },
  },
});

export const {reducer} = branchSlice;
export const {
  SAVE_LIST_BRANCH: saveListBranch,
  SAVE_LIST_BRANCH_LOAD_MORE: saveListBranchLoadMore,
} = branchSlice.actions;
