import { IComment } from 'src/types/comment.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface GetPostComments extends SuccessResponse {
  comments: IComment[];
}

const URL_GET_COMMENT_BY_POST_ID = 'post/comments';
const URL_ADD_COMMENT = 'post/comment';

const commentApi = {
  getCommentsByPostId: (postId: string) => {
    return http.get<GetPostComments>(`${URL_GET_COMMENT_BY_POST_ID}/${postId}`);
  },
  addComment: (body: {
    postId: string;
    userTo: string;
    comment: string;
    profilePicture: string;
  }) => {
    return http.post<SuccessResponse>(URL_ADD_COMMENT, body);
  }
};

export default commentApi;
