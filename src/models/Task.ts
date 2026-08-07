export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  categoryId?: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedTime?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
