import { IUser, IUserPackedInfoDto, User } from '@model/user';
import axios, { AxiosError } from 'axios';

class UserInfoService {
  public async getInfo(): Promise<IUser> {
    try {
      const response = await axios.get('/api/protected/user-info');
      if (response == null || response.data == null) {
        throw new Error('Empty data response');
      }
      const userPackedInfoData = response.data as IUserPackedInfoDto;
      if (userPackedInfoData.user_info_token == null) {
        throw new Error('Empty packed info data');
      }

      const { user_info_token: userDto } = userPackedInfoData;
      const user = new User(userDto);
      return user.toUserDto();
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

export default UserInfoService;
