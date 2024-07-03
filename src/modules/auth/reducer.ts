import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IActionSaveUserPayload, IAuthState, LOG_OUT} from './model';

const initialState: IAuthState = {
  isLogged: false,
  userData: {
    id: 0,
    avatar: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthday: '01-01-2000',
    gender: true,
    address: '',
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
    CLEAR_USER: () => {
      return initialState;
    },
  },
});

export const {
  SAVE_USER: saveUser,
  USER_READY: userReady,
  CLEAR_USER: clearUser,
} = authSlice.actions;
export const {reducer} = authSlice;
