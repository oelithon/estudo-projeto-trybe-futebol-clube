export interface LoginInfo {
  email: string;
  password: string;
}

export interface UserInfo extends LoginInfo {
  id: number | null;
  username: string | null;
  role: string | null;
}
