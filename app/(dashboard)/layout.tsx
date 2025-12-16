'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ListTodo,
  Clock,
  BarChart3,
  Users,
  UserPlus,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = session.user?.role || 'user';

  const userNavigation = [
    { name: 'Dashboard', href: '/user', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/user/tasks', icon: ListTodo },
    { name: 'Pending', href: '/user/pending', icon: Clock, badge: 3 },
    { name: 'Analytics', href: '/user/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/user/settings', icon: Settings },
  ];

  const adminNavigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Team Members', href: '/admin/users', icon: Users },
    { name: 'Assign Tasks', href: '/admin/assign', icon: UserPlus },
    { name: 'All Tasks', href: '/admin/tasks', icon: ListTodo },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const navigation = userRole === 'admin' ? adminNavigation : userNavigation;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ✓
              </div>
              <div>
                <h1 className="font-bold text-lg">ProDev</h1>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge variant={isActive ? 'secondary' : 'default'}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {session.user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {session.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <div className="hidden lg:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {session.user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}