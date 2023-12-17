import { IComment } from 'src/types/comment.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

interface Reaction {
  _id: string;
  username: string;
  userId: string;
  postId: string;
  profilePicture: string;
  createdAt: string;
  userTo: string;
}
interface GetPostComments extends SuccessResponse {
  comments: IComment[];
}

interface GetCommentById extends SuccessResponse {
  singleComment: IComment[];
}

interface GetReactions extends SuccessResponse {
  reactions: Reaction[];
}

const URL_COMMENTS = 'post/comments';
const URL_ADD_COMMENT = 'post/comment';
const URL_POST_SINGLE_COMMENT = 'post/single-comment';
const URL_COMMENT_REACTION = 'post/comment/reaction';

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
  },
  likeComment: ({
    commentId,
    userTo,
    profilePicture
  }: {
    commentId: string;
    userTo: string;
    profilePicture: string;
  }) => {
    return http.post<SuccessResponse>(`${URL_COMMENT_REACTION}`, {
      commentId,
      userTo,
      profilePicture,
      postReactions: {
        like: 1
      }
    });
  },
  getReactions: (commentId: string) => {
    return http.get<GetReactions>(`${URL_COMMENT_REACTION}s/${commentId}`);
  },
  unlikeComment: (commendId: string) => {
    return http.delete<SuccessResponse>(
      `${URL_COMMENT_REACTION}/${commendId}/{"like": 0}`
    );
  }
};

export default commentApi;
