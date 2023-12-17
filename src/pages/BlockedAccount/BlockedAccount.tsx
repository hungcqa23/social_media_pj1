import AccountItem from './AccountItem';
import { useQuery } from '@tanstack/react-query';
import { profileApi } from 'src/apis/profile.api';
import List from 'src/components/List';
import Spinner from 'src/components/Spinner';

export default function BlockedAccount() {
  const { data: currentUserData, isLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => profileApi.getCurrentProfile()
  });
  const currentUser = currentUserData?.data.user;
  return (
    <>
      <div className='px-4'>
        <h1 className='mt-6 text-4xl font-normal'>Blocked accounts</h1>
        <p className='mt-6 font-normal text-gray-400'>
          You can block people anytime from their profiles
        </p>
      </div>

      <>
        {!isLoading &&
          List({
            listItems: currentUser?.blocked || [],
            mapFn: accountId => (
              <AccountItem key={accountId} accountId={accountId} />
            ),
            as: 'ul',
            className: 'ml-4 mr-10 mt-10 flex flex-col gap-2'
          })}

        {isLoading && (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        )}
      </>
    </>
  );
}
