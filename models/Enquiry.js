import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      maxlength: [254, 'Email cannot exceed 254 characters'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      trim: true,
    },
    program: {
      type: String,
      required: [true, 'Program selection is required'],
      maxlength: [100, 'Program cannot exceed 100 characters'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
