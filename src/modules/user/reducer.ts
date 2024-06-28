import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IActionAddToListUserPayload,
  IActionSaveListUserPayload,
  IUserState,
} from './model';

const initialState: IUserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    SAVE_LIST_USER: (
      state: IUserState,
      action: PayloadAction<IActionSaveListUserPayload>,
    ) => {
      const {users} = action.payload;
      return {...state, users: users};
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
export const {SAVE_LIST_USER: saveListUser, ADD_TO_LIST: addToList} =
  userSlice.actions;
