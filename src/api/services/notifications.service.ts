import { BaseService } from './base.service';
import type { Notification } from '../../contexts/NotificationContext';

class NotificationsService extends BaseService {
  async getNotifications(): Promise<Notification[]> {
    return this.get<Notification[]>('/notifications');
  }

  async markAsRead(notificationId: string): Promise<void> {
    return this.put(`/notifications/${notificationId}/read`);
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return this.delete(`/notifications/${notificationId}`);
  }
}

export const notificationsService = new NotificationsService();