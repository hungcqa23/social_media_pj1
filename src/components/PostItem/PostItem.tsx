import { useReducer, useRef, useState } from 'react';
import Profile from '../IconProfile';
import Comment from '../Comment';
import List from '../List';
import Dialog from '../Dialog';
import { Post as PostType } from 'src/types/post.type';
import { formatDate } from 'src/utils/helper';
import { calculateTextWidth } from 'src/utils/utils';
import { useAppContext } from 'src/contexts/app.contexts';
import {
  dataTagSymbol,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { postApi } from 'src/apis/post.api';
import { reactionApi } from 'src/apis/reaction.api';
import classNames from 'classnames';

interface CommentType {
  id: number;
  content: string;
  username: string;
}

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
  post: PostType;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const comments: CommentType[] = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    username: 'An Hưng'
  },
  {
    id: 2,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    username: 'An Hưng'
  }
];

const originalHeight = 36;

export default function PostItem({ post, innerRef }: PostProps) {
  const { profile } = useAppContext();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: reactionsData } = useQuery({
    queryKey: ['reactions', post._id],
    queryFn: () => reactionApi.getPostReactions(post._id || '')
  });
  const reactions = reactionsData?.data.reactions;

  const [liked, setLiked] = useState<boolean>(() => {
    return (
      reactions?.some(reaction => reaction.username === profile?.username) ||
      false
    );
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const newDate = formatDate(post.createdAt as string);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      // Check if it's only 1 line
      const textAreaWidth = textareaRef.current.clientWidth;
      const textContentWidth = calculateTextWidth(textareaRef);
      if ((textContentWidth || 0) < textAreaWidth) {
        return (textareaRef.current.style.height = `${originalHeight}px`);
      }

      textareaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px'; // Set the height to the scrollHeight
    }
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
    <div className='w-full rounded-lg border shadow' ref={innerRef}>
      {/* Header */}
      <div className='flex h-16 items-center justify-between p-4'>
        <div className='flex'>
          <div className='mr-2'>
            <Profile src={post.profilePicture} />
          </div>
          <div>
            <div>
              <span className='text-sm font-medium'>{post.username}</span>
            </div>
            <div className='-mt-1'>
              <span className='text-xs text-gray-500 '>{newDate}</span>
            </div>
          </div>
        </div>

        <div className='flex'>
          {/* Saved button */}
          <button>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-gray-400'
            >
              <g clipPath='url(#clip0_62_123)'>
                <path d='M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z' />
              </g>
              <defs>
                <clipPath id='clip0_62_123'>
                  <rect width='24' height='24' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>

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

                {isOwner && state.openDelete && (
                  <>
                    <div className='border-b p-6 text-center'>
                      <h1 className='my-2 text-2xl'>Delete post?</h1>
                      <span className='text-sm font-light text-gray-500'>
                        Are you sure you want to delete this post?
                      </span>
                    </div>

                    {
                      <button
                        className='border-b p-3 font-semibold text-red-500'
                        onClick={() =>
                          deletePostMutation.mutate(post._id || '')
                        }
                      >
                        Deleted
                      </button>
                    }

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
      <div className='px-4 text-base'>
        <p className='pb-4 font-medium'>{post.post}</p>
      </div>

      {/* Image or video */}
      {post.imgVersion !== '' && (
        <div className='flex justify-center border-t py-2'>
          <img
            src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
            alt='Post'
            className='w-full object-cover p-4'
          />
        </div>
      )}

      <div className={`border-t border-gray-200 px-4`}>
        <div className={`flex gap-1 py-3 ${true && 'border-b'}`}>
          {/* Likes */}
          <button
            className='flex basis-4/12 items-center justify-center rounded p-1 transition-colors hover:bg-gray-100'
            // onClick={onLike}
          >
            <span className='pr-2'>
              {liked && (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z'
                    fill='#FF3040'
                  />
                </svg>
              )}

              {!liked && (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  className='fill-gray-400'
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
              )}
            </span>
            <span className='text-sm font-medium text-gray-500'>
              {reactions?.length || 0}
            </span>
          </button>

          {/* Comments */}
          <button
            className='flex basis-4/12 items-center justify-center rounded hover:bg-gray-200'
            onClick={() => {
              textareaRef.current?.focus();
            }}
          >
            <span className='pr-2'>
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
            <span className='text-sm font-medium text-gray-500'>
              {post.commentsCount}
            </span>
          </button>

          {/* Share */}
          <button className='flex basis-4/12 items-center justify-center rounded hover:bg-gray-200'>
            <span className='pr-2'>
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.707 11.293L13.707 3.293C13.5671 3.15319 13.389 3.05798 13.195 3.01942C13.0011 2.98085 12.8 3.00065 12.6173 3.07632C12.4346 3.15199 12.2785 3.28013 12.1686 3.44454C12.0587 3.60895 12 3.80225 12 4V7.545C9.26829 7.79779 6.72923 9.06086 4.87969 11.087C3.03015 13.1132 2.00327 15.7566 2 18.5V20C2.00016 20.2076 2.06491 20.41 2.18527 20.5791C2.30564 20.7482 2.47565 20.8757 2.67173 20.9438C2.8678 21.012 3.08022 21.0174 3.27953 20.9594C3.47883 20.9014 3.65514 20.7827 3.784 20.62C4.7637 19.455 5.96576 18.4968 7.31994 17.8016C8.67413 17.1064 10.1533 16.6881 11.671 16.571C11.721 16.565 11.846 16.555 12 16.545V20C12 20.1978 12.0587 20.391 12.1686 20.5555C12.2785 20.7199 12.4346 20.848 12.6173 20.9237C12.8 20.9993 13.0011 21.0192 13.195 20.9806C13.389 20.942 13.5671 20.8468 13.707 20.707L21.707 12.707C21.8945 12.5195 21.9998 12.2652 21.9998 12C21.9998 11.7348 21.8945 11.4805 21.707 11.293ZM14 17.586V15.5C14 15.2348 13.8946 14.9804 13.7071 14.7929C13.5196 14.6054 13.2652 14.5 13 14.5C12.745 14.5 11.704 14.55 11.438 14.585C8.74286 14.8333 6.17742 15.8573 4.052 17.533C4.29324 15.3274 5.33954 13.2883 6.99055 11.8062C8.64157 10.324 10.7813 9.50285 13 9.5C13.2652 9.5 13.5196 9.39464 13.7071 9.20711C13.8946 9.01957 14 8.76522 14 8.5V6.414L19.586 12L14 17.586Z'
                  fill='#9CA3AF'
                />
              </svg>
            </span>
            <span className='text-sm font-medium text-gray-500'>0</span>
          </button>
        </div>
      </div>

      {List<CommentType>({
        listItems: comments,
        mapFn: ({ id, content, username }: CommentType) => (
          <Comment key={id} content={content} username={username} />
        )
      })}

      {/* Created Comment */}
      <div className='px-4 py-2'>
        <div className='flex gap-2'>
          <Profile
            className='h-8 w-8 flex-shrink-0'
            classNameImage='h-8 w-8'
            src={profile?.profilePicture}
          />
          <textarea
            className='h-9 w-full flex-grow resize-none overflow-y-hidden rounded-3xl border bg-gray-100 p-2 text-sm text-gray-600 outline-none  '
            placeholder='Write a comment...'
            ref={textareaRef}
            onChange={handleTextAreaChange}
          />
        </div>
      </div>
    </div>
  );
}
