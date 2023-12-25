import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import Profile from '../IconProfile';
import Comment from '../Comment';
import List from '../List';
import Dialog from '../Dialog';
import { Post } from 'src/types/post.type';
import {
  fileNameExtension,
  formatDate,
  formatSocialNumber,
  handleTextAreaChange
} from 'src/utils/helper';
import { useAppContext } from 'src/contexts/app.contexts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postApi } from 'src/apis/post.api';
import { reactionApi } from 'src/apis/reaction.api';
import classNames from 'classnames';
import commentApi from 'src/apis/comment.api';
import { IComment } from 'src/types/comment.type';
import { toast } from 'react-toastify';
import Button from '../Button';
import CopyButton from './CopyButton';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import IconProfile from '../IconProfile';
import Spinner from '../Spinner';

interface States {
  openOptions: boolean;
  openDelete: boolean;
  openMenu: boolean;
  openReactionsMenu: boolean;
  openComment: boolean;
  openPostReactions: boolean;
  openCommentReactions: boolean;
}

const initialState: States = {
  openMenu: false,
  openReactionsMenu: false,
  openOptions: false,
  openDelete: false,
  openComment: false,
  openPostReactions: false,
  openCommentReactions: false
};

enum ACTION_TYPES {
  OPEN_MENU = 'openMenu',
  OPEN_REACTIONSMENU = 'openReactionsMenu',
  OPEN_OPTIONS = 'openOptions',
  OPEN_DELETE = 'openDelete',
  OPEN_POSTREACTIONS = 'openPostReactions',
  OPEN_COMMENTREACTIONS = 'openCommentReactions',
  CLOSE = 'close'
}

function reducer(state: States, action: { type: string }): States {
  switch (action.type) {
    case ACTION_TYPES.OPEN_OPTIONS: {
      return {
        ...initialState,
        openMenu: true,
        openOptions: true
      };
    }
    case ACTION_TYPES.OPEN_DELETE: {
      return {
        ...initialState,
        openMenu: true,
        openDelete: true
      };
    }
    case ACTION_TYPES.OPEN_POSTREACTIONS: {
      return {
        ...initialState,
        openReactionsMenu: true,
        openPostReactions: true
      };
    }

    case ACTION_TYPES.OPEN_COMMENTREACTIONS: {
      return {
        ...initialState,
        openReactionsMenu: true,
        openCommentReactions: true
      };
    }

    case ACTION_TYPES.CLOSE: {
      return initialState;
    }

    default:
      return initialState;
  }
}

interface PostProps {
  className?: string;
  post: Post;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export default function PostItem({
  post,
  innerRef,
  className = 'max-w-xl w-full rounded-lg border shadow relative'
}: PostProps) {
  const { profile } = useAppContext();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [commentTextarea, setCommentTextarea] = useState('');
  const [contentTextarea, setContentTextarea] = useState(() => {
    if (post.post) {
      return post.post;
    }
    return '';
  });
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File>();
  const [isShowMedia, setIsShowMedia] = useState(
    () => post.imgVersion !== '' || post.videoVersion !== '' || false
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const isOwner = post.username === profile?.username;
  // Form data for comment and submit comment
  const { register, handleSubmit, watch, reset, setValue } = useForm<{
    content: string;
  }>();

  useEffect(() => {
    if (isEditing) {
      setContentTextarea(post.post ?? '');
      contentRef.current?.focus();
    }
  }, [isEditing, post.post]);

  const { ref, onChange, name } = register('content');

  // Get Data for comments
  const { data: commentsData, isLoading: isLoadingComment } = useQuery({
    queryKey: ['comments', post._id],
    queryFn: () => commentApi.getCommentsByPostId(post._id || '')
  });
  const comments = commentsData?.data.comments || [];
  const addCommentMutation = useMutation({
    mutationFn: (body: { comment: string }) =>
      commentApi.addComment({
        comment: body.comment,
        postId: post._id || '',
        userTo: post?.userId || '',
        profilePicture: profile?.profilePicture || ''
      }),
    onSuccess: () => {
      setCommentTextarea('');
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: query =>
            (query.queryKey[0] === 'comments' &&
              query.queryKey[1] === post._id) ||
            (query.queryKey[0] === 'profile-materials' &&
              query.queryKey[1] === post.userId)
        });
      }, 200);
    }
  });
  const [moreComments, setMoreComments] = useState(() => {
    if (comments.length > 3) {
      return true;
    }
    return false;
  });
  const onPostComment = (e: React.FormEvent) => {
    e.preventDefault();
    addCommentMutation.mutate({ comment: commentTextarea });
  };

  // Saved Posts
  const { data: savedPostData } = useQuery({
    queryKey: ['saved-posts', post._id],
    queryFn: () => postApi.checkSavedByPostId(post._id || '')
  });
  const isSaved = savedPostData?.data.isExisted;
  const savePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.savePost(postId)
  });
  const onSavePost = () => {
    savePostMutation.mutate(post._id || '', {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries({
            predicate: query =>
              (query.queryKey[0] === 'saved-posts' &&
                query.queryKey[1] === post._id) ||
              (query.queryKey[0] === 'profile-materials' &&
                query.queryKey[1] === post.userId)
          });
        }, 500);
      }
    });
  };

  // Like post
  const { data: reactionsData } = useQuery({
    queryKey: ['reactions', post._id],
    queryFn: () => reactionApi.getPostReactions(post._id || '')
  });

  const reactions = reactionsData?.data.reactions;
  const liked =
    reactions?.some(reaction => reaction.username === profile?.username) ||
    false;
  const likePostMutation = useMutation({
    mutationFn: (postId: string) =>
      reactionApi.likePost({
        postId,
        userTo: post.userId || '',
        profilePicture: profile?.profilePicture || ''
      }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: query =>
            (query.queryKey[0] === 'reactions' &&
              query.queryKey[1] === post._id) ||
            (query.queryKey[0] === 'profile-materials' &&
              query.queryKey[1] === post.userId)
        });
      }, 200);
    }
  });
  const unlikeMutation = useMutation({
    mutationFn: (postId: string) =>
      reactionApi.unlikePost({
        postId
      }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          predicate: query =>
            (query.queryKey[0] === 'reactions' &&
              query.queryKey[1] === post._id) ||
            (query.queryKey[0] === 'profile-materials' &&
              query.queryKey[1] === post.userId)
        });
      }, 200);
    }
  });

  // Delete Post
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({
          queryKey: ['profile-materials', post.userId]
        });
      }, 2500);
      toast.success('Delete post successfully!', {
        position: 'top-right'
      });
    }
  });
  const handleDeletePost = () => {
    deletePostMutation.mutate(`${post._id}/${post.pId}`);
    dispatch({ type: ACTION_TYPES.CLOSE });
  };

  // Update Post
  const updatePostMutation = useMutation({
    mutationFn: (body: { content: string; file?: File }) =>
      postApi.updatePost({
        post: {
          ...post,
          imgId: isShowMedia ? post.imgId : '',
          imgVersion: isShowMedia ? post.imgVersion : '',
          videoId: isShowMedia ? post.videoId : '',
          videoVersion: isShowMedia ? post.videoVersion : ''
        },
        content: body.content,
        file
      })
  });
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const previewFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : undefined;
  }, [file]);
  const handleOpenFile = () => {
    inputRef?.current?.click();
  };
  const onCloseFile = () => {
    setFile(undefined);
    setIsShowMedia(false);
  };
  const onUpdatePost = () => {
    updatePostMutation.mutate(
      {
        content: contentTextarea,
        file: isShowMedia ? undefined : file
      },
      {
        onSuccess: () => {
          console.log('Update post!');
          setContentTextarea('');
          setFile(undefined);
          setIsEditing(false);
          setIsShowMedia(true);
          queryClient.invalidateQueries({
            predicate: query =>
              (query.queryKey[0] === 'posts' &&
                query.queryKey[1] === post._id) ||
              (query.queryKey[0] === 'profile-materials' &&
                query.queryKey[1] === post.userId)
          });
        }
      }
    );
  };

  return (
    <div className={classNames(className)} ref={innerRef}>
      {/* Header */}
      <div className='flex h-16 items-center justify-between p-4'>
        {/* Information about post */}
        <div className='flex items-center md:items-start'>
          <div className='mr-2'>
            <Profile src={post.profilePicture} to={`/${post.userId}`} />
          </div>
          <div>
            <div>
              <span className='text-sm font-medium'>{post.username}</span>
            </div>
            <div className='-mt-1'>
              <span className='hidden text-xs text-gray-500 md:block'>
                {formatDate(post.createdAt as string)}
              </span>
            </div>
          </div>
        </div>

        {/* Save and edit */}
        <div className='flex'>
          {/* Saved button */}
          <Button
            colorSpinner='blue'
            onClick={onSavePost}
            disabled={savePostMutation.isPending}
            isLoading={savePostMutation.isPending}
          >
            {!savePostMutation.isPending &&
              (!isSaved ? (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='hover:opacity-50'
                >
                  <path
                    d='M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z'
                    className='fill-gray-500'
                  />
                </svg>
              ) : (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2Z'
                    className='fill-blue-500 active:fill-blue-500/50'
                  />
                </svg>
              ))}
          </Button>

          {/* Option interaction post */}
          {isOwner && (
            <Dialog
              isOpen={state.openMenu}
              setIsOpen={() => {
                !state.openMenu
                  ? dispatch({ type: ACTION_TYPES.OPEN_OPTIONS })
                  : dispatch({ type: ACTION_TYPES.CLOSE });
              }}
              renderDialog={
                <Modal
                  type='option'
                  onCloseModal={() => dispatch({ type: ACTION_TYPES.CLOSE })}
                >
                  {state.openOptions && isOwner && (
                    <>
                      <button
                        className='justify-center p-3 font-semibold text-red-500'
                        onClick={() =>
                          dispatch({ type: ACTION_TYPES.OPEN_DELETE })
                        }
                      >
                        Deleted
                      </button>
                      <button
                        className='justify-center border-t border-gray-300 p-3 font-semibold text-red-500'
                        onClick={() => {
                          setIsEditing(true);
                          contentRef.current?.focus();
                          dispatch({ type: ACTION_TYPES.CLOSE });
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}

                  {state.openDelete && (
                    <>
                      <div className='border-b border-gray-300 p-6 text-center'>
                        <h1 className='my-2 text-2xl'>Delete post?</h1>
                        <span className='text-sm font-light text-gray-500'>
                          Are you sure you want to delete this post?
                        </span>
                      </div>

                      <button
                        className='p-3 font-semibold text-red-500'
                        onClick={handleDeletePost}
                      >
                        Deleted
                      </button>
                    </>
                  )}
                </Modal>
              }
              className='flex items-center'
            >
              <button className='rounded-full hover:bg-gray-100'>
                <span>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    className='fill-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M18 16C18 16.3956 17.8827 16.7822 17.6629 17.1111C17.4432 17.44 17.1308 17.6964 16.7654 17.8478C16.3999 17.9991 15.9978 18.0387 15.6098 17.9616C15.2219 17.8844 14.8655 17.6939 14.5858 17.4142C14.3061 17.1345 14.1156 16.7781 14.0384 16.3902C13.9613 16.0022 14.0009 15.6001 14.1522 15.2346C14.3036 14.8692 14.56 14.5568 14.8889 14.3371C15.2178 14.1173 15.6044 14 16 14C16.5304 14 17.0391 14.2107 17.4142 14.5858C17.7893 14.9609 18 15.4696 18 16ZM7.5 14C7.10444 14 6.71776 14.1173 6.38886 14.3371C6.05996 14.5568 5.80362 14.8692 5.65224 15.2346C5.50087 15.6001 5.46126 16.0022 5.53843 16.3902C5.6156 16.7781 5.80608 17.1345 6.08579 17.4142C6.36549 17.6939 6.72186 17.8844 7.10982 17.9616C7.49778 18.0387 7.89992 17.9991 8.26537 17.8478C8.63082 17.6964 8.94318 17.44 9.16294 17.1111C9.3827 16.7822 9.5 16.3956 9.5 16C9.5 15.4696 9.28929 14.9609 8.91421 14.5858C8.53914 14.2107 8.03043 14 7.5 14ZM24.5 14C24.1044 14 23.7178 14.1173 23.3889 14.3371C23.06 14.5568 22.8036 14.8692 22.6522 15.2346C22.5009 15.6001 22.4613 16.0022 22.5384 16.3902C22.6156 16.7781 22.8061 17.1345 23.0858 17.4142C23.3655 17.6939 23.7219 17.8844 24.1098 17.9616C24.4978 18.0387 24.8999 17.9991 25.2654 17.8478C25.6308 17.6964 25.9432 17.44 26.1629 17.1111C26.3827 16.7822 26.5 16.3956 26.5 16C26.5 15.4696 26.2893 14.9609 25.9142 14.5858C25.5391 14.2107 25.0304 14 24.5 14Z' />
                  </svg>
                </span>
              </button>
            </Dialog>
          )}
          <Dialog
            isOpen={state.openPostReactions}
            setIsOpen={() =>
              !state.openReactionsMenu
                ? dispatch({ type: ACTION_TYPES.OPEN_POSTREACTIONS })
                : dispatch({ type: ACTION_TYPES.CLOSE })
            }
            renderDialog={
              <Modal
                header={'Likes'}
                onCloseModal={() => dispatch({ type: ACTION_TYPES.CLOSE })}
              >
                <section className='overflow-y-auto'>
                  {List({
                    as: 'ul',
                    className: 'flex flex-col',
                    listItems: reactions || [],
                    mapFn: reaction => (
                      <div
                        className='my-1 flex items-center justify-between px-4'
                        key={reaction._id}
                      >
                        <div className='flex items-center gap-1'>
                          <IconProfile
                            className='h-12 w-12'
                            classNameImage='h-12 w-12'
                            src={reaction.profilePicture}
                            to={`/${reaction.userId}`}
                            onClick={() =>
                              dispatch({ type: ACTION_TYPES.CLOSE })
                            }
                          />

                          <div className='flex flex-col text-sm'>
                            <span className='text-sm font-medium text-black'>
                              {reaction.username}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </section>
              </Modal>
            }
          >
            <></>
          </Dialog>
        </div>
      </div>

      {/* Text */}
      <div className='px-4 pb-4'>
        {!isEditing && (
          <p className='text-sm font-normal text-gray-950'>{post.post}</p>
        )}

        {isEditing && (
          <>
            <textarea
              className='h-10 max-h-20 w-full resize-none overflow-y-hidden whitespace-pre-wrap text-base font-normal text-black placeholder:text-gray-600 focus:outline-none'
              onChange={event => {
                handleTextAreaChange({
                  textAreaRef: contentRef,
                  originalHeight: 40
                });
                setContentTextarea(event.target.value);
              }}
              ref={e => {
                // ref(e);
                contentRef.current = e;
              }}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  setFile(undefined);
                  setIsShowMedia(true);
                  setIsEditing(false);
                }

                if (event.key === 'Enter') {
                  onUpdatePost();
                }
              }}
              value={contentTextarea}
              name={name}
            />
            <p className='text-xs text-black'>
              Press{' '}
              <button
                className='font-medium text-blue-600 hover:underline'
                onClick={() => {
                  onUpdatePost();
                }}
              >
                Enter
              </button>{' '}
              to save or{' '}
              <button
                className='font-medium text-blue-600 hover:underline'
                onClick={() => {
                  setFile(undefined);
                  setIsShowMedia(true);
                  setIsEditing(false);
                }}
              >
                Esc
              </button>{' '}
              to cancel
            </p>

            {!isShowMedia && !file && (
              <>
                <button
                  className='hover:pointer flex h-9 w-full items-center justify-center gap-2 rounded bg-gray-50 outline-none hover:bg-gray-100'
                  onClick={handleOpenFile}
                  type='button'
                >
                  <span>
                    <svg
                      className='h-6 w-6'
                      viewBox='0 0 36 36'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M30.375 5.625H10.125C9.52826 5.625 8.95597 5.86205 8.53401 6.28401C8.11205 6.70597 7.875 7.27826 7.875 7.875V10.125H5.625C5.02826 10.125 4.45597 10.3621 4.03401 10.784C3.61205 11.206 3.375 11.7783 3.375 12.375V28.125C3.375 28.7217 3.61205 29.294 4.03401 29.716C4.45597 30.1379 5.02826 30.375 5.625 30.375H25.875C26.4717 30.375 27.044 30.1379 27.466 29.716C27.8879 29.294 28.125 28.7217 28.125 28.125V25.875H30.375C30.9717 25.875 31.544 25.6379 31.966 25.216C32.3879 24.794 32.625 24.2217 32.625 23.625V7.875C32.625 7.27826 32.3879 6.70597 31.966 6.28401C31.544 5.86205 30.9717 5.625 30.375 5.625ZM24.1875 10.125C24.5213 10.125 24.8475 10.224 25.125 10.4094C25.4025 10.5948 25.6188 10.8584 25.7465 11.1667C25.8743 11.4751 25.9077 11.8144 25.8426 12.1417C25.7775 12.4691 25.6167 12.7697 25.3807 13.0057C25.1447 13.2417 24.8441 13.4025 24.5167 13.4676C24.1894 13.5327 23.8501 13.4993 23.5417 13.3715C23.2334 13.2438 22.9698 13.0275 22.7844 12.75C22.599 12.4725 22.5 12.1463 22.5 11.8125C22.5 11.3649 22.6778 10.9357 22.9943 10.6193C23.3107 10.3028 23.7399 10.125 24.1875 10.125ZM25.875 28.125H5.625V12.375H7.875V23.625C7.875 24.2217 8.11205 24.794 8.53401 25.216C8.95597 25.6379 9.52826 25.875 10.125 25.875H25.875V28.125ZM30.375 23.625H10.125V18.5625L15.1875 13.5L22.1709 20.4834C22.3819 20.6943 22.6679 20.8127 22.9662 20.8127C23.2644 20.8127 23.5504 20.6943 23.7614 20.4834L27.3698 16.875L30.375 19.8816V23.625Z'
                        fill='black'
                      />
                    </svg>
                  </span>

                  <span className='text-sm font-medium text-black'>
                    Add photos/videos
                  </span>
                </button>

                <input
                  type='file'
                  className='hidden'
                  accept='image/*,.mp4'
                  ref={inputRef}
                  onChange={onChangeFile}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* Image or video */}
      <div
        className={classNames('relative justify-center border-t py-2', {
          hidden:
            ((post.imgVersion === '' && post.videoVersion === '') ||
              !isShowMedia) &&
            !file,
          flex: post.imgVersion !== '' || post.videoVersion !== '' || file
        })}
      >
        {isShowMedia && (
          <>
            {post.imgVersion !== '' && (
              <img
                src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
                alt='Post'
                className='w-4/5 object-cover p-4'
              />
            )}

            {post.videoVersion !== '' && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video controls className='w-4/5 object-cover p-4'>
                <source
                  src={`https://res.cloudinary.com/daszajz9a/video/upload/v${post.videoVersion}/${post.videoId}`}
                  type='video/mp4'
                />
              </video>
            )}
          </>
        )}

        {file && fileNameExtension(file) !== 'mp4' && (
          <img
            src={previewFile as string}
            alt='Post'
            className='w-4/5 object-cover p-4'
          />
        )}

        {file && fileNameExtension(file) === 'mp4' && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video controls className='w-4/5 object-cover p-4'>
            <source src={previewFile as string} type='video/mp4' />
          </video>
        )}

        {isEditing && (isShowMedia || file) && (
          <button
            className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border bg-white hover:bg-gray-100'
            onClick={() => {
              onCloseFile();
            }}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 384 512'
              className='h-5 fill-gray-500'
            >
              <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
            </svg>
          </button>
        )}
      </div>

      {/* Interaction */}
      <div className={`flex flex-col border-t border-gray-200 px-4 `}>
        <div className={`flex gap-1 py-3 ${true && 'border-b'}`}>
          {/* Likes */}
          <button
            className='flex basis-4/12 items-center justify-center rounded p-1 transition-[background] duration-500 ease-normal hover:bg-gray-200'
            onClick={() => {
              if (!liked) likePostMutation.mutate(post._id || '');
              else unlikeMutation.mutate(post._id || '');
            }}
          >
            <div className='relative mr-1 h-6 w-6'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className={classNames(
                  'absolute left-0 top-0 transition-opacity duration-200',
                  {
                    'opacity-0': !liked
                  }
                )}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z'
                  className={classNames('fill-red-500')}
                />
              </svg>

              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className={classNames(
                  'absolute left-0 top-0 fill-gray-400 transition-opacity duration-200',
                  {
                    'opacity-0': liked,
                    'opacity-100': !liked
                  }
                )}
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_62_120)'>
                  <path d='M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z' />
                </g>
                <defs>
                  <clipPath id='clip0_62_120'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className='min-w-[1rem] text-sm font-medium text-gray-500'>
              {formatSocialNumber(reactions?.length || 0)}
            </span>
          </button>

          {/* Comments */}
          <button
            className='flex basis-4/12 items-center justify-center rounded transition-[background] duration-500 ease-normal hover:bg-gray-200'
            onClick={() => {
              textareaRef.current?.focus();
            }}
          >
            <span className='pr-1'>
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.0005 12C21.0005 10.22 20.4727 8.47991 19.4837 6.99987C18.4948 5.51983 17.0892 4.36627 15.4446 3.68508C13.8001 3.0039 11.9905 2.82567 10.2447 3.17293C8.49885 3.5202 6.8952 4.37737 5.63653 5.63604C4.37786 6.89471 3.52069 8.49836 3.17342 10.2442C2.82616 11.99 3.00439 13.7996 3.68558 15.4442C4.36677 17.0887 5.52032 18.4943 7.00036 19.4832C8.4804 20.4722 10.2205 21 12.0005 21C13.4885 21 14.8915 20.64 16.1275 20L21.0005 21L20.0005 16.127C20.6405 14.891 21.0005 13.487 21.0005 12Z'
                  stroke='#9CA3AF'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            <span className='min-w-[1rem] text-sm font-medium text-gray-500'>
              {formatSocialNumber(comments.length || 0)}
            </span>
          </button>

          {/* Share */}
          <CopyButton
            content={`http://localhost:3000/posts/${post._id}`}
            className='flex basis-4/12 items-center justify-center rounded hover:bg-gray-200'
          />
        </div>
        {reactions && reactions?.length > 0 && (
          <button
            className='flex gap-1 border-b py-3'
            onClick={() => dispatch({ type: ACTION_TYPES.OPEN_POSTREACTIONS })}
          >
            <span className='cursor-pointer font-medium text-gray-500'>
              {reactions?.length > 1
                ? `${reactions?.length} likes`
                : `${reactions?.length} like`}
            </span>
          </button>
        )}
      </div>

      {/* Comments */}
      {moreComments && (
        <button
          className='pl-2 text-sm font-medium text-gray-500 hover:underline'
          onClick={() => setMoreComments(false)}
        >
          View all {comments.length} comments
        </button>
      )}
      {!isLoadingComment &&
        List<IComment>({
          listItems: moreComments ? comments.slice(0, 3) : comments,
          as: 'ul',
          mapFn: (comment: IComment) => (
            <Comment key={comment._id} comment={comment} />
          )
        })}

      {isLoadingComment && (
        <ul className='mt-2 flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className='w-full rounded-md p-4' key={index}>
              <div className='flex animate-pulse space-x-4'>
                <div className='h-10 w-10 rounded-full bg-slate-200' />
                <div className='flex-1 space-y-6 py-1'>
                  <div className='h-2 rounded bg-slate-200' />
                  <div className='space-y-3'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div className='col-span-2 h-2 rounded bg-slate-200' />
                      <div className='col-span-1 h-2 rounded bg-slate-200' />
                    </div>
                    <div className='h-2 rounded bg-slate-200' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {/* Created Comment */}
      <form className='px-4 py-2' onSubmit={onPostComment}>
        <div className='flex gap-2'>
          <Profile
            className='h-8 w-8 flex-shrink-0'
            classNameImage='h-8 w-8'
            src={profile?.profilePicture}
          />
          {/* Input */}
          <div className='grow rounded-3xl bg-gray-100'>
            <div className='flex flex-col'>
              <textarea
                className='h-9 w-full flex-grow resize-none overflow-y-hidden bg-transparent p-2 text-sm font-normal text-gray-700 outline-none transition-all'
                placeholder='Write a comment...'
                onChange={event => {
                  setCommentTextarea(event.target.value);
                  handleTextAreaChange({
                    textAreaRef: textareaRef
                  });
                }}
                ref={e => {
                  textareaRef.current = e;
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    onPostComment(event);
                  }
                }}
                value={commentTextarea}
              />

              {commentTextarea !== '' && (
                <button
                  className='mb-1 mr-3 flex h-8 w-8 items-center justify-center self-end rounded-full hover:bg-gray-200'
                  type='submit'
                >
                  <span className='ml-[0.2rem] mt-[0.05rem] flex items-center justify-center'>
                    <svg
                      width='23'
                      height='24'
                      viewBox='0 0 23 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18.735 10.71L5.16001 3.40499C4.02001 2.78999 2.70001 3.85499 3.06001 5.09999L4.92001 11.61C4.99501 11.88 4.99501 12.15 4.92001 12.42L3.06001 18.93C2.70001 20.175 4.02001 21.24 5.16001 20.625L18.735 13.32C18.9666 13.1935 19.1599 13.0069 19.2945 12.7799C19.4291 12.5529 19.5002 12.2939 19.5002 12.03C19.5002 11.7661 19.4291 11.507 19.2945 11.2801C19.1599 11.0531 18.9666 10.8665 18.735 10.74V10.71Z'
                        fill='#3B82F6'
                      />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {updatePostMutation.isPending && (
        <div className='absolute inset-0 flex items-center justify-center bg-white opacity-80'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
