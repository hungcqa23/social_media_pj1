import { Link, useSearchParams } from 'react-router-dom';
import IconProfile from '../IconProfile';
import Button from '../Button';
import classNames from 'classnames';
import { useQueryString } from 'src/hooks/useQueryString';
import { useQuery } from '@tanstack/react-query';
import { notificationApi } from 'src/apis/notification.api';
import List from '../List';
import NotificationItem from './NotificationItem';

interface Props {
  className?: string;
  children?: React.ReactNode;
}
export default function NotificationBar({
  className = 'ml-[4.5rem] flex lg:ml-56 bg-white',
  children
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStr = useQueryString();
  const { type } = queryStr;
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.getAllNotifications()
  });

  const notifications =
    (type === 'unread'
      ? notificationsData?.data?.notification.filter(
          notification => notification.read === false
        )
      : notificationsData?.data?.notification) || [];
  console.log(notifications);

  return (
    <div className={className}>
      <nav className='flex h-screen min-w-fit flex-col border-r'>
        {children}
        <p className='mb-2 ml-9 mr-12 mt-12 text-2xl font-bold text-black'>
          Notifications
        </p>
        <div className='flex gap-2 border-t border-gray-200 pl-6 pt-2'>
          <Button
            typeButton='filter'
            value='all'
            className={classNames('w-18 rounded-full py-2', {
              'border border-gray-600': !type
            })}
            onClick={() => {
              searchParams.delete('type');
              setSearchParams(searchParams);
            }}
          >
            <span className='text-sm font-semibold text-gray-950'>All</span>
          </Button>

          <Button
            typeButton='filter'
            value='unread'
            className={classNames('w-18 rounded-full py-2', {
              'border border-gray-600': type
            })}
            onClick={() => {
              searchParams.set('type', 'unread');
              setSearchParams(searchParams);
            }}
          >
            <span className='text-sm font-semibold text-gray-950'>Unread</span>
          </Button>
        </div>

        {isLoading && (
          <ul>
            <div className='mx-9 my-4'>
              <div className='flex w-full items-center gap-2'>
                <div className='h-12 w-12 animate-pulse rounded-full bg-slate-200' />
                <div className='flex flex-grow flex-col gap-2'>
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                </div>
              </div>
            </div>
            <div className='mx-9 my-4'>
              <div className='flex w-full items-center gap-2'>
                <div className='h-12 w-12 animate-pulse rounded-full bg-slate-200' />
                <div className='flex flex-grow flex-col gap-2'>
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                </div>
              </div>
            </div>
            <div className='mx-9 my-4'>
              <div className='flex w-full items-center gap-2'>
                <div className='h-12 w-12 animate-pulse rounded-full bg-slate-200' />
                <div className='flex flex-grow flex-col gap-2'>
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                  <div className='h-4 flex-grow animate-pulse rounded-full bg-slate-200' />
                </div>
              </div>
            </div>
          </ul>
        )}

        {!isLoading &&
          List({
            listItems: notifications,
            mapFn: notification => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ),
            as: 'ul',
            className: classNames('', {
              'mt-2': notifications.length > 0
            })
          })}
      </nav>
    </div>
  );
}
