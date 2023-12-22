import { User } from 'src/types/user.type';

export const LocalStorageEventTarget = new EventTarget();
export const setAccessTokenToLS = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const setRefreshTokenToLS = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || '';
};

export const getRefreshTokenFromLS = () =>
  localStorage.getItem('refresh_token') || '';

export const clearLS = () => {
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
  const clearLSEvent = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};
