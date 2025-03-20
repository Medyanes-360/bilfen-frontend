"use client"
import { useParallax } from '@/hooks/useParallax';
import React from 'react';

// for mouse moving effects
export const Parallax = ({
  children,
  sensitivity = 0.1,
  className = '',
  rotate = 0,
  ...props
}) => {
  const { ref, style } = useParallax(sensitivity);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        rotate: `${rotate}deg`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
      }}
      className={`parallax-element ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};