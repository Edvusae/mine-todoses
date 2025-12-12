import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(request: Request) {
  const { userId } = auth();
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'week'; // week, month, 6months

  await dbConnect();

  const startDate = getStartDate(period);
  
  const tasks = await Task.find({
    assignedTo: userId,
    createdAt: { $gte: startDate },
  });

  const completed = tasks.filter(t => t.status === 'completed');
  const completionRate = (completed.length / tasks.length) * 100;

  return NextResponse.json({
    total: tasks.length,
    completed: completed.length,
    completionRate,
    tasks: tasks.map(t => ({
      date: t.completedAt || t.createdAt,
      status: t.status,
    })),
  });
}

function getStartDate(period: string) {
  const now = new Date();
  if (period === 'week') {
    return new Date(now.setDate(now.getDate() - 7));
  } else if (period === 'month') {
    return new Date(now.setMonth(now.getMonth() - 1));
  } else {
    return new Date(now.setMonth(now.getMonth() - 6));
  }
}
