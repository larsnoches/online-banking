import { IUserLoginDto, User } from '@model/user';
import UserLoginService from '../user-login';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Login Service', () => {
  let userLoginService: UserLoginService;
  let userDto: IUserLoginDto;
  let user: User;
  beforeEach(() => {
    userLoginService = new UserLoginService();
    userDto = {
      email: 'john@doo.foo',
      password: 'johnpwd',
    };
    user = new User(userDto);
  });

  it('successfully post', async () => {
    const data = {
      data: {
        id_token: '1234567890qwertyuiop',
      },
    };
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(data));
    const what = [user.toUserDto(), data.data];
    await expect(userLoginService.login(userDto)).resolves.toEqual(what);
  });

  it('erroneously post', async () => {
    const errorMessage = 'You must send email and password';
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(userLoginService.login(userDto)).rejects.toThrow(errorMessage);
  });
});
