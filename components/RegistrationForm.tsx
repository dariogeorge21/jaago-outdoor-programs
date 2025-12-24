'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createBrowserClient } from '@/lib/supabase';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateState,
  validateQuestions,
} from '@/lib/utils';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

interface RegistrationFormProps {
  eventName: string;
  eventSlug: string;
  tableName: string;
}

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  state: string;
  questions: string;
}

export function RegistrationForm({
  eventName,
  eventSlug,
  tableName,
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.from(tableName).insert([
        {
          full_name: data.full_name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim().toLowerCase(),
          state: data.state.trim(),
          questions: data.questions?.trim() || '',
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success('Registration successful!', {
        description: `Thank you for registering for ${eventName}. We look forward to seeing you!`,
        duration: 5000,
      });
      reset();
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description:
          error.message ||
          'Something went wrong. Please try again or contact support.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Secure Registration
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Register for {eventName}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please fill out the form below to complete your registration.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 space-y-6 animate-scale-in"
        noValidate
      >
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Personal Information
            </h3>
            <p className="text-sm text-gray-500">
              Please provide your contact details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              {...register('full_name', {
                required: 'Please enter your full name',
                validate: (value) =>
                  validateFullName(value) || 'Please enter a valid full name',
                onBlur: () => trigger('full_name'),
              })}
              error={errors.full_name?.message}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="1234567890"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              {...register('phone', {
                required: 'Please enter a valid phone number',
                validate: (value) =>
                  validatePhone(value) || 'Please enter exactly 10 digits',
                onBlur: () => trigger('phone'),
              })}
              error={errors.phone?.message}
              helperText="Enter 10 digits (e.g., 1234567890)"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              {...register('email', {
                required: 'Please enter a valid email address',
                validate: (value) =>
                  validateEmail(value) || 'Please enter a valid email address',
                onBlur: () => trigger('email'),
              })}
              error={errors.email?.message}
              required
            />

            <Input
              label="State"
              placeholder="Enter your state"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              {...register('state', {
                required: 'Please enter your state',
                validate: (value) =>
                  validateState(value) || 'Please enter your state',
                onBlur: () => trigger('state'),
              })}
              error={errors.state?.message}
              required
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Questions or Topics <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>
            <p className="text-sm text-gray-500">
              Share any questions, doubts, or topics you'd like to discuss
            </p>
          </div>

          <Textarea
            label=""
            placeholder="Share any questions, doubts, or topics you'd like to discuss with the Bishop... (Optional)"
            rows={6}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            }
            {...register('questions', {
              validate: (value) => {
                if (!value || value.trim().length === 0) {
                  return true; // Optional field, empty is valid
                }
                return (
                  validateQuestions(value) ||
                  'If provided, please share at least 10 characters'
                );
              },
              onBlur: () => trigger('questions'),
            })}
            error={errors.questions?.message}
            helperText="Optional - Share any questions or topics you'd like to discuss"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            size="lg"
            className="w-full"
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Complete Registration
              </>
            )}
          </Button>
          <p className="mt-4 text-sm text-center text-gray-500">
            By submitting this form, you agree to our terms and conditions.
          </p>
        </div>
      </form>
    </div>
  );
}
