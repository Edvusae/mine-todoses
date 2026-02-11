// Task Management System - Type Definitions

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'development' | 'design' | 'testing' | 'documentation' | 'meeting' | 'other';
export type UserRole = 'admin' | 'user';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo: string | User;
  assignedBy?: string | User;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date;
  tags?: string[];
  attachments?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface Comment {
  _id?: string;
  id?: string;
  taskId: string;
  userId: string | User;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Report {
  _id?: string;
  id?: string;
  title: string;
  type: 'performance' | 'productivity' | 'summary';
  generatedBy: string | User;
  dateRange: {
    start: Date;
    end: Date;
  };
  data: any;
  createdAt?: Date;
}

export interface Notification {
  _id?: string;
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'task_assigned' | 'task_updated' | 'task_completed' | 'deadline_approaching' | 'system';
  read: boolean;
  taskId?: string;
  createdAt?: Date;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  tasksCompletedThisWeek: number;
  tasksCompletedThisMonth: number;
  averageCompletionTime: number;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: TaskCategory;
  assignedTo?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}