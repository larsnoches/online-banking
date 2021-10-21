export interface IUserRegistrationDto {
  username: string | null;
  password: string | null;
  email: string | null;
}

export interface IUserLoginDto {
  password: string | null;
  email: string | null;
}

export interface IUserAuthDto {
  id_token: string;
}

export interface IUserPackedInfoDto {
  user_info_token: IUserInfoDto;
}

export interface IUserInfoDto {
  id: number | null;
  name: string | null;
  email: string | null;
  balance: number | null;
}

export interface IUserFilterDto {
  filter: string;
}

export interface IUserFilteredDto {
  id: number | null;
  name: string | null;
}
