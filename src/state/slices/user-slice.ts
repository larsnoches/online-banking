import { IUser, IUserAuthDto } from '@model/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserStateType = {
  data: IUser;
  token: null | string;
  error: boolean;
  loading: boolean;
};

const userInitialState: UserStateType = {
  data: {
    id: null,
    name: null,
    email: null,
    password: null,
    balance: null,
  } as IUser,
  token: null,
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    // register
    registerUserStart: state => {
      state.loading = true;
      state.error = false;
    },
    registerUserSuccess: (
      state,
      action: PayloadAction<[IUser, IUserAuthDto]>,
    ) => {
      const [user, tokenData] = action.payload;
      state.data.email = user.email;
      state.data.name = user.name;
      state.token = tokenData.id_token;
      state.loading = false;
      state.error = false;
    },
    registerUserFailed: (state, _action: PayloadAction) => {
      state.loading = false;
      state.error = true;
    },

    // login
    loginUserStart: state => {
      state.loading = true;
      state.error = false;
    },
    loginUserSuccess: (state, action: PayloadAction<[IUser, IUserAuthDto]>) => {
      const [user, tokenData] = action.payload;
      state.data.email = user.email;
      state.token = tokenData.id_token;
      state.loading = false;
      state.error = false;
    },
    loginUserFailed: (state, _action: PayloadAction) => {
      state.loading = false;
      state.error = true;
    },

    // login-continue
    loginContinue: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = false;
    },

    // logout
    logoutUser: (_state, _action: PayloadAction) => userInitialState,

    // get user info
    getUserInfoStart: state => {
      state.loading = true;
      state.error = false;
    },
    getUserInfoSuccess: (state, action: PayloadAction<IUser>) => {
      state.data.id = action.payload.id;
      state.data.name = action.payload.name;
      state.data.email = action.payload.email;
      state.data.balance = action.payload.balance;
      state.loading = false;
      state.error = false;
    },
    getUserInfoFailed: (state, _action: PayloadAction) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getUserInfoStart,
  getUserInfoFailed,
  getUserInfoSuccess,
  loginUserStart,
  loginUserFailed,
  loginUserSuccess,
  loginContinue,
  logoutUser,
  registerUserStart,
  registerUserFailed,
  registerUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
