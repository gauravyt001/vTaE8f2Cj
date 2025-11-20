import React, { useState } from 'react';
import { PasswordGenerator } from './components/PasswordGenerator';
import { AboutUs } from './components/AboutUs';
import { ThemeProvider } from './context/ThemeContext';

type Page = 'generator' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('generator');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {currentPage === 'generator' ? (
          <PasswordGenerator key="generator" navigateTo={navigateTo} />
        ) : (
          <AboutUs key="about" navigateTo={navigateTo} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;