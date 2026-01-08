'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MOCK_TASKS } from '@/lib/mock-data';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminTasksPage() {
  const [tasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesPriority =
        selectedPriority === 'all' || task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority]);

  // Calculate stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Tasks</h1>
            <p className="text-gray-600">
              Monitor and manage all team tasks
            </p>
          </div>

          <Link href="/admin/assign">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Assign New Task
            </Button>
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-1">Total</div>
            <div className="text-3xl font-bold text-blue-700">{stats.total}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="text-sm text-yellow-600 font-medium mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-700">{stats.pending}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-sm text-purple-600 font-medium mb-1">In Progress</div>
            <div className="text-3xl font-bold text-purple-700">{stats.inProgress}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-sm text-green-600 font-medium mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-700">{stats.completed}</div>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value as TaskStatus | 'all')
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={selectedPriority}
                    onChange={(e) =>
                      setSelectedPriority(e.target.value as TaskPriority | 'all')
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ||
                selectedStatus !== 'all' ||
                selectedPriority !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first task to get started'}
              </p>
              <Link href="/admin/assign">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Assign New Task
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-6 text-center text-gray-600">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}