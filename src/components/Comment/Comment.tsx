import { useState } from 'react';
import IconProfile from '../IconProfile';

interface Props {
  content: string;
  username: string;
}
export default function Comment({ content, username = 'An Hung' }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div className='px-4 py-2'>
      <div
        className='flex items-start gap-2'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <IconProfile
          className='h-8 w-8 flex-shrink-0'
          classNameImage='h-8 w-8'
        />
        <div className='flex max-w-fit flex-grow flex-col overflow-y-hidden  text-sm'>
          <div className='flex items-center gap-2'>
            <div className='rounded-2xl bg-gray-100 p-2'>
              <span className='mb-1 w-fit text-xs font-semibold'>
                {username}
              </span>
              <p className='max-w-fit whitespace-pre-wrap text-sm font-light text-gray-700'>
                {content}
              </p>
            </div>

            {hover && (
              <button className='flex h-8 w-8 items-center justify-center rounded-full text-xl font-semibold hover:bg-gray-200'>
                <span className=''>...</span>
              </button>
            )}
          </div>
          <ul className='text-xs text-gray-600'>
            <span className='mx-2'>1 w</span>
            <button className='mx-2 font-semibold'>Like</button>
          </ul>
        </div>
      </div>
    </div>
  );
}
