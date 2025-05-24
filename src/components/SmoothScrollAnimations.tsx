
import React, { useEffect, useRef } from 'react';

interface SmoothScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
  delay?: number;
}

const SmoothScrollAnimations: React.FC<SmoothScrollAnimationsProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'scroll-fade-up';
      case 'fade-in':
        return 'scroll-fade-in';
      case 'slide-left':
        return 'scroll-slide-left';
      case 'slide-right':
        return 'scroll-slide-right';
      case 'scale-up':
        return 'scroll-scale-up';
      default:
        return 'scroll-fade-up';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default SmoothScrollAnimations;
