import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { notificationApi } from 'src/apis/notification.api';
import IconProfile from 'src/components/IconProfile';
import { Notification } from 'src/types/notification.type';
import { calculateTimeAgo } from 'src/utils/helper';

export default function NotificationItem({
  notification
}: {
  notification: Notification;
}) {
  const isRead = notification.read;
  const queryClient = useQueryClient();
  const markAsReadMutation = useMutation({
    mutationFn: () => notificationApi.markAsRead(notification._id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey[0] === 'notifications';
        }
      });
    }
  });
  const url =
    notification.notificationType !== 'follows'
      ? `/posts/${notification.entityId}`
      : `/${notification.userFrom}`;
  return (
    <Link
      to={url}
      className='block w-full py-1 hover:bg-gray-200'
      onClick={() => {
        if (!isRead) {
          markAsReadMutation.mutate();
        }
      }}
    >
      <div className='mx-6 my-1 flex flex-col justify-center gap-1'>
        <div className='flex items-center'>
          <IconProfile
            className='mr-3 flex h-14 w-14'
            classNameImage='h-14 w-14'
            isImage
            src={notification?.userFromProfilePicture}
          />
          <div
            className={classNames(
              'flex flex-grow flex-col justify-between text-[0.8125rem] font-normal',
              {
                'opacity-95': isRead
              }
            )}
          >
            <p
              className={classNames('w-64 font-normal text-black', {
                'font-semibold': !isRead
              })}
            >
              {notification.message}
            </p>
            <span
              className={classNames('text-xs', {
                'font-semibold text-blue-600': !isRead,
                'font-normal text-gray-400': isRead
              })}
            >
              {calculateTimeAgo(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
