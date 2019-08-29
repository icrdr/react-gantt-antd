import { useEffect } from 'react';

export default function useEvent(event, handler, passive = true, params = []) {
  useEffect(() => {
    window.addEventListener(event, handler, passive)
    return () => window.removeEventListener(event, handler);
  }, params)
}