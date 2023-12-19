import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';
import { Notification } from 'src/types/notification.type';

interface GetAllNotifications extends SuccessResponse {
  notification: Notification[];
}
const URL_NOTIFICATION = 'notification';
export const notificationApi = {
  getAllNotifications() {
    return http.get<GetAllNotifications>(URL_NOTIFICATION);
  },
  markAsRead(notificationId: string) {
    return http.put<SuccessResponse>(`${URL_NOTIFICATION}/${notificationId}`);
  }
};
