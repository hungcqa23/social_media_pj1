import { Post } from 'src/types/post.type';
import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface GetProfile extends SuccessResponse {
  user: User;
}

interface Search {
  users: User[];
  posts: Post[];
}

interface Follower {
  _id: string;
  username: string;
  fullname: string;
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

const URL_BLOCK_ACCOUNT = 'user/block';
const URL_UNBLOCK_ACCOUNT = 'user/unblock';

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
    return http.get<GetProfile>('current-user');
  },
  blockAccount: (accountId: string) => {
    return http.put<SuccessResponse>(`${URL_BLOCK_ACCOUNT}/${accountId}`);
  },
  unBlockAccount: (accountId: string) => {
    return http.put<SuccessResponse>(`${URL_UNBLOCK_ACCOUNT}/${accountId}`);
  },
  updateNotifications: (body: {
    messages: boolean;
    reactions: boolean;
    comments: boolean;
    follows: boolean;
  }) => {
    return http.put<SuccessResponse>(`user/update-notification-settings`, body);
  },
  updateProfile: (body: {
    facebook?: string | undefined;
    twitter?: string | undefined;
    quote?: string | undefined;
    work?: string | undefined;
    school?: string | undefined;
    country?: string | undefined;
  }) => {
    return http.put<GetProfile>(`user/update-background-info`, {
      ...body,
      country: undefined,
      location: body.country
    });
  },
  uploadImageProfile: (body: { image: string }) => {
    return http.post<SuccessResponse>(`image/upload`, {
      image: body.image
    });
  },
  searchUsers: (
    keyword: string,
    type?: string,
    signal?: AbortSignal,
    date?: Date
  ) => {
    console.log('Type', type);
    if (!type) {
      return http.get<Search>(`search/post`, {
        params: {
          query: keyword,
          date: date?.toISOString()
        },
        signal
      });
    }
    return http.get<Search>(`user/search`, {
      params: {
        q: keyword
      },
      signal
    });
  },
  updatePassword: (body: {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }) => {
    return http.put<SuccessResponse>(`user/update-password`, {
      currentPassword: body.currentPassword,
      newPassword: body.password,
      confirmPassword: body.confirmPassword
    });
  }
};
