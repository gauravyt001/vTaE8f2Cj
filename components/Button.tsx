import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-base sm:text-lg font-medium';
  
  const primaryStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400';
  const secondaryStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:border-gray-600';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      className={`${baseStyles} ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};