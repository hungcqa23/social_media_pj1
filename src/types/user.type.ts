// type Roles = 'user' | 'admin';

// Convert this to interface
// "_id": "6567fd28ec30e86a7dc57d20",
// "profilePicture": "https://res.cloudinary.com/daszajz9a/image/upload/v1701313833/6567fd28ec30e86a7dc57d20",
// "postsCount": 3,
// "followersCount": 0,
// "followingCount": 0,
// "blocked": [],
// "blockedBy": [],
// "notifications": {
//     "messages": true,
//     "reactions": true,
//     "comments": true,
//     "follows": true
// },
// "social": {
//     "facebook": "",
//     "instagram": "",
//     "twitter": "",
//     "youtube": ""
// },
// "work": "",
// "school": "",
// "location": "",
// "quote": "",
// "authId": "6567fd28ec30e86a7dc57d1f",
// "username": "Mindless",
// "fullname": "Phu Le",
// "uId": "802175763091",
// "email": "domenick_bechtelar80@hotmail.com",
// "createdAt": "2023-11-30T03:10:32.539Z"
export interface User {
  _id: string;
  profilePicture?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  blocked: string[];
  blockedBy: string[];
  notifications: {
    messages: boolean;
    reactions: boolean;
    comments: boolean;
    follows: boolean;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  work: string;
  school: string;
  location: string;
  quote: string;
  authId?: string;
  username: string;
  fullname: string;
  uId: string;
  email: string;
  createdAt: string;
}
