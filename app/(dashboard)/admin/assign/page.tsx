'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_USERS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Send, Users } from 'lucide-react';

export default function AdminAssignTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'work' as 'work' | 'personal' | 'health' | 'learning' | 'other',
    assignedTo: '',
    dueDate: '',
    estimatedTime: '',
    tags: '',
  });

  const [assignMultiple, setAssignMultiple] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users = MOCK_USERS.filter(u => u.role === 'user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assigning task:', formData);
    console.log('To users:', assignMultiple ? selectedUsers : [formData.assignedTo]);
    
    // TODO: Implement task assignment
    alert('Task assigned successfully! (Mock)');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'work',
      assignedTo: '',
      dueDate: '',
      estimatedTime: '',
      tags: '',
    });
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Assign New Task
          </h1>
          <p className="text-gray-600">Create and assign tasks to team members</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Task Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Complete Q4 Report"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide detailed instructions..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                    />
                  </div>

                  {/* Priority & Category */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority *
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                        <option value="learning">Learning</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Due Date & Estimated Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date
                      </label>
                      <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Time (minutes)
                      </label>
                      <Input
                        type="number"
                        value={formData.estimatedTime}
                        onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                        placeholder="e.g., 120"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <Input
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g., urgent, report, quarterly"
                    />
                  </div>

                  {/* Assign To */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Assign To *
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAssignMultiple(!assignMultiple)}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        {assignMultiple ? 'Single User' : 'Multiple Users'}
                      </Button>
                    </div>

                    {!assignMultiple ? (
                      <select
                        value={formData.assignedTo}
                        onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required={!assignMultiple}
                      >
                        <option value="">Select a user...</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-sm text-gray-600">
                        Select users from the panel on the right →
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Assign Task
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  Team Members
                  {assignMultiple && selectedUsers.length > 0 && (
                    <Badge variant="default" className="ml-2">
                      {selectedUsers.length} selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {users.map(user => (
                    <div
                      key={user.id}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        assignMultiple && selectedUsers.includes(user.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => assignMultiple && toggleUserSelection(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        {assignMultiple && selectedUsers.includes(user.id) && (
                          <div className="text-purple-600">✓</div>
                        )}
                      </div>
                      <div className="mt-2 flex gap-2 text-xs">
                        <Badge variant="secondary">
                          {user.stats.tasksInProgress} active
                        </Badge>
                        <Badge variant="success">
                          {user.stats.completionRate}% rate
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
