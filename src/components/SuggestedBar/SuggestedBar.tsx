import { Link } from 'react-router-dom';
import Profile from '../IconProfile';
import List from '../List';
import SuggestedFriend from '../SuggestedFriend';
import { useAppContext } from 'src/contexts/app.contexts';

interface SuggestedFriends {
  id: number;
  username: string;
  fullName: string;
  srcImg?: string;
}

const suggestedFriends: SuggestedFriends[] = [
  {
    id: 1,
    username: 'anhungwindyy',
    fullName: 'An Hưng',
    srcImg:
      'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 3,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 4,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 5,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  }
];

export default function SuggestedBar() {
  const { profile } = useAppContext();

  return (
    <div className='hidden w-96 flex-col pl-16 xl:flex'>
      <div className='mt-9 flex flex-col gap-6'>
        {/* Profile */}
        <div className='flex items-center gap-2 px-4'>
          <Profile src={profile?.profilePicture} />
          <div className='flex flex-col'>
            <Link
              to={`/${profile?.username.toLowerCase()}`}
              className='text-sm font-semibold'
            >
              {profile?.username.toLowerCase()}
            </Link>
            <p className='text-sm font-normal leading-4 text-gray-500'>
              {profile?.fullname}
            </p>
          </div>
        </div>

        {/* <SuggestedList /> */}
        <div>
          <div className='px-4 py-1'>
            <span className='text-sm font-semibold text-gray-500'>
              Suggested for you
            </span>
          </div>

          {List<SuggestedFriends>({
            listItems: suggestedFriends,
            mapFn: ({ id, username, srcImg }: SuggestedFriends) => (
              <SuggestedFriend key={id} username={username} srcImg={srcImg} />
            )
          })}
        </div>
      </div>
    </div>
  );
}
