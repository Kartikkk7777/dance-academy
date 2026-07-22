import mongoose from 'mongoose';

const TimetableSlotSchema = new mongoose.Schema(
  {
    programName: {
      type: String,
      required: [true, 'Program name is required'],
      maxlength: [100, 'Program name cannot exceed 100 characters'],
      trim: true,
    },
    dayOfWeek: {
      type: String,
      required: [true, 'Day of week is required'],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      maxlength: [10, 'Start time cannot exceed 10 characters'],
      trim: true,
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      maxlength: [10, 'End time cannot exceed 10 characters'],
      trim: true,
    },
    instructor: {
      type: String,
      required: false,
      maxlength: [100, 'Instructor name cannot exceed 100 characters'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TimetableSlot || mongoose.model('TimetableSlot', TimetableSlotSchema);
