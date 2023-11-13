type Roles = 'user' | 'admin';

export interface User {
  _id: string;
  username: string;
  roles: Roles[];
  email: string;
  name: string;
  avatar: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
