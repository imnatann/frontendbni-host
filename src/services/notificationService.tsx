// src/services/NotificationService.ts

import axios from './axios'; // Ensure the path is correct
import { io, Socket } from 'socket.io-client';
import { Notification } from '@smpm/models/notificationModel';
import { EventEmitter } from 'events';

class NotificationService {
  private socket: Socket | null = null;
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    this.connectSocket();
  }

  private connectSocket() {
    const token = localStorage.getItem('nekotssecca'); // Ensure the token key is correct
    const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

    this.socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      auth: {
        token: `Bearer ${token}`,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.on('notification', (notification: Notification) => {
      this.eventEmitter.emit('notification', notification);
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('Socket connection error:', err);
    });
  }
  public onNewNotification(callback: (notification: Notification) => void) {
    this.eventEmitter.on('notification', callback);
  }

  public disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // API Methods
  public async getNotifications(userId: number): Promise<Notification[]> {
    try {
      const response = await axios.get(`/notifications/${userId}`);
      return response.data as Notification[];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  public async markAsRead(userId: number, notificationId: number): Promise<void> {
    try {
      await axios.patch('/notifications/mark-as-read', {
        userId,
        notificationId,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  public async markAllAsRead(userId: number): Promise<void> {
    try {
      await axios.patch('/notifications/mark-all-as-read', {
        userId,
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }
}

export default new NotificationService();
