import axios, { AxiosInstance } from 'axios';

class Http {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const http = new Http().instance;

export default http;
