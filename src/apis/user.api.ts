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

export const searchUsers = async (query: string) => {
  if (query) {
    const response = await http.get<TSearchUser>(`user/search?q=${query}`, {
      withCredentials: true
    });
    return response.data.users;
  } else {
    console.log('query null');
  }
};
