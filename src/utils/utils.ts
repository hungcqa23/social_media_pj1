import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useSearchParams } from 'react-router-dom';

export const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams);
  return searchParamsObj;
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export const isAxiosUnprocessableEntityError = <FormError>(
  error: unknown
): error is AxiosError<FormError> =>
  isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;

export const isActiveRoute = (pathname: string, keyword: string) => {
  return pathname.split('/')[1] === keyword;
};
