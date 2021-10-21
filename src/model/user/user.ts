import {
  IUserFilteredDto as IUFilteredDto,
  IUserInfoDto as IUInfoDto,
  IUserLoginDto as IULoginDto,
  IUserRegistrationDto as IURegDto,
} from './user-dto';

// interface without IURegDto extending
// because name and username are the same
interface IUser extends IUFilteredDto, IUInfoDto, IULoginDto {
  id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
  balance: number | null;
}

// type with IURegDto for parsing in constructor
type UserDtoType = IUFilteredDto | IUInfoDto | IULoginDto | IURegDto;

// class User used for smoothing parsing roughnesses
class User implements IUser {
  private _id: number | null;
  private _name: string | null;
  private _email: string | null;
  private _password: string | null;
  private _balance: number | null;

  constructor(dto: UserDtoType) {
    this._id = (dto as IUInfoDto | IUFilteredDto)?.id;
    this._name = (dto as IURegDto)?.username;
    if (this._name == null) {
      this._name = (dto as IUInfoDto | IUFilteredDto)?.name;
    }
    this._email = (dto as IUInfoDto | IULoginDto | IURegDto)?.email;
    this._password = (dto as IULoginDto | IURegDto)?.password;
    this._balance = (dto as IUInfoDto)?.balance;
  }

  public toRegistrationDto(): IURegDto {
    return {
      username: this.name,
      password: this.password,
      email: this.email,
    };
  }

  public toLoginDto(): IULoginDto {
    return {
      email: this.email,
      password: this.password,
    };
  }

  public toInfoDto(): IUInfoDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      balance: this.balance,
    };
  }

  public toFilteredDto(): IUFilteredDto {
    return {
      id: this.id,
      name: this.name,
    };
  }

  public toUserDto(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      balance: this.balance,
    };
  }

  public isNull(): boolean {
    return (
      this.id == null &&
      this.name == null &&
      this.email == null &&
      this.password == null &&
      this.balance == null
    );
  }

  public get id(): number | null {
    return this._id;
  }

  public set id(value: number | null) {
    this._id = value;
  }

  public get name(): string | null {
    return this._name;
  }

  public set name(value: string | null) {
    this._name = value;
  }

  public get email(): string | null {
    return this._email;
  }

  public set email(value: string | null) {
    this._email = value;
  }

  public get password(): string | null {
    return this._password;
  }

  public set password(value: string | null) {
    this._password = value;
  }

  public get balance(): number | null {
    return this._balance;
  }

  public set balance(value: number | null) {
    this._balance = value;
  }
}

export type { IUser };
export { User };
