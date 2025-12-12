import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await dbConnect();
  const tasks = await Task.find({ assignedTo: userId });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  await dbConnect();
  
  const task = await Task.create({
    ...body,
    assignedBy: userId,
    createdAt: new Date(),
  });

  return NextResponse.json(task);
}