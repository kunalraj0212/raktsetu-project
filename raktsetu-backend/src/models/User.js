import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Security: Prevents password leak in query results
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['donor', 'admin', 'hospital', 'bloodbank'],
      default: 'donor',
      index: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    lastDonatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXING STRATEGY
// ==========================================

// 1. Compound Index: Optimized for precise emergency donor matching
userSchema.index({ bloodGroup: 1, state: 1, district: 1, availabilityStatus: 1 });

// 2. Compound Index: Optimized for administrative role filtering
userSchema.index({ role: 1, bloodGroup: 1 });

// Note: Email uniqueness constraint automatically creates an index.

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

userSchema.pre('save', async function () {
  // Prevent re-hashing an already hashed password if the user updates other fields
  if (!this.isModified('password') || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ==========================================
// INSTANCE METHODS
// ==========================================

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
