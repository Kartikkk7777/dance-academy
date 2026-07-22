import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      maxlength: [100, 'Student name cannot exceed 100 characters'],
      trim: true,
    },
    program: {
      type: String,
      required: false,
      maxlength: [100, 'Program cannot exceed 100 characters'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      maxlength: [2000, 'Content cannot exceed 2000 characters'],
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

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
