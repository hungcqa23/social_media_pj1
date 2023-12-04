import { User } from './user.type';
import { ResponseAPI, SuccessResponse } from './utils.type';

export interface AuthResponse extends SuccessResponse {
  token: string;
  user: User;
}
