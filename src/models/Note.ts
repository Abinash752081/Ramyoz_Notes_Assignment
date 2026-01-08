import mongoose from 'mongoose';

// TypeScript interface for Note
export interface INote {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema definition
const NoteSchema = new mongoose.Schema<INote>({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true, // Automatically trim whitespace
  },
  content: {
    type: String,
    required: [true, 'Note content is required'],
    trim: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the model
// Use existing model if it exists (prevents re-compilation errors in development)
export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);