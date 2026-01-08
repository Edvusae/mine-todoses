'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Mock data for charts
  const weeklyData = [
    { week: 'Week 1', completed: 45, assigned: 52 },
    { week: 'Week 2', completed: 52, assigned: 58 },
    { week: 'Week 3', completed: 48, assigned: 54 },
    { week: 'Week 4', completed: 61, assigned: 65 },
  ];

  const teamPerformance = [
    { name: 'John Doe', completed: 45, rate: 87 },
    { name: 'Jane Smith', completed: 38, rate: 92 },
    { name: 'Mike Johnson', completed: 52, rate: 95 },
  ];

  const handleExportReport = () => {
    console.log('Exporting report...');
    // TODO: Implement PDF/Excel export
    alert('Report export feature coming soon!');
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
              Reports & Analytics
            </h1>
            <p className="text-gray-600">Team performance insights and trends</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
            >
              Month
            </Button>
            <Button
              variant={timeRange === 'quarter' ? 'default' : 'outline'}
              onClick={() => setTimeRange('quarter')}
            >
              Quarter
            </Button>
            <Button onClick={handleExportReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
              <p className="text-xs text-white/80 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,089</div>
              <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">88.2%</div>
              <p className="text-xs text-white/80 mt-1">Above target (85%)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">245</div>
              <p className="text-xs text-white/80 mt-1">Team members</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Task Completion Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Completed"
                    />
                    <Line
                      type="monotone"
                      dataKey="assigned"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      name="Assigned"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#8b5cf6" name="Tasks Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>🏆 Top Performers This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-purple-600">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">
                          {member.completed} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {member.rate}%
                      </div>
                      <p className="text-xs text-gray-500">Completion rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle>📊 Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Peak Productivity Day
                    </p>
                    <p className="text-sm text-gray-600">
                      Most tasks are completed on Fridays with an average of 6 tasks per user
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Improvement Trend
                    </p>
                    <p className="text-sm text-gray-600">
                      Team completion rate has improved by 12% over the last quarter
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Team Engagement
                    </p>
                    <p className="text-sm text-gray-600">
                      95% of team members are actively completing tasks daily
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}