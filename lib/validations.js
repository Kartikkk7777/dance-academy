import { z } from 'zod';

/**
 * Zod schema for enquiry form validation.
 * 
 * Security notes:
 * - Every field has an explicit max length to prevent storage abuse.
 * - Phone uses a regex pattern to enforce only valid characters.
 * - Email uses Zod's built-in email validation (optional field).
 * - Program is restricted to a known allowlist of values.
 * - All string fields are trimmed before validation.
 * - The entire schema uses .strict() to reject any extra/unexpected fields
 *   (this is our NoSQL-injection defense — only known primitives accepted).
 */

const VALID_PROGRAMS = [
  'Classical Dance',
  'Semi-Classical',
  'Bollywood',
  'Zumba',
  'Yoga',
  'Vocal Music',
  'Guitar',
  'Tabla',
  'Wedding Choreography',
  'Other',
];

export const enquirySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number cannot exceed 20 characters')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),

  email: z
    .string()
    .trim()
    .max(254, 'Email cannot exceed 254 characters')
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),

  program: z
    .string({ required_error: 'Please select a program' })
    .trim()
    .min(1, 'Please select a program')
    .max(100, 'Program cannot exceed 100 characters')
    .refine((val) => VALID_PROGRAMS.includes(val), {
      message: 'Please select a valid program',
    }),

  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(1, 'Message is required')
    .max(2000, 'Message cannot exceed 2000 characters'),

  // Honeypot field — must be empty for legitimate submissions
  botField: z
    .string()
    .max(0, 'Invalid submission')
    .optional()
    .or(z.literal('')),
}).strict(); // .strict() rejects any fields not in this schema

export { VALID_PROGRAMS };
