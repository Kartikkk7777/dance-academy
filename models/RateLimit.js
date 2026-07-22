import mongoose from 'mongoose';

const RateLimitSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'IP address is required'],
    maxlength: [45, 'IP address cannot exceed 45 characters'],
    trim: true,
  },
  endpoint: {
    type: String,
    required: [true, 'Endpoint is required'],
    maxlength: [100, 'Endpoint cannot exceed 100 characters'],
    trim: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
    max: [1000, 'Count cannot exceed 1000'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900, // TTL: 900 seconds = 15 minutes. MongoDB auto-deletes after this.
  },
});

// Compound index for fast lookups by IP + endpoint
RateLimitSchema.index({ ip: 1, endpoint: 1 });

export default mongoose.models.RateLimit || mongoose.model('RateLimit', RateLimitSchema);
