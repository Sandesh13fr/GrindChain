import mongoose from 'mongoose';

const roadmapItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  duration: String,
  roadmap: String,
  roadmapItems: [roadmapItemSchema],
  milestones: [milestoneSchema],
  aiGenerated: { type: Boolean, default: false },
  overallProgress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false }, // **NEW: Add completed field**
  UserId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

export default taskSchema;