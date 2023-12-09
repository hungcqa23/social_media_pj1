import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setProfileToLS
} from './auth';
import { toast } from 'react-toastify';
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from 'src/apis/auth.api';
import { AuthResponse } from 'src/types/auth.type';

class Http {
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  public instance: AxiosInstance;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;

    this.instance = axios.create({
      baseURL: 'http://localhost:5000/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.instance.interceptors.request.use(
      config => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          toast.error('Some things wrong!');
        }
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse;
          setProfileToLS(data.user);
        } else if (url === URL_LOGOUT) {
          this.accessToken = '';
          this.refreshToken = '';
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
      }
    );
  }
}

const http = new Http().instance;

export default http;
