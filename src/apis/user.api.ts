import { User } from 'src/types/user.type';
import http from 'src/utils/http';

type IGetUser = {
  message?: string;
  user?: User;
};

type TSearchUser = {
  message?: string;
  users?: User[];
};

export const getUserProfile = async (userId: string) => {
  const response = await http.get<IGetUser>(`user/profile/${userId}`, {
    withCredentials: true
  });
  return response.data.user;
};
function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}
export const searchUsers = async (query: string) => {
  if (query) {
    const response = await http.get<TSearchUser>(`user/search?q=${query}`, {
      signal: newAbortSignal(5000)
    });
    return response.data.users;
  } else {
    console.log('query null');
  }
};
