export interface Notification {
    id: number;
    title: string;
    detail: string;
    category: string;
    createdAt: string; // ISO string
    read: boolean;
    readAt?: string | null; // ISO string atau null
    created_by?: number;
    updated_by?: number;
    link?: string;
  }
  
  