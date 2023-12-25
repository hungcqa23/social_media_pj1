import { Post } from 'src/types/post.type';
import { SuccessResponse } from 'src/types/utils.type';
import { convertFileToBase64 } from 'src/utils/file';
import http from 'src/utils/http';

const URL_GET_ALL_POSTS = 'post/all';
const URL_CREATE_POST_WITH_MEDIA = 'post-with-image';
const URL_CREATE_POST_WITH_VIDEO = 'post-with-video';
const URL_POST = 'post';
const URL_GET_ALL_SAVED_POSTS = 'saved-posts';
const URL_SAVED_POST = 'post/save-post';

export interface GetAllPosts extends SuccessResponse {
  posts: Post[];
  totalPosts: number;
}

export interface CreatePost extends SuccessResponse {
  post: Post;
}

export interface GetAllSavedPosts extends SuccessResponse {
  posts: Post[];
}

export interface GetPostById {
  post: Post;
}

export interface CheckSavedPost {
  isExisted: boolean;
}

export const postApi = {
  async getAllPosts({ pageParam }: { pageParam: number }) {
    const response = await http.get<GetAllPosts>(
      `${URL_GET_ALL_POSTS}/${pageParam}`
    );
    return response.data;
  },
  getPosts(search: string, signal?: AbortSignal) {
    return http.get<GetAllPosts>('search/post', {
      params: {
        query: search
      },
      signal
    });
  },

  createPostWithMedia(
    body: Post & {
      image?: string;
      video?: string;
    }
  ) {
    if (body.video) {
      return http.post<CreatePost>(URL_CREATE_POST_WITH_VIDEO, body);
    }
    return http.post<CreatePost>(URL_CREATE_POST_WITH_MEDIA, body);
  },
  createPost(body: { content: string; profilePicture: string }) {
    return http.post<CreatePost>(URL_POST, {
      post: body.content,
      profilePicture: body.profilePicture
    });
  },
  deletePost(id: string) {
    return http.delete<SuccessResponse>(`${URL_POST}/${id}`);
  },
  getSavedPosts() {
    return http.get<GetAllSavedPosts>(URL_GET_ALL_SAVED_POSTS);
  },
  checkSavedByPostId(postId: string) {
    return http.get<CheckSavedPost>(`${URL_GET_ALL_SAVED_POSTS}/${postId}`);
  },
  savePost(postId: string) {
    return http.post<SuccessResponse>(URL_SAVED_POST, { postId });
  },
  getPostById(id: string) {
    return http.get<GetPostById>(`${URL_POST}/${id}`);
  },
  async updatePost({
    post,
    content,
    file
  }: {
    post: Post;
    content: string;
    file?: File;
  }) {
    if (file) {
      const stringBase64 = await convertFileToBase64(file);
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'mp4') {
        return http.put<CreatePost>(`post-with-image/${post._id}`, {
          post: content,
          video: stringBase64,
          profilePicture: post.profilePicture
        });
      }
      return http.put<CreatePost>(`post-with-image/${post._id}`, {
        post: content,
        image: stringBase64,
        profilePicture: post.profilePicture
      });
    }

    return http.put<CreatePost>(`${URL_POST}/${post._id}`, {
      post: content,
      profilePicture: post.profilePicture,
      videoId: post.videoId,
      videoVersion: post.videoVersion,
      imgVersion: post.imgVersion,
      imgId: post.imgId
    });
  }
};
