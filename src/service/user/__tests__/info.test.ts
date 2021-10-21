import { IUserInfoDto, User } from '@model/user';
import UserInfoService from '../user-info';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Info Service', () => {
  let userInfoService: UserInfoService;
  beforeEach(() => {
    userInfoService = new UserInfoService();
  });

  it('successfully post', async () => {
    const userDto: IUserInfoDto = {
      id: 90,
      name: 'John Doo',
      email: 'john@doo.foo',
      balance: 500,
    };
    const response = {
      data: {
        user_info_token: {
          ...userDto,
        },
      },
    };
    const user = new User(userDto);
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await expect(userInfoService.getInfo()).resolves.toEqual(user.toUserDto());
  });

  it('erroneously post', async () => {
    const errorMessage = 'user not found';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(userInfoService.getInfo()).rejects.toThrow(errorMessage);
  });
});
