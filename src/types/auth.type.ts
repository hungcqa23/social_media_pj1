import { User } from './user.type';
import { ResponseAPI, SuccessResponse } from './utils.type';

export type AuthResponse = SuccessResponse<{
  access_token: string;
  refresh_token: string;
  user: User;
}>;
