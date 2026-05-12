import { z } from 'zod';
import { BLOOD_GROUPS } from '../constants/bloodGroups.js';

const phoneRegex = /^[0-9]{10}$/;

export const sendOtpSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Please provide a valid 10-digit phone number'),
});

export const verifyOtpSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Please provide a valid 10-digit phone number'),
  otp: z
    .string({ required_error: 'OTP is required' })
    .trim()
    .length(6, 'OTP must be 6 digits'),
});

export const completeProfileSchema = z.object({
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Please provide a valid 10-digit phone number'),
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name cannot exceed 100 characters'),
  state: z
    .string({ required_error: 'State is required' })
    .trim()
    .min(1, 'State is required'),
  district: z
    .string({ required_error: 'District is required' })
    .trim()
    .min(1, 'District is required'),
  bloodGroup: z
    .enum(BLOOD_GROUPS, {
      invalid_type_error: 'Invalid blood group provided',
    })
    .optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});
