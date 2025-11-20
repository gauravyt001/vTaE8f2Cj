import React from 'react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface AboutUsProps {
  navigateTo: (page: 'generator' | 'about') => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ navigateTo }) => {
  const { theme } = useTheme();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-subtle dark:shadow-subtle-dark max-w-lg w-full transform transition-all duration-300 hover:shadow-xl dark:hover:shadow-subtle-dark animate-fade-in relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        About Classic Password Generator
      </h1>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-2"></div> {/* Subtle separator */}

      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8">
        <p>
          This Classic Password Generator is designed for simplicity and ease of use, providing a clean interface for generating strong, custom passwords. It now includes a password strength indicator to help users create more robust passwords.
        </p>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Developer</h2>
          <p>Name: Gaurav</p>
          <p>
            Instagram: <a href="https://www.instagram.com/gauravyt_" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">@gauravyt_</a>
          </p>
        </div>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Copyright & Disclaimer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            &copy; {new Date().getFullYear()} Gaurav. All rights reserved.
            This application is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.
            The developer assumes no responsibility for errors or omissions in the contents of the Service.
            In no event shall the developer be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={() => navigateTo('generator')} className="w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Generator
        </Button>
      </div>
    </div>
  );
};