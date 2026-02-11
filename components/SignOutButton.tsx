'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

interface SignOutButtonProps {
  className?: string;
  variant?: 'default' | 'icon' | 'text';
}

export default function SignOutButton({ 
  className = '', 
  variant = 'default' 
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className={`p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        title="Sign Out"
      >
        <LogOut className="h-5 w-5 text-gray-600" />
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className={`flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <LogOut className="h-4 w-4" />
        <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <LogOut className="h-4 w-4" />
      <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
    </button>
  );
}