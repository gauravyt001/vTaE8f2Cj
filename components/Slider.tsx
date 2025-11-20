import React from 'react';

interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ id, label, min, max, value, onChange, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-gray-700 mb-2 text-base sm:text-lg font-medium dark:text-gray-300">
        {label}: <span className="font-semibold text-blue-700 dark:text-blue-400">{value}</span>
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-600 dark:accent-blue-500"
      />
    </div>
  );
};