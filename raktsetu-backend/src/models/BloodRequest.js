import mongoose from 'mongoose';
import { BLOOD_GROUPS } from '../constants/bloodGroups.js';

const bloodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Supports finding all requests by a specific user
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: BLOOD_GROUPS,
      required: [true, 'Blood group is required'],
    },
    unitsRequired: {
      type: Number,
      required: [true, 'Number of units required is mandatory'],
      min: [1, 'At least 1 unit is required'],
    },
    hospitalName: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
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
    urgencyLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: [true, 'Urgency level is required'],
    },
    requiredBy: {
      type: Date,
      required: [true, 'Required-by date is mandatory'],
    },
    status: {
      type: String,
      enum: ['pending', 'fulfilled', 'cancelled'],
      default: 'pending',
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXING STRATEGY FOR EMERGENCY WORKFLOWS
// ==========================================

// 1. Emergency Geo-Matching Index
// Used to instantly find active, high-urgency requests in a specific district for a specific blood type
bloodRequestSchema.index({ bloodGroup: 1, district: 1, urgencyLevel: 1 });

// 2. Deadline and Status Index
// Used to filter "pending" requests sorted by their imminent deadline (requiredBy)
bloodRequestSchema.index({ status: 1, requiredBy: 1 });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

export default BloodRequest;
