import {
  alertClear,
  alertError,
  alertSuccess,
  createTransactionFailed,
  createTransactionStart,
  createTransactionSuccess,
  getTransactionListFailed,
  getTransactionListStart,
  getTransactionListSuccess,
} from '@state/slices';
import { AppDispatch } from '@helper/store';
import { AppThunk } from '@helper/store/store';
import { ITransactionCreateDto } from '@model/transaction';
import { push } from 'connected-react-router';
import transactionService from '@service/transaction';
import { userAsyncActions } from './user-async-actions';

export const transactionAsyncActions = {
  create,
  getList,
};

const waitBeforeRedirectMs = 2000;

function create(transCreateDto: ITransactionCreateDto): AppThunk {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(createTransactionStart());
    try {
      const transaction = await transactionService.create(transCreateDto);
      dispatch(createTransactionSuccess(transaction));
      dispatch(alertSuccess('Transaction was created'));
      setTimeout(() => {
        dispatch(push('/'));
        dispatch(alertClear());
      }, waitBeforeRedirectMs);
    } catch (error) {
      const err = error as Error;
      dispatch(createTransactionFailed());
      // logout if bad token
      if (err.message.startsWith('UnauthorizedError')) {
        dispatch(alertError('Please, login'));
        await dispatch(userAsyncActions.logout());
      } else {
        dispatch(alertError(err.message));
      }
      throw err;
    }
  };
}

function getList(): AppThunk {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(getTransactionListStart());
    try {
      const transactions = await transactionService.getList();
      dispatch(getTransactionListSuccess(transactions));
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
      dispatch(getTransactionListFailed());
      throw err;
    }
  };
}
