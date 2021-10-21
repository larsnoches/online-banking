import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum AlertTypes {
  AlertSuccess = 'success',
  AlertInfo = 'info',
  AlertWarning = 'warning',
  AlertError = 'error',
}

type AlertInitialStateType = {
  alertType: string | null;
  alertMessage: string | null;
};

const alertInitialState: AlertInitialStateType = {
  alertType: null,
  alertMessage: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: alertInitialState,
  reducers: {
    alertSuccess: (state, action: PayloadAction<string>) => {
      state.alertType = AlertTypes.AlertSuccess;
      state.alertMessage = action.payload;
    },
    alertInfo: (state, action: PayloadAction<string>) => {
      state.alertType = AlertTypes.AlertInfo;
      state.alertMessage = action.payload;
    },
    alertWarning: (state, action: PayloadAction<string>) => {
      state.alertType = AlertTypes.AlertWarning;
      state.alertMessage = action.payload;
    },
    alertError: (state, action: PayloadAction<string>) => {
      state.alertType = AlertTypes.AlertError;
      state.alertMessage = action.payload;
    },
    alertClear: state => {
      state.alertType = null;
      state.alertMessage = null;
    },
  },
});

export const { alertSuccess, alertInfo, alertWarning, alertError, alertClear } =
  alertSlice.actions;
export default alertSlice.reducer;
