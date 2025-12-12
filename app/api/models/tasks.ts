import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  category: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'in-progress', 'completed'],
    default: 'pending'
  },
  assignedTo: { type: String, required: true },
  assignedBy: { type: String, required: true },
  dueDate: Date,
  estimatedTime: Number,
  actualTime: Number,
  declineReason: String,
  acceptanceComment: String,
  createdAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  completedAt: Date,
  tags: [String],
  dailyTaskComplete: { type: Boolean, default: false },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);