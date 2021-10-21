import { AppDispatch } from '@helper/store';
import { AppThunk } from '@helper/store/store';
import { alertClear } from '@state/slices';

export const alertAsyncActions = {
  clear,
};

function clear(): AppThunk {
  return (dispatch: AppDispatch): Promise<void> =>
    new Promise(resolve => {
      dispatch(alertClear());
      resolve();
    });
}
