import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IActionSaveUserPayload, IAuthState, LOG_OUT} from './model';

const initialState: IAuthState = {
  isLogged: false,
  userData: {
    id: '',
    avatar: '',
    firstname: '',
    lastname: '',
    phone: '',
    isVerified: false,
    typeAccount: 'Customer',
  },
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    SAVE_USER: (
      state: IAuthState,
      action: PayloadAction<IActionSaveUserPayload>,
    ) => {
      const {user} = action.payload;
      
      return {
        ...state,
        userData: user,
      };
    },
    USER_READY: (state: IAuthState) => {
      return {
        ...state,
        isLogged: true,
      };
    },
  },
});

export const {SAVE_USER: saveUser, USER_READY: userReady} = authSlice.actions;
export const {reducer} = authSlice;
