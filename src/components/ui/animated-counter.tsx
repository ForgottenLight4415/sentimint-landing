"use client";

import { useEffect, useRef, useState } from 'react';

interface CountingAnimationProps {
  target: number;
  duration?: number;
  startOnMount?: boolean;
  formatter?: (value: number) => string;
  className?: string;
  onComplete?: () => void;
}

export function CountingAnimation({
  target,
  duration = 2000,
  startOnMount = true,
  formatter = (value) => Math.round(value).toString(),
  className = "",
  onComplete
}: CountingAnimationProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const hasCompletedRef = useRef(false);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const newValue = easedProgress * target;

    setCurrent(newValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setCurrent(0);
    setIsAnimating(true);
    hasCompletedRef.current = false;
    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrent(0);
    setIsAnimating(false);
    hasCompletedRef.current = false;
    startTimeRef.current = undefined;
  };

  useEffect(() => {
    if (startOnMount && target > 0) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [target, startOnMount]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <span 
      className={`inline-block tabular-nums font-medium transition-all duration-200 ${className}`}
      style={{
        transform: isAnimating ? 'scale(1.05)' : 'scale(1)',
        filter: isAnimating ? 'brightness(1.1)' : 'brightness(1)'
      }}
    >
      {formatter(current)}
    </span>
  );
}

export default CountingAnimation;