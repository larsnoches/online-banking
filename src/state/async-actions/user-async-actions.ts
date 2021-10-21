import { AppDispatch, RootState } from '@helper/store';
import { IUserLoginDto, IUserRegistrationDto } from '@model/user';
import {
  alertError,
  getUserInfoFailed,
  getUserInfoStart,
  getUserInfoSuccess,
  loginContinue,
  loginUserFailed,
  loginUserStart,
  loginUserSuccess,
  logoutUser,
  registerUserFailed,
  registerUserStart,
  registerUserSuccess,
} from '@state/slices';
import { getLocation, push } from 'connected-react-router';
import { AppThunk } from '@helper/store/store';
import LocalStorageHelper from '@helper/local-storage';
import { setAuthHeader } from '@helper/custom-axios';
import userService from '@service/user';

export const userAsyncActions = {
  register,
  login,
  loginWithToken,
  logout,
  getUserInfo,
};

function register(userRegistrationDto: IUserRegistrationDto): AppThunk {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(registerUserStart());
    try {
      const regData = await userService.register(userRegistrationDto);
      dispatch(registerUserSuccess(regData));
      dispatch(push('/'));
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
      dispatch(registerUserFailed());
      throw err;
    }
  };
}

function login(userLoginDto: IUserLoginDto): AppThunk {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(loginUserStart());
    try {
      const loginData = await userService.login(userLoginDto);
      dispatch(loginUserSuccess(loginData));
      dispatch(push('/'));
    } catch (error) {
      const err = error as Error;
      dispatch(alertError(err.message));
      dispatch(loginUserFailed());
      throw err;
    }
  };
}

function loginWithToken(token: string): AppThunk {
  return (dispatch: AppDispatch): Promise<void> =>
    new Promise(resolve => {
      dispatch(loginContinue(token));
      setAuthHeader(token);
      dispatch(push('/'));
      resolve();
    });
}

function logout(): AppThunk {
  return (dispatch: AppDispatch, getState: () => RootState): Promise<void> =>
    new Promise(resolve => {
      LocalStorageHelper.removeItem('token');
      dispatch(logoutUser());
      const loc = getLocation(getState());
      if (loc.pathname !== '/login' && loc.pathname !== '/') {
        dispatch(push('/'));
      }
      resolve();
    });
}

function getUserInfo(): AppThunk {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(getUserInfoStart());
    try {
      const userData = await userService.getInfo();
      setTimeout(() => {
        dispatch(getUserInfoSuccess(userData));
      }, 1000);
    } catch (error) {
      const err = error as Error;
      dispatch(getUserInfoFailed());
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
