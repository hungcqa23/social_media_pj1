import { IComment } from 'src/types/comment.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface GetPostComments extends SuccessResponse {
  comments: IComment[];
}

interface GetCommentById extends SuccessResponse {
  singleComment: IComment[];
}

const URL_COMMENTS = 'post/comments';
const URL_ADD_COMMENT = 'post/comment';
const URL_POST_SINGLE_COMMENT = 'post/single-comment';

const commentApi = {
  getCommentsByPostId: (postId: string) => {
    return http.get<GetPostComments>(`${URL_COMMENTS}/${postId}`);
  },
  addComment: (body: {
    postId: string;
    userTo: string;
    comment: string;
    profilePicture: string;
  }) => {
    return http.post<SuccessResponse>(URL_ADD_COMMENT, body);
  },
  deleteComment: ({
    commentId,
    postId
  }: {
    commentId: string;
    postId: string;
  }) => {
    return http.delete<SuccessResponse>(
      `${URL_ADD_COMMENT}/${postId}/${commentId}`
    );
  },
  updateComment: ({
    commentId,
    content,
    profilePicture
  }: {
    commentId: string;
    content: string;
    profilePicture: string;
  }) => {
    return http.put<SuccessResponse>(`${URL_ADD_COMMENT}/${commentId}`, {
      comment: content,
      profilePicture
    });
  },
  getCommentById: ({
    commentId,
    postId
  }: {
    commentId: string;
    postId: string;
  }) => {
    return http.get<GetCommentById>(
      `${URL_POST_SINGLE_COMMENT}/${postId}/${commentId}`
    );
  }
};

export default commentApi;
