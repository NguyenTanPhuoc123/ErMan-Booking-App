import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Admin,
  IActionAddToListUserPayload,
  IActionSaveListUserPayload,
  IUserState,
  Staff,
} from './model';

const initialState: IUserState = {
  users: [],
  staffs: [],
  endCursor: '',
  hasNextPage: true,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    SAVE_LIST_USER: (
      state: IUserState,
      action: PayloadAction<IActionSaveListUserPayload>,
    ) => {
      return {...state, ...action.payload};
    },
    SAVE_LIST_USER_LOADMORE: (
      state: IUserState,
      action: PayloadAction<IActionSaveListUserPayload>,
    ) => {
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
        endCursor: action.payload.endCursor,
        users: [...state.users, ...action.payload.users],
        staffs: [
          ...state.users,
          ...action.payload.users.filter(
            user => user.typeAccount != 'Customer',
          ),
        ] as (Staff | Admin)[],
      };
    },
    ADD_TO_LIST: (
      state: IUserState,
      action: PayloadAction<IActionAddToListUserPayload>,
    ) => {
      const {user} = action.payload;
      state.users.push(user);
    },
  },
});

export const {reducer} = userSlice;
export const {
  SAVE_LIST_USER: saveListUser,
  ADD_TO_LIST: addToList,
  SAVE_LIST_USER_LOADMORE: saveListUserLoadmore,
} = userSlice.actions;
