import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IActionSaveListBranch, IBranchState} from './model';

const initialState: IBranchState = {
  branchs: [],
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    SAVE_LIST_BRANCH: (
      state: IBranchState,
      action: PayloadAction<IActionSaveListBranch>,
    ) => {
      return {...state, branchs: action.payload.branchs};
    },
    SAVE_LIST_BRANCH_LOAD_MORE: (
      state: IBranchState,
      action: PayloadAction<IActionSaveListBranch>,
    ) => {
      
      return {
        ...state,
        branchs: [
          ...state.branchs,
          ...action.payload.branchs,
        ],
      };
    },
  },
});

export const {reducer} = branchSlice;
export const {
  SAVE_LIST_BRANCH: saveListBranch,
  SAVE_LIST_BRANCH_LOAD_MORE: saveListBranchLoadMore,
} = branchSlice.actions;
