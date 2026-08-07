export interface FocusSession {
  id: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  plannedDuration?: number; // in minutes
  completed: boolean;
}
