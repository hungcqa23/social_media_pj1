import { Post } from 'src/types/post.type';
import { Reaction } from 'src/types/reaction.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL_GET_ALL_POSTS = 'post/all';
const URL_CREATE_POST = 'post-with-image';
const URL_LIKE_POST = 'post/reactions';
const URL_GET_REACTION = 'post/reactions';

export interface GetAllPosts extends SuccessResponse {
  posts: Post[];
  totalPosts: number;
}

export interface CreatePost extends SuccessResponse {
  post: Post;
}

export interface getReactions extends SuccessResponse {
  reactions: Reaction[];
}

export const postApi = {
  async getAllPosts({ pageParam }: { pageParam: number }) {
    const response = await http.get<GetAllPosts>(
      `${URL_GET_ALL_POSTS}/${pageParam}`
    );
    return response.data;
  },

  createPost(body: Post) {
    return http.post<CreatePost>(URL_CREATE_POST, body);
  },

  likePost(body: {
    postId: string;
    userTo: string;
    postReactions: {
      likes: number;
    };
    profilePicture: string;
  }) {
    return http.post<SuccessResponse>(URL_LIKE_POST, body);
  },

  getReactions(postId: string) {
    return http.get<getReactions>(`${URL_GET_REACTION}/${postId}`);
  }
};
