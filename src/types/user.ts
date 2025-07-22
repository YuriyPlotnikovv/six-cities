export type User = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type UserAuth = Pick<User, 'email'> & {password: string};
