'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createBrowserClient } from '@/lib/supabase';
import { RegistrationData } from '@/types/registration';
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
          questions: data.questions.trim(),
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success('Registration successful!', {
        description: `Thank you for registering for ${eventName}. We look forward to seeing you!`,
      });
      reset();
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description:
          error.message ||
          'Something went wrong. Please try again or contact support.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto space-y-6"
      noValidate
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Register for {eventName}
        </h2>
        <p className="text-gray-600 mb-6">
          Please fill out the form below to complete your registration.
        </p>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register('full_name', {
            required: 'Please enter your full name',
            validate: (value) =>
              validateFullName(value) || 'Please enter a valid full name',
            onBlur: () => trigger('full_name'),
          })}
          error={errors.full_name?.message}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 12345 67890"
          {...register('phone', {
            required: 'Please enter a valid phone number',
            validate: (value) =>
              validatePhone(value) || 'Please enter a valid phone number',
            onBlur: () => trigger('phone'),
          })}
          error={errors.phone?.message}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          {...register('email', {
            required: 'Please enter a valid email address',
            validate: (value) =>
              validateEmail(value) || 'Please enter a valid email address',
            onBlur: () => trigger('email'),
          })}
          error={errors.email?.message}
        />

        <Input
          label="State"
          placeholder="Enter your state"
          {...register('state', {
            required: 'Please enter your state',
            validate: (value) =>
              validateState(value) || 'Please enter your state',
            onBlur: () => trigger('state'),
          })}
          error={errors.state?.message}
        />

        <Textarea
          label="Questions or Topics"
          placeholder="Share any questions, doubts, or topics you'd like to discuss with the Bishop"
          rows={5}
          {...register('questions', {
            required: 'Please share at least one question or topic',
            validate: (value) =>
              validateQuestions(value) ||
              'Please share at least one question or topic (minimum 10 characters)',
            onBlur: () => trigger('questions'),
          })}
          error={errors.questions?.message}
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
        >
          Complete Registration
        </Button>
      </div>
    </form>
  );
}

