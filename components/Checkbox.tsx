import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 rounded-sm border-gray-300 focus:ring-blue-500 cursor-pointer dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600 dark:checked:border-transparent"
      />
      <label htmlFor={id} className="text-gray-700 select-none cursor-pointer text-base sm:text-lg dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};