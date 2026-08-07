export interface Reminder {
  id: string;
  taskId: string;
  enabled: boolean;
  startDate: Date;
  times: string[]; // Array of time strings in "HH:mm" format (time of day)
  createdAt: Date;
  updatedAt: Date;
}
