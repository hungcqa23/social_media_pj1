import { Post } from 'src/types/post.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

export interface getAllPosts extends SuccessResponse {
  posts: Post[];
  totalPosts: number;
}
export const postApi = {
  async getAllPosts({ pageParam }: { pageParam: number }) {
    const response = await http.get<getAllPosts>(`/post/all/${pageParam}`, {
      withCredentials: true
    });
    return response.data;
  }
};
