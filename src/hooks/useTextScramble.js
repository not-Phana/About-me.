import { useState, useCallback, useRef } from 'react';

const GLYPHS = 'ΓΔΘΛΞΠΣΦΨΩ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ◈⎈⌥⌘';

/**
 * useTextScramble Hook
 * Produces high-tech kinetic decryption text scramble effect on hover or trigger.
 */
export function useTextScramble(originalText) {
  const [displayText, setDisplayText] = useState(originalText);
  const frameRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = originalText.length * 2.5;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const update = () => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2.5) {
              return originalText[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration < maxIterations) {
        iteration += 1;
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(originalText);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [originalText]);

  return { displayText, scramble };
}
