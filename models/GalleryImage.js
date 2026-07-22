import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      trim: true,
    },
    altText: {
      type: String,
      required: [true, 'Alt text is required for accessibility'],
      maxlength: [300, 'Alt text cannot exceed 300 characters'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      maxlength: [500, 'Image URL cannot exceed 500 characters'],
    },
    imagePublicId: {
      type: String,
      required: [true, 'Image public ID is required'],
      maxlength: [200, 'Image public ID cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: false,
      maxlength: [50, 'Category cannot exceed 50 characters'],
      trim: true,
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

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
