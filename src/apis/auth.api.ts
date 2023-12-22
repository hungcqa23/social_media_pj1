import { AuthResponse } from 'src/types/auth.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export const URL_LOGIN = 'signin';
export const URL_REGISTER = 'signup';
export const URL_LOGOUT = 'signout';
export const URL_FORGOT_PASSWORD = 'forgot-password';
export const URL_RESET_PASSWORD = 'reset-password';

const authApi = {
  registerAccount({
    email,
    password,
    username,
    firstName = 'Anonymous',
    lastName = 'User'
  }: {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
  }) {
    return http.post<AuthResponse>(URL_REGISTER, {
      email,
      password,
      username,
      firstname: firstName,
      lastname: lastName
    });
  },
  login(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post<SuccessResponse>(URL_LOGOUT);
  },
  forgotPassword(body: { email: string }) {
    return http.post<SuccessResponse>(URL_FORGOT_PASSWORD, body);
  },
  resetPassword(body: {
    password: string;
    confirmPassword: string;
    token: string;
  }) {
    return http.post<SuccessResponse>(`${URL_RESET_PASSWORD}/${body.token}`, {
      password: body.password,
      confirmPassword: body.confirmPassword
    });
  }
};

export default authApi;
