import { useReducer, useRef } from 'react';
import Profile from '../IconProfile';
import Comment from '../Comment';
import List from '../List';
import Dialog from '../Dialog';
import { Post as PostType } from 'src/types/post.type';

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

export default function PostItem({ post, innerRef }: PostProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextAreaChange = () => {
    if (textareaRef.current) {
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

  return (
    <div className='w-full rounded-md border shadow' ref={innerRef}>
      {/* Header */}
      <div className='flex h-16 items-center justify-between p-4'>
        <div className='flex'>
          <div className='mr-2'>
            <Profile />
          </div>
          <div>
            <div>
              <span className='text-sm font-medium'>An Hưng</span>
            </div>
            <div className='-mt-1'>
              <span className='text-xs text-gray-500 '>
                20 October at 10:00
              </span>
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
                    <button
                      className='p-3 font-semibold text-red-500'
                      onClick={() =>
                        dispatch({ type: ACTION_TYPES.OPEN_DELETE })
                      }
                    >
                      Deleted
                    </button>

                    {buttons.map(({ important, onClick, text }, index) => (
                      <button
                        key={index}
                        className={`border-t ${
                          important && 'font-semibold text-red-500'
                        } border-gray-300
                        p-3`}
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
                      onClick={() =>
                        dispatch({ type: ACTION_TYPES.OPEN_DELETE })
                      }
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
      <div className='px-4 text-base'>
        <p className='pb-4 font-medium'>{post.post}</p>
      </div>

      {/* Image or video */}
      {false && (
        <div className='flex justify-center py-2'>
          <img
            src='/src/assets/images/user.jpg'
            alt='Post'
            className='w-full object-cover'
          />
        </div>
      )}

      <div className={`border-t border-gray-200 px-4`}>
        <div className={`flex gap-1 py-3 ${true && 'border-b'}`}>
          {/* Likes */}
          <button className='flex basis-4/12 items-center justify-center rounded p-1 transition-colors hover:bg-gray-100'>
            <span className='pr-2'>
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
            </span>
            <span className='text-sm font-medium text-gray-500'>100</span>
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
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className='fill-gray-400'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_348_771)'>
                  <path
                    d='M21.99 4C21.99 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22L21.99 4ZM20 4V17.17L18.83 16H4V4H20ZM6 12H18V14H6V12ZM6 9H18V11H6V9ZM6 6H18V8H6V6Z'
                    fill='#A6A6A6'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_348_771'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='text-sm font-medium text-gray-500'>
              {comments.length}
            </span>
          </button>

          {/* Share */}
          <button className='flex basis-4/12 items-center justify-center rounded hover:bg-gray-200'>
            <span className='pr-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-gray-400'
              >
                <g clipPath='url(#clip0_62_127)'>
                  <path
                    d='M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z'
                    fill='#A7A7A7'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_62_127'>
                    <rect width='24' height='24' fill='white' />
                  </clipPath>
                </defs>
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
          <Profile className='h-8 w-8 flex-shrink-0' classNameImage='h-8 w-8' />
          <textarea
            className='h-9 w-full flex-grow resize-none overflow-y-hidden rounded-xl border bg-gray-100 p-2 text-sm text-gray-600 outline-none  '
            placeholder='Write a comment...'
            ref={textareaRef}
            onChange={handleTextAreaChange}
          />
        </div>
      </div>
    </div>
  );
}
