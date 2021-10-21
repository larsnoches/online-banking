import { IUser, IUserAuthDto, IUserLoginDto, User } from '@model/user';
import axios, { AxiosError } from 'axios';
import LocalStorageHelper from '@helper/local-storage';
import { setAuthHeader } from '@helper/custom-axios';

class UserLoginService {
  public async login(userDto: IUserLoginDto): Promise<[IUser, IUserAuthDto]> {
    try {
      const response = await axios.post('/sessions/create', userDto);
      if (response == null || response.data == null) {
        throw new Error('Empty data response');
      }

      const userAuthData = response.data as IUserAuthDto;
      if (userAuthData.id_token == null) {
        throw new Error('Empty token');
      }
      const { id_token: token } = userAuthData;
      setAuthHeader(token);
      LocalStorageHelper.setItem('token', token);

      const user = new User(userDto);
      return [user.toUserDto(), userAuthData];
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response) {
        throw new Error(axiosErr.response?.data);
      } else if (axiosErr.request) {
        throw new Error('Request error');
      } else {
        throw err;
      }
    }
  }
}

export default UserLoginService;
