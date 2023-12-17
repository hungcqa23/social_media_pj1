// Convert it to interface for me:
// {
//   "userTo": "6570314f24f96860fbe52e0e",
//   "reactions": {
//       "like": 0
//   },
//   "comment": "Nice pic",
//   "createdAt": "2023-12-10T02:56:40.000Z",
//   "username": "anbeel",
//   "_id": "657528e80ef668fd42ec83fe",
//   "postId": "657528850ef668fd42ec83fd",
//   "profilePicture": "https://res.cloudinary.com/daszajz9a/image/upload/v1701959913/6571d8e796eff65ea366b1a2"
// }

export interface IComment {
  _id: string;
  postId: string;
  userTo: string;
  username: string;
  profilePicture: string;
  comment: string;
  reactions: {
    like: number;
  };
  userId: string;
  createdAt: string;
}
