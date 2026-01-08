'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_USERS } from '@/lib/mock-data';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  UserPlus,
  Mail,
  TrendingUp,
  Award,
  Clock,
  MoreVertical,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users] = useState<User[]>(MOCK_USERS.filter(u => u.role === 'user'));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteUser = () => {
    console.log('Invite user');
    // TODO: Implement invite modal
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Team Members
            </h1>
            <p className="text-gray-600">Manage your team and track performance</p>
          </div>

          <Button onClick={handleInviteUser} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Invite User
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-blue-700">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Active</p>
                  <p className="text-3xl font-bold text-green-700">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg Completion</p>
                  <p className="text-3xl font-bold text-purple-700">76%</p>
                </div>
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Avg Time</p>
                  <p className="text-3xl font-bold text-orange-700">4.6h</p>
                </div>
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 font-medium mb-1">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-green-700">
                        {user.stats.tasksCompleted}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">
                        In Progress
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {user.stats.tasksInProgress}
                      </p>
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-semibold text-purple-600">
                        {user.stats.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${user.stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      🔥 {user.stats.currentStreak} day streak
                    </Badge>
                    {user.stats.completionRate >= 80 && (
                      <Badge variant="success">⭐ Top Performer</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Assign Task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search query
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}