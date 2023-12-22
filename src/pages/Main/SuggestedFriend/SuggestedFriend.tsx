import { Link } from 'react-router-dom';
import Profile from '../../../components/IconProfile';
import { useState } from 'react';

interface Props {
  username: string;
  to?: string;
  followers?: string[];
  srcImg?: string;
}
export default function SuggestedFriend(props: Props) {
  const [isFollowed, setIsFollowed] = useState(false);

  const {
    username,
    followers = ['anhung1', 'anhung2', 'anhung3'],
    srcImg = '/src/assets/images/user.jpg',
    to = '/profile'
  } = props;

  let userFollowStr = `Followed by ${followers[0]} + ${
    followers.length - 1
  } more`;
  if (userFollowStr.length > 28) {
    userFollowStr = userFollowStr.slice(0, 27) + '...';
  }

  return (
    <div className='flex items-center px-4 py-2'>
      <div className='mr-2'>
        <Profile src={srcImg} to={to} />
      </div>
      <div className='flex flex-col'>
        <Link to={to} className='text-sm font-semibold'>
          {username}
        </Link>
        <p className='text-xs text-gray-400'>{userFollowStr}</p>
      </div>
      <div className='ml-auto'>
        <button onClick={() => setIsFollowed(!isFollowed)}>
          <span className='text-sm font-medium text-blue-500'>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}
