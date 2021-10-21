import { IUser, IUserFilterDto, IUserFilteredDto, User } from '@model/user';
import axios, { AxiosError } from 'axios';

class UserFilterService {
  public async filter(filterDto: IUserFilterDto): Promise<Array<IUser>> {
    try {
      const response = await axios.post('/api/protected/users/list', filterDto);
      if (response == null || response.data == null) {
        throw new Error('Empty data response');
      }

      const filteredUsersData = response.data as Array<IUserFilteredDto>;
      const users = filteredUsersData.map(udto => new User(udto).toUserDto());
      return users;
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

export default UserFilterService;
