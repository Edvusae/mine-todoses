import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Task from '@/lib/models/Task';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const tasks = await Task.find({ 
      assignedTo: session.user.id 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.category || !body.assignedTo) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    await dbConnect();
    
    const task = await Task.create({
      ...body,
      assignedBy: session.user.id,
      createdAt: new Date(),
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, ...updates } = body;

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' }, 
        { status: 400 }
      );
    }

    await dbConnect();
    
    const task = await Task.findById(taskId);
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' }, 
        { status: 404 }
      );
    }

    // Check authorization
    if (task.assignedTo !== session.user.id && task.assignedBy !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to update this task' }, 
        { status: 403 }
      );
    }

    // Update timestamps based on status changes
    if (updates.status === 'accepted' && !task.acceptedAt) {
      updates.acceptedAt = new Date();
    }
    if (updates.status === 'completed' && !task.completedAt) {
      updates.completedAt = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updates,
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('PATCH /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to update task' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('id');

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' }, 
        { status: 400 }
      );
    }

    await dbConnect();
    
    const task = await Task.findById(taskId);
    
    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' }, 
        { status: 404 }
      );
    }

    // Only admin or task creator can delete
    if (session.user.role !== 'admin' && task.assignedBy !== session.user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this task' }, 
        { status: 403 }
      );
    }

    await Task.findByIdAndDelete(taskId);

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' }, 
      { status: 500 }
    );
  }
}