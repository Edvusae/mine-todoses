// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'user' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would call your auth API
    if (isLogin) {
      // For demo, admin@prodev.com goes to admin, others to user
      const isAdmin = formData.email === 'admin@prodev.com';
      const redirectPath = isAdmin ? '/admin' : '/user';
      
      // Store mock user in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: isAdmin ? 'admin' : 'user',
        name: formData.name || formData.email.split('@')[0],
      }));

      router.push(redirectPath);
    } else {
      // Show role selection after signup
      setSelectedRole('user');
    }

    setLoading(false);
  };

  const handleRoleSelection = (role: 'admin' | 'user') => {
    // Store mock user with selected role
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      role: role,
      name: formData.name,
    }));

    const redirectPath = role === 'admin' ? '/admin' : '/user';
    router.push(redirectPath);
  };

  if (selectedRole !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 max-w-2xl w-full border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Role
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelection('admin')}
              className="backdrop-blur-md bg-white/20 rounded-2xl p-8 border-2 border-white/30 hover:bg-white/30 transition text-left"
            >
              <div className="text-5xl mb-4">👔</div>
              <h3 className="text-2xl font-bold text-white mb-2">Admin</h3>
              <p className="text-white/80">
                Assign tasks, manage team, and track performance
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelection('user')}
              className="backdrop-blur-md bg-white/20 rounded-2xl p-8 border-2 border-white/30 hover:bg-white/30 transition text-left"
            >
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold text-white mb-2">User</h3>
              <p className="text-white/80">
                Receive tasks, track progress, and share reports
              </p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition"
      >
        ← Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full border border-white/20"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">
            ✓
          </div>
          <span className="text-3xl font-bold text-white">ProDev</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-white/70 text-center mb-8">
          {isLogin
            ? 'Sign in to continue to your dashboard'
            : 'Sign up to start managing tasks'}
        </p>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 mb-6 border border-white/20">
            <p className="text-white/90 text-sm font-semibold mb-2">Demo Credentials:</p>
            <p className="text-white/80 text-sm">
              Admin: <span className="font-mono">admin@prodev.com</span>
            </p>
            <p className="text-white/80 text-sm">
              User: <span className="font-mono">user@prodev.com</span>
            </p>
            <p className="text-white/70 text-xs mt-2">Password: any password</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              required
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white/80 hover:text-white text-sm transition"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/80 hover:text-white transition"
          >
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span className="font-semibold">Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="font-semibold">Sign In</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// lib/utils.ts