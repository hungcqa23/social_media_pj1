import { Link } from 'react-router-dom';
import Profile from '../../../components/IconProfile';
import { useState } from 'react';
import { User } from 'src/types/user.type';

interface Props {
  user: User;
}
export default function SuggestedFriend(props: Props) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className='flex items-center px-4 py-2'>
      <div className='mr-2'>
        <Profile src={props.user.profilePicture} to={`/${props.user._id}`} />
      </div>
      <div className='flex flex-col'>
        <Link to={`${props.user._id}`} className='text-sm font-semibold'>
          {props.user.username}
        </Link>
        <p className='text-xs text-gray-400'>We recommend you this user</p>
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
