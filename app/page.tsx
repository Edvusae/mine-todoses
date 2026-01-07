'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: '👔',
      title: 'Admin Dashboard',
      description: 'Assign tasks, track team performance, and generate insights',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '👤',
      title: 'User Workspace',
      description: 'Accept tasks, track progress, and share weekly reports',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📊',
      title: 'Analytics & Reports',
      description: 'Comprehensive insights with weekly and monthly performance',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '⏱️',
      title: 'Pomodoro Timer',
      description: 'Built-in focus timer to boost your productivity',
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Tasks Completed' },
    { number: '500+', label: 'Active Users' },
    { number: '95%', label: 'Completion Rate' },
    { number: '24/7', label: 'Cloud Sync' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
                ✓
              </div>
              <span className="text-2xl font-bold text-white">ProDev</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4"
            >
              <Link
                href="/signin"
                className="px-6 py-2 text-white hover:bg-white/20 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Task Management
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
              Reimagined
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Empower your team with intelligent task assignment, real-time collaboration,
            and powerful analytics. Built for modern teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition"
              >
                Start Free Trial →
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-white/80">
            Powerful features to supercharge your productivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="relative"
            >
              <div
                className={`
                  backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 h-full
                  transition-all duration-300
                  ${hoveredFeature === index ? 'scale-105 shadow-2xl' : ''}
                `}
              >
                <div
                  className={`
                    w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color}
                    flex items-center justify-center text-3xl mb-4
                    shadow-lg
                  `}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/10 rounded-3xl p-12 md:p-20 text-center border border-white/20"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using ProDev to manage their tasks
            and boost productivity.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition"
            >
              Start Your Free Trial
            </motion.button>
          </Link>
          <p className="text-white/60 mt-6">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg">
              ✓
            </div>
            <span className="text-white font-semibold">ProDev Task Manager</span>
          </div>
          <div className="text-white/60">
            © 2026 ProDev. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

