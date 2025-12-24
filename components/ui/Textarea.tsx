import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, icon, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${props.name}`;
    const hasError = !!error;
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            {label}
            {props.required && <span className="text-amber-600 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-4 text-gray-400">
              {icon}
            </div>
          )}
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'w-full rounded-xl border-2 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60',
              'bg-white shadow-sm resize-y min-h-[120px]',
              icon ? 'pl-12' : 'pl-4',
              hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 hover:border-gray-400',
              className
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              error || helperText
                ? `${textareaId}-${error ? 'error' : 'helper'}`
                : undefined
            }
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-2 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${textareaId}-helper`}
            className="mt-2 text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
