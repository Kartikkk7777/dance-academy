import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: false,
      maxlength: [200, 'Location cannot exceed 200 characters'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
      maxlength: [500, 'Image URL cannot exceed 500 characters'],
    },
    imagePublicId: {
      type: String,
      required: false,
      maxlength: [200, 'Image public ID cannot exceed 200 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
