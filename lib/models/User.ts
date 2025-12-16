import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stats: {
    tasksCompleted: { type: Number, default: 0 },
    tasksDeclined: { type: Number, default: 0 },
    tasksInProgress: { type: Number, default: 0 },
    totalTasksAssigned: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    averageCompletionTime: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);