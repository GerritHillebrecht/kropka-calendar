export interface NotificationMessage {
  title: string;
  action?: string;
  options?: {
    duration: number;
  };
}
