import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const otpVerificationSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    index: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Document automatically deletes after 10 minutes (600 seconds)
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  attempts: {
    type: Number,
    default: 0,
  }
});

// Hash OTP before saving
otpVerificationSchema.pre('save', async function () {
  if (!this.isModified('otpHash')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(this.otpHash, salt);
});

// Compare plaintext OTP with hash
otpVerificationSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otpHash);
};

const OtpVerification = mongoose.model('OtpVerification', otpVerificationSchema);

export default OtpVerification;
