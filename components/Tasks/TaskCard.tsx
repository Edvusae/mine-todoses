'use client';

import { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border ${
        isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      } hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg text-gray-900 flex-1">{task.title}</h3>
        <Badge variant={getStatusColor(task.status)}>
          {task.status.replace('-', ' ')}
        </Badge>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
        <Badge variant="outline">{task.category}</Badge>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
        )}
        
        {typeof task.assignedTo === 'object' && task.assignedTo?.name && (
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{task.assignedTo.name}</span>
          </div>
        )}

        {task.estimatedHours && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{task.estimatedHours}h</span>
          </div>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}