"use client"
import { useState, useEffect, useCallback } from 'react';

// mouse moving effects
export const useParallax = (sensitivity = 0.1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementRect, setElementRect] = useState(null);

  const ref = useCallback(node => {
    if (node !== null) {
      setElementRect(node.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = useCallback(event => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const calculateTransform = () => {
    if (!elementRect) return '';
    
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    
    const moveX = (mousePosition.x - centerX) * sensitivity;
    const moveY = (mousePosition.y - centerY) * sensitivity;
    
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return { ref, style: { transform: calculateTransform() } };
};