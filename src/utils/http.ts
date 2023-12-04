import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
import { getAccessTokenFromLS, getRefreshTokenFromLS } from './auth';
import { toast } from 'react-toastify';

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
  }
}

const http = new Http().instance;

export default http;
