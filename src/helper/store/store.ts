import { Action, Reducer, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { alertReducer, transactionsReducer, userReducer } from '@state/slices';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ThunkAction } from 'redux-thunk';
import { historyInstance } from '@helper/history';
import logger from 'redux-logger';

const isDevelopment = process.env.NODE_ENV !== 'production';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
    transactions: transactionsReducer,
    router: connectRouter(historyInstance) as Reducer,
  },
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware().concat(
      routerMiddleware(historyInstance),
    );
    if (isDevelopment) {
      return middleware.concat(logger);
    }
    return middleware;
  },
  devTools: isDevelopment,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppThunk = ThunkAction<Promise<void>, RootState, unknown, Action>;
export type { AppThunk };

export default store;
