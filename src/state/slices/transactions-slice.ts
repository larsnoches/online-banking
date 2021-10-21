import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITransactionDto } from '@model/transaction';

type TransactionStateType = {
  data: Array<ITransactionDto>;
  error: boolean;
  loading: boolean;
};

const initialState: TransactionStateType = {
  data: [],
  error: false,
  loading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // create a transaction
    createTransactionStart: (state, _action: PayloadAction) => {
      state.loading = true;
      state.error = false;
    },
    createTransactionSuccess: (
      state,
      action: PayloadAction<ITransactionDto>,
    ) => {
      state.data.push(action.payload);
      state.data.sort((a, b) => {
        if (a.id == null || b.id == null) return 0;
        return b.id - a.id;
      });
      state.loading = false;
      state.error = false;
    },
    createTransactionFailed: (state, _action: PayloadAction) => {
      state.loading = false;
      state.error = true;
    },

    // get list of transactions
    getTransactionListStart: (state, _action: PayloadAction) => {
      state.loading = true;
      state.error = false;
    },
    getTransactionListSuccess: (
      state,
      action: PayloadAction<Array<ITransactionDto>>,
    ) => ({
      ...state,
      loading: false,
      error: false,
      data: [...action.payload],
    }),
    getTransactionListFailed: (state, _action: PayloadAction) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailed,
  getTransactionListStart,
  getTransactionListSuccess,
  getTransactionListFailed,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
