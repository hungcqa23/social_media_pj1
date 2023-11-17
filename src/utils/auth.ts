export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || '';

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
