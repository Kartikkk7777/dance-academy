import { Resend } from 'resend';
import { escapeHtml } from '@/lib/sanitize';

// Resend client is initialized dynamically inside the send function to prevent build-time errors when the API key is not configured.

/**
 * Sends an email notification for a new enquiry.
 * All user-supplied values are HTML-escaped before insertion into the template.
 * The template uses only safe string interpolation — no raw HTML injection possible.
 *
 * @param {Object} enquiry - The sanitized enquiry data.
 * @param {string} enquiry.name
 * @param {string} enquiry.phone
 * @param {string} [enquiry.email]
 * @param {string} enquiry.program
 * @param {string} enquiry.message
 */
export async function sendEnquiryNotification(enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('Warning: RESEND_API_KEY is not defined. Skipping email notification.');
    return;
  }

  const resend = new Resend(apiKey);

  // Double-escape as defense-in-depth: input was already escaped before DB save,
  // but we escape again here for the email template to be absolutely safe.
  const safeName = escapeHtml(enquiry.name);
  const safePhone = escapeHtml(enquiry.phone);
  const safeEmail = escapeHtml(enquiry.email || 'Not provided');
  const safeProgram = escapeHtml(enquiry.program);
  const safeMessage = escapeHtml(enquiry.message);

  const textBody = [
    'New Enquiry Received',
    '====================',
    '',
    `Name: ${safeName}`,
    `Phone: ${safePhone}`,
    `Email: ${safeEmail}`,
    `Program: ${safeProgram}`,
    '',
    'Message:',
    safeMessage,
    '',
    '---',
    'This is an automated notification from the Shivangikam website.',
  ].join('\n');

  // Using plain text email to avoid any HTML injection risk entirely.
  // If HTML email is desired later, use a React email template component
  // where user data is passed as props (auto-escaped by React).
  await resend.emails.send({
    from: 'Shivangikam Website <onboarding@resend.dev>',
    to: 'shivangikamkalakendra@gmail.com',
    subject: `New Enquiry: ${safeName} — ${safeProgram}`,
    text: textBody,
  });
}
