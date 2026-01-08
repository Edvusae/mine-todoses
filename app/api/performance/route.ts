import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Task from '@/lib/models/Task';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week'; // week, month, 6months

    await dbConnect();

    const startDate = getStartDate(period);
    
    const tasks = await Task.find({
      assignedTo: session.user.id,
      createdAt: { $gte: startDate },
    });

    const completed = tasks.filter((t: any) => t.status === 'completed');
    const inProgress = tasks.filter((t: any) => t.status === 'in-progress');
    const pending = tasks.filter((t: any) => t.status === 'pending');
    
    const completionRate = tasks.length > 0 
      ? Number(((completed.length / tasks.length) * 100).toFixed(1))
      : 0;

    // Calculate average completion time
    const completedWithTime = completed.filter((t: any) => t.actualTime);
    const avgCompletionTime = completedWithTime.length > 0
      ? Math.round(
          completedWithTime.reduce((sum: number, t: any) => sum + t.actualTime, 0) / 
          completedWithTime.length
        )
      : 0;

    return NextResponse.json({
      total: tasks.length,
      completed: completed.length,
      inProgress: inProgress.length,
      pending: pending.length,
      completionRate,
      avgCompletionTime,
      tasks: tasks.map((t: any) => ({
        id: t._id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        category: t.category,
        date: t.completedAt || t.createdAt,
        actualTime: t.actualTime,
      })),
    });
  } catch (error) {
    console.error('GET /api/performance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
}

function getStartDate(period: string): Date {
  const now = new Date();
  switch (period) {
    case 'week':
      return new Date(now.setDate(now.getDate() - 7));
    case 'month':
      return new Date(now.setMonth(now.getMonth() - 1));
    case '6months':
      return new Date(now.setMonth(now.getMonth() - 6));
    default:
      return new Date(now.setDate(now.getDate() - 7));
  }
}