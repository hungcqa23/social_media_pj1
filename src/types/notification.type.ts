export interface Notification {
  _id: string;
  userTo: string;
  userFrom: string;
  userFromProfilePicture: string;
  read: boolean;
  message: string;
  notificationType: string;
  entityId: string;
  createdItemId: string;
  comment: string;
  reaction: string;
  post: string;
  imgId: string;
  imgVersion: string;
  gifUrl: string;
  createdAt: string;
  __v: number;
}
