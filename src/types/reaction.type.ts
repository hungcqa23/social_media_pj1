// convert this to interface for me reaction

export interface Reaction {
  _id: string;
  username: string;
  postId: string;
  profilePicture: string;
  userTo: string;
  createdAt: string;
}

export interface IReactionDocument {
  _id?: string;
  username: string;
  userId: string;
  postId: string;
  commentId?: string;
  profilePicture: string;
  createdAt?: Date;
  userTo?: string;
  comment?: string;
}