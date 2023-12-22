import {
  calculateTimeAgo,
  formatDate,
  formatSocialNumber
} from 'src/utils/helper';
import IconProfile from '../IconProfile';
import { Post } from 'src/types/post.type';
import { Link } from 'react-router-dom';

interface Props {
  post: Post;
}
export default function FilterPost({ post }: Props) {
  const { username, createdAt, commentsCount } = post;
  const like = post.reactions.like;
  return (
    <div className='mt-5 px-4 pb-4'>
      <div className='flex w-full flex-col items-center border-b pb-4 sm:flex-row sm:items-stretch'>
        <div className='flex-grow'>
          <div className='flex items-center gap-4'>
            <IconProfile to={`/${post.userId}`} src={post.profilePicture} />
            <span className='text-sm font-medium text-black'>{username}</span>
            <span className='text-xs font-normal text-gray-300'>
              {formatDate(createdAt as string)}
            </span>
            <button className='text-xs font-semibold text-blue-500'>
              Follow
            </button>
          </div>
          <p className='mt-2 text-sm'>{post.post}</p>
          <div className='mt-4 flex gap-4'>
            <p className='text-xs font-normal text-gray-950'>
              {formatSocialNumber(like)} likes
            </p>
            <p className='text-xs font-normal text-gray-950'>
              {formatSocialNumber(commentsCount as number)} comments
            </p>
          </div>
        </div>

        {post.imgId !== '' && (
          <Link
            className='flex flex-grow justify-end'
            to={`/posts/${post._id}`}
          >
            <img
              src={`https://res.cloudinary.com/daszajz9a/image/upload/v${post.imgVersion}/${post.imgId}`}
              alt='Post'
              width={140}
              height={140}
              className='rounded-md'
            />
          </Link>
        )}
        {/* Images */}
        {/* {image && (
          <div className='flex flex-grow justify-end'>
            <img
              src='/src/assets/images/user.jpg'
              alt=''
              className='h-32 w-56 rounded-md object-cover'
            />
          </div>
        )}


        {video && (
          <div className='flex flex-grow justify-end'>
            <video className='h-32 w-56 rounded-lg' controls>
              <source src={video} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )} */}
      </div>
    </div>
  );
}
