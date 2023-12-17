import { Post } from 'src/types/post.type';
import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface GetProfile extends SuccessResponse {
  user: User;
}

interface Follower {
  _id: string;
  username: string;
  profilePicture: string;
  userProfile: User;
}

interface GetProfileMaterial extends SuccessResponse {
  user: User;
  posts: Post[];
  image: Post[];
  savedPosts: ({
    authorProfilePicture: string;
    postId: string;
    postCreatedDate: string;
    authorName: string;
  } & Post)[];
  followers: Follower[];
  following: Follower[];
}

interface GetCurrentUser extends SuccessResponse {
  user: User;
}

export const profileApi = {
  getProfile: (userId: string) => {
    return http.get<GetProfile>(`user/profile/${userId}`);
  },
  async getProfileMaterial(userId: string) {
    const data = await this.getProfile(userId);
    const user = data.data.user;
    return http.get<GetProfileMaterial>(
      `user/profile-materials/${user._id}/${user.username}/${user.uId}`
    );
  },
  follow: (userId: string) => {
    return http.put<SuccessResponse>(`user/follow/${userId}`);
  },
  unfollow: ({
    userId,
    followingId
  }: {
    userId: string;
    followingId: string;
  }) => {
    return http.put<SuccessResponse>(`user/unfollow/${followingId}/${userId}`);
  },
  getCurrentProfile: () => {
    return http.get<GetCurrentUser>('current-user');
  }
};
