import { useState, useEffect } from 'react'

/**
 * Custom hook to track mouse position for interactive effects
 * Returns an object with x and y coordinates (0-1 range for percentage-based positioning)
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 }); // Default to center

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert to 0-1 range for CSS variable usage
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}