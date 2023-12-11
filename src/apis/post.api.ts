import { Post } from 'src/types/post.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL_GET_ALL_POSTS = 'post/all';
const URL_CREATE_POST = 'post-with-image';
const URL_DELETE_POST = 'post';
const URL_GET_ALL_SAVED_POSTS = 'saved-posts';
const URL_SAVE_POST = 'post/save-post';

export interface GetAllPosts extends SuccessResponse {
  posts: Post[];
  totalPosts: number;
}

export interface CreatePost extends SuccessResponse {
  post: Post;
}

export interface GetAllSavedPosts extends SuccessResponse {
  posts: {
    _id: string;
    userId: string;
    postId: string;
    username: string;
    createdAt: string;
  }[];
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
  deletePost(id: string) {
    return http.delete<SuccessResponse>(`${URL_DELETE_POST}/${id}`);
  },
  getSavedPosts() {
    return http.get<GetAllSavedPosts>(URL_GET_ALL_SAVED_POSTS);
  },
  savePost(postId: string) {
    return http.post<SuccessResponse>(URL_SAVE_POST, { postId });
  }
};
