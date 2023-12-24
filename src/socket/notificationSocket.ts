import { Notification } from 'src/types/notification.type';
import { User } from 'src/types/user.type';
import { socketIOService } from './socket';

export class NotificationSocket {
  static socketIONotification(
    profile: User,
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void
  ) {
    if (socketIOService.getSocket()) {
      socketIOService
        .getSocket()
        .on('insert notification', (data: Notification[], userToData) => {
          if (profile._id === userToData.userTo) {
            notifications = [...data];
            setNotifications(notifications);
          }
        });
    }
  }
}
