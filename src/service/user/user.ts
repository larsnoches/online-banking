import {
  IUser,
  IUserAuthDto,
  IUserFilterDto,
  IUserLoginDto,
  IUserRegistrationDto,
} from '@model/user';
import UserFilterService from './user-filter';
import UserInfoService from './user-info';
import UserLoginService from './user-login';
import UserRegistrationService from './user-registration';

// facade service
class UserService {
  private readonly userRegistrationService = new UserRegistrationService();
  private readonly userLoginService = new UserLoginService();
  private readonly userInfoService = new UserInfoService();
  private readonly userFilterService = new UserFilterService();

  public register(
    userDto: IUserRegistrationDto,
  ): Promise<[IUser, IUserAuthDto]> {
    return this.userRegistrationService.register(userDto);
  }

  public login(userDto: IUserLoginDto): Promise<[IUser, IUserAuthDto]> {
    return this.userLoginService.login(userDto);
  }

  public getInfo(): Promise<IUser> {
    return this.userInfoService.getInfo();
  }

  public filter(filterDto: IUserFilterDto): Promise<Array<IUser>> {
    return this.userFilterService.filter(filterDto);
  }
}

const userService = new UserService();
export default userService;
