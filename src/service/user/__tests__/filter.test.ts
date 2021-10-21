import { IUserFilterDto, IUserFilteredDto, User } from '@model/user';
import UserFilterService from '../user-filter';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Registration Service', () => {
  let userFilterService: UserFilterService;
  let filterDto: IUserFilterDto;
  beforeEach(() => {
    userFilterService = new UserFilterService();
    filterDto = {
      filter: 'Do',
    };
  });

  it('successfully post', async () => {
    const filteredUsersData: Array<IUserFilteredDto> = [
      {
        id: 90,
        name: 'John Doo',
      },
      {
        id: 901,
        name: 'John Dooo',
      },
    ];
    const users = filteredUsersData.map(udto => new User(udto).toUserDto());
    const response = {
      data: [...filteredUsersData],
    };
    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await expect(userFilterService.filter(filterDto)).resolves.toEqual(users);
  });

  it('erroneously post', async () => {
    const errorMessage = 'UnauthorizedError';
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(userFilterService.filter(filterDto)).rejects.toThrow(
      errorMessage,
    );
  });
});
