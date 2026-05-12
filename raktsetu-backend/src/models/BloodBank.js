import mongoose from 'mongoose';

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  bloodGroups: {
    type: Map,
    of: Number,
    default: {},
  },
  address: {
    type: String,
  },
  type: {
    type: String,
  },
  hours: {
    type: String,
  },
}, {
  timestamps: true,
});

bloodBankSchema.index({ state: 1, district: 1 });
bloodBankSchema.index({ bloodGroups: 1 });

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

export default BloodBank;
