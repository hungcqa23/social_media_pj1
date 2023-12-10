import { User } from 'src/types/user.type';
import http from 'src/utils/http';

type IGetUser = {
  message?: string;
  user?: User;
};

export const getUserProfile = async (userId: string) => {
  const response = await http.get<IGetUser>(`user/profile/${userId}`, {
    withCredentials: true
  });
  return response.data.user;
};
