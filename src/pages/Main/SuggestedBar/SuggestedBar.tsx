import { Link } from 'react-router-dom';
import Profile from '../../../components/IconProfile';
import List from '../../../components/List';
import SuggestedFriend from '../SuggestedFriend';
import { useAppContext } from 'src/contexts/app.contexts';
import { User } from 'src/types/user.type';
import { useQuery } from '@tanstack/react-query';
import { getRecommendedUsers } from 'src/apis/user.api';

export default function SuggestedBar() {
  const { profile } = useAppContext();

  const { data: recommendationData, isLoading } = useQuery({
    queryKey: ['user-recommendations'],
    queryFn: () => getRecommendedUsers()
  });
  return (
    <div className='hidden w-96 flex-col pl-16 xl:flex'>
      <div className='mt-9 flex flex-col gap-6'>
        {/* Profile */}
        <div className='flex items-center gap-2 px-4'>
          <Profile src={profile?.profilePicture} to={`/${profile?._id}`} />

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

          {!isLoading &&
            List<User>({
              listItems: recommendationData?.data.users || [],
              mapFn: (user: User) => (
                <SuggestedFriend key={user._id} user={user} />
              )
            })}
        </div>
      </div>
    </div>
  );
}
