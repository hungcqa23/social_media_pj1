import { IReactionDocument, Reaction } from 'src/types/reaction.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const URL_LIKE_POST = 'post/reaction';
const URL_GET_REACTION = 'post/reactions';

export interface GetReactions extends SuccessResponse {
  reactions: IReactionDocument[];
}
export const reactionApi = {
  likePost(body: { postId: string; userTo: string; profilePicture: string }) {
    return http.post<SuccessResponse>(URL_LIKE_POST, {
      ...body,
      postReactions: {
        like: 1
      }
    });
  },
  unlikePost({ postId }: { postId: string }) {
    return http.delete<SuccessResponse>(
      `${URL_LIKE_POST}/${postId}/{"like": 1}`
    );
  },

  getPostReactions(postId: string) {
    return http.get<GetReactions>(`${URL_GET_REACTION}/${postId}`);
  }
};
