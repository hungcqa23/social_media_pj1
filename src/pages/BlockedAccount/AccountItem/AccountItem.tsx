import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi } from 'src/apis/profile.api';
import Button from 'src/components/Button';
import IconProfile from 'src/components/IconProfile';

export default function AccountItem({ accountId }: { accountId?: string }) {
  const queryClient = useQueryClient();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', accountId],
    queryFn: () => profileApi.getProfile(accountId || '')
  });
  const unBlockedMutation = useMutation({
    mutationFn: () => profileApi.unBlockAccount(accountId || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    }
  });

  const profile = profileData?.data.user;

  return (
    <>
      {!isLoading && (
        <div className='flex items-center justify-between'>
          <div className='flex flex-grow items-center'>
            <IconProfile
              src={profile?.profilePicture}
              isImage
              className='h-12 w-12 shrink-0'
              classNameImage='h-12 w-12'
            />
            <div className='ml-3 flex flex-col text-sm'>
              <span className='font-medium text-black'>
                {profile?.username}
              </span>
              <span className='text-[0.8125rem] font-normal text-gray-500'>
                Includes their posts and profile information
              </span>
            </div>
          </div>

          <Button
            className='min-h-[2rem] rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold text-black'
            onClick={() => unBlockedMutation.mutate()}
            disabled={unBlockedMutation.isPending}
            isLoading={unBlockedMutation.isPending}
          >
            Unblock
          </Button>
        </div>
      )}

      {isLoading && (
        <div className='flex animate-pulse items-center space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-200' />
          <div className='flex flex-1 flex-col gap-2 py-1'>
            <div className='h-2 rounded bg-slate-200' />

            <div className='grid grid-cols-3 gap-4'>
              <div className='col-span-2 h-2 rounded bg-slate-200' />
              <div className='col-span-1 h-2 rounded bg-slate-200' />
            </div>
            <div className='h-2 rounded bg-slate-200' />
          </div>
        </div>
      )}
    </>
  );
}
