export interface Post {
  _id?: string;
  userId?: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  post?: string;
  imgVersion?: string;
  pId?: string;
  imgId?: string;
  videoVersion?: string;
  videoId?: string;
  feelings?: string;
  gifUrl?: string;
  privacy: 'public' | 'private';
  reactions?: {
    like: number;
  };
  commentsCount?: number;
  createdAt?: string;
}
