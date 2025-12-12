'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TASKS } from '@/lib/mock-data';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import {
  formatDate,
  getPriorityBadgeColor,
  getCategoryIcon,
  formatMinutes,
} from '@/lib/utils';

export default function UserPendingPage() {
  const [tasks, setTasks] = useState<Task[]>(
    MOCK_TASKS.filter(t => t.assignedTo === 'user-1' && t.status === 'pending')
  );
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [responseType, setResponseType] = useState<'accept' | 'decline'>('accept');
  const [responseReason, setResponseReason] = useState('');

  const handleOpenResponseModal = (task: Task, type: 'accept' | 'decline') => {
    setSelectedTask(task);
    setResponseType(type);
    setResponseReason('');
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedTask) return;

    if (responseType === 'decline' && !responseReason.trim()) {
      alert('Please provide a reason for declining');
      return;
    }

    // TODO: Send to backend
    console.log({
      taskId: selectedTask.id,
      action: responseType,
      reason: responseReason,
    });

    // Update local state
    setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
    setShowResponseModal(false);
    setSelectedTask(null);
    setResponseReason('');

    alert(
      responseType === 'accept'
        ? '✅ Task accepted! It will appear in your active tasks.'
        : '❌ Task declined. Your manager has been notified.'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Pending Approvals</h1>
              <p className="text-gray-600">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} waiting for your response
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium">
                    Review each task carefully
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    You must provide a reason if declining. Accepted tasks will appear in your active tasks list.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                All Caught Up!
              </h3>
              <p className="text-gray-500">
                You have no pending task approvals at the moment.
              </p>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-3">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getPriorityBadgeColor(task.priority)}>
                          {task.priority} priority
                        </Badge>
                        <Badge variant="secondary">
                          {getCategoryIcon(task.category)} {task.category}
                        </Badge>
                        {task.dueDate && (
                          <Badge variant="outline" className="border-orange-300 text-orange-700">
                            📅 Due: {formatDate(task.dueDate)}
                          </Badge>
                        )}
                      </div>

                      {/* Task Details */}
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                        {task.estimatedTime && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Estimated Time:</span>
                            <span className="font-semibold text-gray-900">
                              {formatMinutes(task.estimatedTime)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Assigned By:</span>
                          <span className="font-semibold text-gray-900">Manager</span>
                        </div>
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600 border"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleOpenResponseModal(task, 'accept')}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Task
                        </Button>
                        <Button
                          onClick={() => handleOpenResponseModal(task, 'decline')}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Response Modal */}
        {showResponseModal && selectedTask && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                {responseType === 'accept' ? (
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {responseType === 'accept' ? 'Accept Task' : 'Decline Task'}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedTask.title}</p>
                </div>
              </div>

              {responseType === 'accept' ? (
                <div className="mb-6">
                  <p className="text-gray-700 mb-3">
                    By accepting this task, you confirm that:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>You understand the requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>You can complete it by the due date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>It will appear in your active tasks</span>
                    </li>
                  </ul>

                  {/* Optional comment */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add a comment (optional)
                    </label>
                    <textarea
                      value={responseReason}
                      onChange={(e) => setResponseReason(e.target.value)}
                      placeholder="Any notes or questions..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for declining *
                  </label>
                  <textarea
                    value={responseReason}
                    onChange={(e) => setResponseReason(e.target.value)}
                    placeholder="Please explain why you're declining this task..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your manager will be notified with this reason
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedTask(null);
                    setResponseReason('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitResponse}
                  className={`flex-1 ${
                    responseType === 'accept'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {responseType === 'accept' ? 'Confirm Accept' : 'Confirm Decline'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
