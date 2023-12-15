import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'src/types/post.type';
import { formatSocialNumber } from 'src/utils/helper';

export default function ImageItem({ post }: { post: Post }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to='/posts/6578758c1dce97fb1e9f2ea1'
      className='relative basis-[calc((100%-0.5rem)/3)]'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
        alt='Post Item'
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
                {formatSocialNumber(post.commentsCount || 0)}
              </span>
            </li>
          </ul>
        </div>
      )}
    </Link>
  );
}
