import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Program name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
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
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
