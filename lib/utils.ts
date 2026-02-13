// lib/utils.ts
// Utility functions used throughout the app

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TaskPriority, TaskStatus } from '@/types';

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(d);
}

export function getDaysUntilDue(dueDate: Date | string): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const now = new Date();
  const diffInMs = due.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

export function isOverdue(dueDate: Date | string): boolean {
  return getDaysUntilDue(dueDate) < 0;
}

export function getDueDateColor(dueDate: Date | string): string {
  const days = getDaysUntilDue(dueDate);
  if (days < 0) return 'text-red-500';
  if (days <= 2) return 'text-orange-500';
  if (days <= 7) return 'text-yellow-500';
  return 'text-gray-500';
}

// Time formatting
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatHours(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
}

// Priority helpers
export function getPriorityColor(priority: TaskPriority): string {
  const colors = {
    low: 'text-green-500 bg-green-50 border-green-200',
    medium: 'text-yellow-500 bg-yellow-50 border-yellow-200',
    high: 'text-red-500 bg-red-50 border-red-200',
  };
  return colors[priority];
}

export function getPriorityBadgeColor(priority: TaskPriority): string {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[priority];
}

// Status helpers
export function getStatusColor(status: TaskStatus): string {
  const colors = {
    pending: 'text-blue-500 bg-blue-50',
    accepted: 'text-purple-500 bg-purple-50',
    declined: 'text-red-500 bg-red-50',
    'in-progress': 'text-yellow-500 bg-yellow-50',
    completed: 'text-green-500 bg-green-50',
    overdue: 'text-red-600 bg-red-100',
  };
  return colors[status];
}

export function getStatusLabel(status: TaskStatus): string {
  const labels = {
    pending: 'Pending Approval',
    accepted: 'Accepted',
    declined: 'Declined',
    'in-progress': 'In Progress',
    completed: 'Completed',
    overdue: 'Overdue',
  };
  return labels[status];
}

// Category helpers
export function getCategoryIcon(category: string): string {
  const icons = {
    work: '💼',
    personal: '👤',
    health: '💪',
    learning: '📚',
    other: '📋',
  };
  return icons[category as keyof typeof icons] || '📋';
}

export function getCategoryColor(category: string): string {
  const colors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    health: 'bg-green-100 text-green-800',
    learning: 'bg-orange-100 text-orange-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

// Number formatting
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Array helpers
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// String helpers
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Local storage helpers (for theme, preferences, etc.)
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Debounce helper
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Random ID generator (for temporary IDs before backend)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Chart color palette
export const CHART_COLORS = {
  primary: '#8b5cf6',
  secondary: '#ec4899',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
  blue: '#3b82f6',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444',
};

// lib/mock-data.ts