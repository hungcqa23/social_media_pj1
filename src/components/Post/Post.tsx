import { useRef } from 'react';
import Profile from '../IconProfile';

export default function Post() {
  const comments: string[] = [
    'Hello World!',
    'Hello WolrdHello WolrdHello WolrdHello WolrdHello WolrdHello Wolrd'
  ];

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleTextAreaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height to auto to adjust to content
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set the height to the scrollHeight
    }
  };

  return (
    <div className='w-full rounded-md border shadow'>
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
              <span className='text-xs text-gray-500 '>20 October at 10:00</span>
            </div>
          </div>
        </div>
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
      </div>
      <div className='px-4 text-base'>
        <p className='pb-4 font-medium'>Lorem ipsum dolor sit amet</p>
      </div>
      {/* Image or video */}
      {false && (
        <div className='flex justify-center py-2'>
          <img src='/src/assets/images/user.jpg' alt='Post' className='w-full object-cover' />
        </div>
      )}

      <div className={`border-t border-gray-200 px-4`}>
        <div className={`flex gap-1 py-4 ${true && 'border-b'}`}>
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

          <button className='flex basis-4/12 items-center justify-center rounded hover:bg-gray-200'>
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
            <span className='text-sm font-medium text-gray-500'>0</span>
          </button>

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

      {comments.length >= 0 &&
        comments.map(comment => {
          return (
            <div className='px-4 py-2'>
              <div className='flex gap-2'>
                <Profile className='h-8 w-8 flex-shrink-0' classNameImage='h-8 w-8' />
                <div className='flex max-w-fit flex-grow flex-col overflow-y-hidden rounded-2xl bg-gray-100 p-2 text-sm'>
                  <span className='mb-1 w-fit text-xs font-semibold'>Nguyen Tien Nam</span>
                  <p className='max-w-fit whitespace-pre-wrap text-sm font-light text-gray-700'>
                    {comment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
