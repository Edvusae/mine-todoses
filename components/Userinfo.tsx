'use client';

import { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface UserInfoProps {
  user: User;
  showDetails?: boolean;
}

export default function UserInfo({ user, showDetails = false }: UserInfoProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* User Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
            {user.role}
          </Badge>
        </div>

        {showDetails && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="truncate">{user.email}</span>
            </div>

            {user.department && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>{user.department}</span>
              </div>
            )}

            {user.createdAt && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            )}
          </div>
        )}

        {!showDetails && (
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
}