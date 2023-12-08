import { Post } from 'src/types/post.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL_GET_ALL_POSTS = 'post/all';
const URL_CREATE_POST = 'post-with-image';
const URL_DELETE_POST = 'post';

export interface GetAllPosts extends SuccessResponse {
  posts: Post[];
  totalPosts: number;
}

export interface CreatePost extends SuccessResponse {
  post: Post;
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
  }
};
