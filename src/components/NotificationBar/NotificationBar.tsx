import { Link, useSearchParams } from 'react-router-dom';
import IconProfile from '../IconProfile';
import Button from '../Button';
import classNames from 'classnames';
import { useQueryString } from 'src/hooks/useQueryString';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from 'src/apis/notification.api';
import List from '../List';
import NotificationItem from './NotificationItem';
import { useContext, useEffect } from 'react';
import { socketIOService } from 'src/socket/socket';
import { AppContext } from 'src/contexts/app.contexts';
import { Notification } from 'src/types/notification.type';

interface Props {
  className?: string;
  children?: React.ReactNode;
  notificationsData: Notification[];
  isLoading: boolean;
}
export default function NotificationBar({
  className = 'ml-[4.5rem] flex lg:ml-56 bg-white',
  notificationsData,
  isLoading,
  children
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStr = useQueryString();
  const { type } = queryStr;

  const notifications =
    (type === 'unread'
      ? notificationsData.filter(notification => notification.read === false)
      : notificationsData) || [];

  return (
    <div className={className}>
      <nav className='relative z-50 flex h-screen min-w-fit flex-col border-r bg-white'>
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
            className: classNames('bg-white', {
              'mt-2': notifications.length > 0
            })
          })}
      </nav>
    </div>
  );
}
