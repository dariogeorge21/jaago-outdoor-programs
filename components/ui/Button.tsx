import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  size = 'md',
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95';
  
  const sizeStyles = {
    sm: 'min-h-[36px] px-4 py-2 text-sm',
    md: 'min-h-[44px] px-6 py-3 text-base',
    lg: 'min-h-[52px] px-8 py-4 text-lg',
  };
  
  const variants = {
    primary:
      'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30 hover:from-amber-700 hover:to-amber-600 hover:shadow-xl hover:shadow-amber-600/40 hover:scale-105 focus:ring-amber-500',
    secondary:
      'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:to-teal-600 hover:shadow-xl hover:shadow-teal-600/40 hover:scale-105 focus:ring-teal-500',
    outline:
      'border-2 border-amber-600 text-amber-700 bg-white hover:bg-amber-50 hover:border-amber-700 hover:text-amber-800 hover:scale-105 focus:ring-amber-500 shadow-sm',
    ghost:
      'text-amber-700 hover:bg-amber-50 hover:text-amber-800 focus:ring-amber-500',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
