
import { useState, useEffect, useCallback } from 'react';

interface UseCopyToClipboardResult {
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  toastMessage: string | null;
}

export const useCopyToClipboard = (): UseCopyToClipboardResult => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available. Manual copy required.');
      setToastMessage('Clipboard not supported. Please copy manually.');
      setIsCopied(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setToastMessage('Password copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
      setToastMessage('Failed to copy password.');
      setIsCopied(false);
    }
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (isCopied || toastMessage) {
      timer = window.setTimeout(() => {
        setIsCopied(false);
        setToastMessage(null);
      }, 2000); // Hide toast after 2 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isCopied, toastMessage]);

  return { copyToClipboard, isCopied, toastMessage };
};