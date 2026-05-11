import { z } from 'zod';
import { BLOOD_GROUPS } from '../constants/bloodGroups.js';

/**
 * Validation schema for new user registration
 */
export const registerSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name cannot exceed 100 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'),
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
});

/**
 * Validation schema for user login
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password cannot be empty'),
});
