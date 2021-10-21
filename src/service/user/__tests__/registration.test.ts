import { IUserRegistrationDto, User } from '@model/user';
import UserRegistrationService from '../user-registration';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Registration Service', () => {
  let userRegistrationService: UserRegistrationService;
  let userDto: IUserRegistrationDto;
  let user: User;
  beforeEach(() => {
    userRegistrationService = new UserRegistrationService();
    userDto = {
      username: 'John Doo',
      password: 'johnpwd',
      email: 'john@doo.foo',
    };
    user = new User(userDto);
  });

  it('successfully post', async () => {
    const response = {
      data: {
        id_token: '1234567890qwertyuiop',
      },
    };
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    const what = [user.toUserDto(), response.data];
    await expect(userRegistrationService.register(userDto)).resolves.toEqual(
      what,
    );
  });

  it('erroneously post', async () => {
    const errorMessage = 'A user with that email already exists';
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(userRegistrationService.register(userDto)).rejects.toThrow(
      errorMessage,
    );
  });
});
