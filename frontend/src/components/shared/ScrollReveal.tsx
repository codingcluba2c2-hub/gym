import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  initialScale?: number; // default 0.93
  initialY?: number; // px, default 40
  threshold?: number; // 0 to 1, default 0.08
}

/**
 * ScrollReveal: Premium enterprise-grade scroll animation wrapper.
 * When scrolled outside of view: opacity 0, scale 0.93, translateY 40px, subtle blur.
 * When scrolled into view: smoothly unfolds with full opacity, scale(1), clear focus.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 850,
  initialScale = 0.93,
  initialY = 40,
  threshold = 0.08,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'scale(1) translateY(0px)'
          : `scale(${initialScale}) translateY(${initialY}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
