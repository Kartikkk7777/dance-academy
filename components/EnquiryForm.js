"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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

function EnquiryFormContent() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams ? searchParams.get("program") || "" : "";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
    botField: '', // Honeypot — hidden from users
  });

  useEffect(() => {
    if (initialProgram && VALID_PROGRAMS.includes(initialProgram)) {
      setFormData((prev) => ({ ...prev, program: initialProgram }));
    }
  }, [initialProgram]);

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const mapped = {};
          data.errors.forEach((err) => {
            if (err.field) mapped[err.field] = err.message;
          });
          setFieldErrors(mapped);
        }
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', program: '', message: '', botField: '' });
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center">
        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your enquiry has been submitted successfully. We will get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-primary font-semibold hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-primary mb-6">Send an Enquiry</h2>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot — visually hidden */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="botField">Do not fill this field</label>
          <input
            type="text"
            id="botField"
            name="botField"
            value={formData.botField}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            className={`w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent ${fieldErrors.name ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Your name"
            required
          />
          {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={20}
            className={`w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent ${fieldErrors.phone ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Your phone number"
            required
          />
          {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={254}
            className={`w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent ${fieldErrors.email ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="Your email address"
          />
          {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-program" className="block text-sm font-medium text-gray-700 mb-1">
            Program of Interest <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent ${fieldErrors.program ? 'border-red-400' : 'border-gray-300'}`}
            required
          >
            <option value="">Select a program</option>
            {VALID_PROGRAMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {fieldErrors.program && <p className="text-red-500 text-xs mt-1">{fieldErrors.program}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            maxLength={2000}
            className={`w-full px-4 py-2 border rounded-md focus:ring-accent focus:border-accent ${fieldErrors.message ? 'border-red-400' : 'border-gray-300'}`}
            placeholder="How can we help you?"
            required
          ></textarea>
          {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
        </div>

        <p className="text-xs text-gray-500">
          By submitting this form, you agree to our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary text-cream py-3 px-4 rounded-md font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Enquiry'
          )}
        </button>
      </form>
    </div>
  );
}

export default function EnquiryForm() {
  return (
    <Suspense fallback={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Loading form...</div>}>
      <EnquiryFormContent />
    </Suspense>
  );
}
