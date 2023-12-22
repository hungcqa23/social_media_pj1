import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'src/types/post.type';
import { formatSocialNumber } from 'src/utils/helper';

export default function ImageItem({ post }: { post: Post }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`/posts/${post._id}`}
      className='relative basis-[calc((100%-0.5rem)/3)]'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
        alt='Post Item'
        className='h-full w-full object-cover'
      />
      {isHover && (
        <div className='absolute inset-0 flex justify-center bg-black/30'>
          <ul className='flex items-center'>
            <li className='mr-6 flex'>
              <span>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z'
                    className={'fill-white'}
                  />
                </svg>
              </span>
              <span className='flex min-w-[1.5rem] justify-center font-semibold text-white'>
                {formatSocialNumber(post.reactions?.like || 0)}
              </span>
            </li>
            <li className='flex'>
              <span>
                <svg
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21.0005 12C21.0005 10.22 20.4727 8.47991 19.4837 6.99987C18.4948 5.51983 17.0892 4.36627 15.4446 3.68508C13.8001 3.0039 11.9905 2.82567 10.2447 3.17293C8.49885 3.5202 6.8952 4.37737 5.63653 5.63604C4.37786 6.89471 3.52069 8.49836 3.17342 10.2442C2.82616 11.99 3.00439 13.7996 3.68558 15.4442C4.36677 17.0887 5.52032 18.4943 7.00036 19.4832C8.4804 20.4722 10.2205 21 12.0005 21C13.4885 21 14.8915 20.64 16.1275 20L21.0005 21L20.0005 16.127C20.6405 14.891 21.0005 13.487 21.0005 12Z'
                    stroke='white'
                    className='fill-white'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span className='flex min-w-[1.5rem] justify-center font-semibold text-white'>
                {formatSocialNumber(post.commentsCount || 0)}
              </span>
            </li>
          </ul>
        </div>
      )}
    </Link>
  );
}
