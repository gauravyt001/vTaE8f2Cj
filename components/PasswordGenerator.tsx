import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Slider } from './Slider';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

// Define character sets as constants outside the component to prevent re-creation on re-renders
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

interface PasswordGeneratorProps {
  navigateTo: (page: 'generator' | 'about') => void;
}

// Function to calculate password strength
const getPasswordStrength = (password: string): { level: string; color: string } => {
  if (!password || password.length === 0) {
    return { level: 'No Password', color: 'bg-gray-400' };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) score++;

  if (score < 3) {
    return { level: 'Weak', color: 'bg-red-500' };
  } else if (score < 5) {
    return { level: 'Medium', color: 'bg-yellow-500' };
  } else if (score < 7) {
    return { level: 'Strong', color: 'bg-green-500' };
  } else {
    return { level: 'Very Strong', color: 'bg-blue-600' };
  }
};

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ navigateTo }) => {
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [includeLetters, setIncludeLetters] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  const { copyToClipboard, toastMessage } = useCopyToClipboard();
  const { theme } = useTheme();

  const handleLengthChange = (value: number) => {
    // Ensure value stays within bounds [4, 32]
    const clampedValue = Math.max(4, Math.min(32, value));
    setPasswordLength(clampedValue);
  };

  const generatePassword = useCallback(() => {
    let allAvailableChars = '';
    let guaranteedChars: string[] = [];

    // Prioritize at least one char of each selected type
    if (includeLetters) {
      allAvailableChars += LOWERCASE_CHARS + UPPERCASE_CHARS;
      guaranteedChars.push(
        (LOWERCASE_CHARS + UPPERCASE_CHARS)[Math.floor(Math.random() * (LOWERCASE_CHARS + UPPERCASE_CHARS).length)]
      );
    }
    if (includeNumbers) {
      allAvailableChars += NUMBER_CHARS;
      guaranteedChars.push(
        NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)],
      );
    }
    if (includeSymbols) {
      allAvailableChars += SYMBOL_CHARS;
      guaranteedChars.push(
        SYMBOL_CHARS[Math.floor(Math.random() * SYMBOL_CHARS.length)],
      );
    }

    if (allAvailableChars.length === 0) {
      setGeneratedPassword('Select at least one character type.');
      return;
    }
    
    // Ensure guaranteed characters don't exceed password length
    const effectiveGuaranteedChars = guaranteedChars.slice(0, passwordLength);

    let password: string[] = [...effectiveGuaranteedChars];
    
    // Fill the rest of the password length with random characters from allAvailableChars
    const remainingLength = passwordLength - password.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * allAvailableChars.length);
      password.push(allAvailableChars[randomIndex]);
    }

    // Shuffle the array to randomize the position of guaranteed characters
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    setGeneratedPassword(password.join(''));
  }, [passwordLength, includeLetters, includeNumbers, includeSymbols]);

  // Generate password on initial mount and whenever dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]); // Depend on generatePassword memoized callback

  const handleCopyClick = () => {
    if (generatedPassword && generatedPassword !== 'Select at least one character type.') {
      copyToClipboard(generatedPassword);
    }
  };

  const { level: strengthLevel, color: strengthColor } = getPasswordStrength(generatedPassword);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-subtle dark:shadow-subtle-dark max-w-lg w-full transform transition-all duration-300 hover:shadow-xl dark:hover:shadow-subtle-dark animate-fade-in relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        Generate Password
      </h1>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 pb-2"></div> {/* Subtle separator */}

      <div className="space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-grow">
            <Slider
              id="passwordLengthSlider"
              label="Password Length"
              min={4}
              max={32}
              value={passwordLength}
              onChange={handleLengthChange}
            />
          </div>
          <input
            type="number"
            id="passwordLengthNumber"
            min={4}
            max={32}
            value={passwordLength}
            onChange={(e) => handleLengthChange(Number(e.target.value))}
            onBlur={(e) => { // Ensure value snaps to min/max on blur
              const val = Number(e.target.value);
              if (val < 4) handleLengthChange(4);
              if (val > 32) handleLengthChange(32);
            }}
            className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 mx-auto sm:mx-0"
            aria-label="Password length number input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Checkbox
            id="includeLetters"
            label="Letters (A-Z, a-z)"
            checked={includeLetters}
            onChange={setIncludeLetters}
          />
          <Checkbox
            id="includeNumbers"
            label="Numbers (0-9)"
            checked={includeNumbers}
            onChange={setIncludeNumbers}
          />
          <Checkbox
            id="includeSymbols"
            label="Symbols (!@#$...)"
            checked={includeSymbols}
            onChange={setIncludeSymbols}
          />
        </div>
      </div>

      <div className="mb-8 relative">
        <input
          type="text"
          readOnly
          value={generatedPassword}
          className="w-full p-3 sm:p-4 text-center text-xl sm:text-2xl font-mono border-2 border-gray-300 rounded-md bg-gray-50 text-gray-800 select-all cursor-text focus:outline-none focus:border-blue-500 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 break-words"
          placeholder="Your new password"
          aria-live="assertive"
          aria-label="Generated password"
        />
        {/* Password Strength Indicator */}
        <div className="mt-3 flex items-center justify-center space-x-2 text-lg dark:text-gray-300">
          <span className="font-medium text-gray-700 dark:text-gray-300">Strength:</span>
          <div className="w-32 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div className={`h-full ${strengthColor}`} style={{ width: '100%' }}></div>
          </div>
          <span className={`font-semibold ${strengthColor.replace('bg-', 'text-')}`}>{strengthLevel}</span>
        </div>

        {toastMessage && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-3 py-1 rounded shadow-lg animate-fade-in-up whitespace-nowrap dark:bg-blue-400 dark:text-blue-900 flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l-4-4-4 4"/>
            </svg>
            {toastMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <Button onClick={generatePassword} className="w-full sm:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12V8a8.001 8.001 0 0015.356-2.004M4 20v-5h.582m15.356 2A8.001 8.001 0 014 12v4a8.001 8.001 0 0115.356 2.004" />
          </svg>
          Regenerate
        </Button>
        <Button onClick={handleCopyClick} className="w-full sm:w-auto" variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 7h-2.5a2 2 0 00-2 2v2m0 0h.01M12 11h.01M16 12a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
          Copy Password
        </Button>
        <Button onClick={() => navigateTo('about')} className="w-full sm:w-auto" variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          About
        </Button>
      </div>
    </div>
  );
};