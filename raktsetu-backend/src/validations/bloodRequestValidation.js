import { z } from 'zod';
import { BLOOD_GROUPS } from '../constants/bloodGroups.js';

export const createBloodRequestSchema = z.object({
  patientName: z
    .string({ required_error: 'Patient name is required' })
    .trim()
    .min(2, 'Patient name must be at least 2 characters'),
  bloodGroup: z
    .enum(BLOOD_GROUPS, {
      required_error: 'Blood group is required',
      invalid_type_error: 'Invalid blood group provided',
    }),
  unitsRequired: z
    .number({ required_error: 'Units required is mandatory' })
    .min(1, 'At least 1 unit is required')
    .int('Units must be a whole number'),
  hospitalName: z
    .string({ required_error: 'Hospital name is required' })
    .trim()
    .min(3, 'Hospital name must be at least 3 characters'),
  state: z
    .string({ required_error: 'State is required' })
    .trim()
    .min(1, 'State is required'),
  district: z
    .string({ required_error: 'District is required' })
    .trim()
    .min(1, 'District is required'),
  urgencyLevel: z
    .enum(['low', 'medium', 'high', 'critical'], {
      required_error: 'Urgency level is required',
      invalid_type_error: 'Invalid urgency level',
    }),
  requiredBy: z
    .string({ required_error: 'Required by date is mandatory' })
    .refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: 'Invalid date format provided',
    })
    .transform((dateString) => new Date(dateString)),
  additionalNotes: z.string().trim().optional(),
});
