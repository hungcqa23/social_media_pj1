import { useReducer, useRef, useState } from 'react';
import Profile from '../IconProfile';
import Comment from '../Comment';
import List from '../List';
import Dialog from '../Dialog';
import { Post } from 'src/types/post.type';
import {
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
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../Button';
import CopyButton from './CopyButton';

interface ButtonType {
  text: string;
  important?: boolean;
  onClick: () => void;
}

interface States {
  openOptions: boolean;
  openDelete: boolean;
  openMenu: boolean;
  openComment: boolean;
}

const initialState: States = {
  openMenu: false,
  openOptions: false,
  openDelete: false,
  openComment: false
};

enum ACTION_TYPES {
  OPEN_MENU = 'openMenu',
  OPEN_OPTIONS = 'openOptions',
  OPEN_DELETE = 'openDelete',
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
  className = 'max-w-[40rem] w-full rounded-lg border shadow'
}: PostProps) {
  const { profile } = useAppContext();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [contentTextarea, setContentTextarea] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Form data for comment and submit comment
  const { register, handleSubmit, watch, reset, getValues } = useForm<{
    comment: string;
  }>();
  const watchContentComment = watch('comment');
  const commentRegister = register('comment');

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
      queryClient.invalidateQueries({ queryKey: ['comments', post._id] });
    }
  });
  const onPostComment = (e: React.FormEvent) => {
    console.log('onPostComment');
    e.preventDefault();
    addCommentMutation.mutate({ comment: contentTextarea });
    setContentTextarea('');
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
        userTo: profile?._id || '',
        profilePicture: profile?.profilePicture || ''
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query =>
          (query.queryKey[0] === 'reactions' &&
            query.queryKey[1] === post._id) ||
          (query.queryKey[0] === 'profile-materials' &&
            query.queryKey[1] === post.userId)
      });
    }
  });
  const unlikeMutation = useMutation({
    mutationFn: (postId: string) =>
      reactionApi.unlikePost({
        postId
      }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['reactions', post._id] });
      }, 200);
    }
  });

  // Delete Post
  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      toast.success('Delete post successfully!', {
        position: 'top-right'
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({
          queryKey: ['profile-materials', post.userId]
        });
      }, 2000);
    }
  });
  const handleDeletePost = () => {
    deletePostMutation.mutate(`${post._id}/${post.pId}`);
    dispatch({ type: ACTION_TYPES.CLOSE });
  };

  const buttons: ButtonType[] = [
    {
      text: 'Cancel',
      onClick: () => {
        dispatch({ type: ACTION_TYPES.CLOSE });
      }
    }
  ];

  const isOwner = post.username === profile?.username;

  return (
    <div className={classNames(className)} ref={innerRef}>
      {/* Header */}
      <div className='flex h-16 items-center justify-between p-4'>
        <div className='flex'>
          <div className='mr-2'>
            <Profile src={post.profilePicture} to={post.userId} />
          </div>
          <div>
            <div>
              <span className='text-sm font-medium'>{post.username}</span>
            </div>
            <div className='-mt-1'>
              <span className='text-xs text-gray-500 '>
                {formatDate(post.createdAt as string)}
              </span>
            </div>
          </div>
        </div>

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

          {/* Edit post */}
          <Dialog
            isOpen={state.openMenu}
            setIsOpen={() => {
              !state.openMenu
                ? dispatch({ type: ACTION_TYPES.OPEN_OPTIONS })
                : dispatch({ type: ACTION_TYPES.CLOSE });
            }}
            renderDialog={
              <div className='text-normal flex w-[28rem] flex-col rounded-lg bg-white text-base font-normal text-black'>
                {state.openOptions && (
                  <>
                    {isOwner && (
                      <button
                        className='p-3 font-semibold text-red-500'
                        onClick={() =>
                          dispatch({ type: ACTION_TYPES.OPEN_DELETE })
                        }
                      >
                        Deleted
                      </button>
                    )}

                    {buttons.map(({ important, onClick, text }, index) => (
                      <button
                        key={index}
                        className={classNames(
                          `border-t border-gray-300
                        p-3`,
                          {
                            'font-semibold text-red-500': important
                          }
                        )}
                        onClick={onClick}
                      >
                        {text}
                      </button>
                    ))}
                  </>
                )}

                {state.openDelete && (
                  <>
                    <div className='border-b p-6 text-center'>
                      <h1 className='my-2 text-2xl'>Delete post?</h1>
                      <span className='text-sm font-light text-gray-500'>
                        Are you sure you want to delete this post?
                      </span>
                    </div>

                    <button
                      className='border-b p-3 font-semibold text-red-500'
                      onClick={handleDeletePost}
                    >
                      Deleted
                    </button>

                    <button
                      onClick={() => {
                        dispatch({ type: ACTION_TYPES.CLOSE });
                      }}
                      className='py-3 font-light'
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            }
            className='flex items-center'
          >
            <button className='rounded-full hover:bg-gray-100'>
              <span>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  className='fill-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 16C18 16.3956 17.8827 16.7822 17.6629 17.1111C17.4432 17.44 17.1308 17.6964 16.7654 17.8478C16.3999 17.9991 15.9978 18.0387 15.6098 17.9616C15.2219 17.8844 14.8655 17.6939 14.5858 17.4142C14.3061 17.1345 14.1156 16.7781 14.0384 16.3902C13.9613 16.0022 14.0009 15.6001 14.1522 15.2346C14.3036 14.8692 14.56 14.5568 14.8889 14.3371C15.2178 14.1173 15.6044 14 16 14C16.5304 14 17.0391 14.2107 17.4142 14.5858C17.7893 14.9609 18 15.4696 18 16ZM7.5 14C7.10444 14 6.71776 14.1173 6.38886 14.3371C6.05996 14.5568 5.80362 14.8692 5.65224 15.2346C5.50087 15.6001 5.46126 16.0022 5.53843 16.3902C5.6156 16.7781 5.80608 17.1345 6.08579 17.4142C6.36549 17.6939 6.72186 17.8844 7.10982 17.9616C7.49778 18.0387 7.89992 17.9991 8.26537 17.8478C8.63082 17.6964 8.94318 17.44 9.16294 17.1111C9.3827 16.7822 9.5 16.3956 9.5 16C9.5 15.4696 9.28929 14.9609 8.91421 14.5858C8.53914 14.2107 8.03043 14 7.5 14ZM24.5 14C24.1044 14 23.7178 14.1173 23.3889 14.3371C23.06 14.5568 22.8036 14.8692 22.6522 15.2346C22.5009 15.6001 22.4613 16.0022 22.5384 16.3902C22.6156 16.7781 22.8061 17.1345 23.0858 17.4142C23.3655 17.6939 23.7219 17.8844 24.1098 17.9616C24.4978 18.0387 24.8999 17.9991 25.2654 17.8478C25.6308 17.6964 25.9432 17.44 26.1629 17.1111C26.3827 16.7822 26.5 16.3956 26.5 16C26.5 15.4696 26.2893 14.9609 25.9142 14.5858C25.5391 14.2107 25.0304 14 24.5 14Z' />
                </svg>
              </span>
            </button>
          </Dialog>
        </div>
      </div>

      {/* Text */}
      <div className='px-4'>
        <p className='pb-4 text-sm font-normal text-gray-950'>{post.post}</p>
      </div>

      {/* Image or video */}
      {post.imgVersion !== '' && (
        <div className='flex justify-center border-t py-2'>
          <img
            src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
            alt='Post'
            className='w-4/5 object-cover p-4'
          />
        </div>
      )}

      {/* Interaction */}
      <div className={`border-t border-gray-200 px-4`}>
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
      </div>

      {/* Comments */}
      {!isLoadingComment &&
        List<IComment>({
          listItems: comments,
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
                  setContentTextarea(event.target.value);
                  handleTextAreaChange(textareaRef);
                }}
                ref={e => {
                  textareaRef.current = e;
                }}
                // name={commentRegister.name}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    onPostComment(event);
                  }
                }}
                value={contentTextarea}
              />

              {contentTextarea !== '' && (
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
    </div>
  );
}
