'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../app/context/themeContext';

// Custom CSS-based cursor implementation without Framer Motion
export const CustomCursor = () => {
  const { cursorType, isDarkMode } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const isVisible = useRef(true);
  const isPointer = useRef(false);
  const isClicking = useRef(false);
  const [mounted, setMounted] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const rotateRef = useRef(0);
  
  // Only track trails for gradient cursor
  const MAX_TRAIL_POINTS = 5;
  const cursorTrailPositions = useRef<{x: number, y: number}[]>([]);
  
  // Initialize trail refs
  useEffect(() => {
    trailRefs.current = Array(MAX_TRAIL_POINTS).fill(null).map(() => React.createRef<HTMLDivElement>().current!);
    return () => {
      trailRefs.current = [];
    };
  }, []);
  
  // Animation loop with requestAnimationFrame for smooth movement
  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;
    
    if (cursorType === 'gradient') {
      // Update rotation for gradient cursor
      rotateRef.current = (rotateRef.current + deltaTime * 0.05) % 360;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${rotateRef.current}deg)`;
      }
      
      // Update trail elements
      cursorTrailPositions.current.forEach((pos, i) => {
        const trail = trailRefs.current[i];
        if (trail) {
          trail.style.left = `${pos.x}px`;
          trail.style.top = `${pos.y}px`;
          trail.style.opacity = `${0.4 - i * 0.07}`;
          trail.style.width = `${15 - i * 2}px`;
          trail.style.height = `${15 - i * 2}px`;
        }
      });
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };

  // Setup animation loop
  useEffect(() => {
    if (!mounted) return;
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mounted, cursorType]);

  // Cursor and document setup
  useEffect(() => {
    // Skip if SSR
    if (typeof document === 'undefined') return;
    
    setMounted(true);
    
    // Configure document for custom cursor
    if (cursorType === 'default') {
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.add('cursor-default');
      document.body.style.cursor = 'auto';
    } else {
      document.documentElement.classList.add('custom-cursor-active');
      document.body.classList.remove('cursor-default');
      document.body.style.cursor = 'none';
    }
    
    // Basic cursor position tracking
    const updatePosition = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      // Direct position update
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
      
      // Update pointer state
      try {
        const target = e.target as HTMLElement;
        if (!target) return;
        
        const newIsPointer = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        // Only update classes when state changes
        if (newIsPointer !== isPointer.current) {
          isPointer.current = newIsPointer;
          updateCursorClasses();
        }
      } catch (err) {
        isPointer.current = false;
        updateCursorClasses();
      }
      
      // Update trail positions for gradient cursor
      if (cursorType === 'gradient') {
        const newPosition = { x: e.clientX, y: e.clientY };
        
        if (cursorTrailPositions.current.length === 0 || 
            // Only add new point if moved more than 5px
            Math.hypot(
              cursorTrailPositions.current[0]?.x - newPosition.x, 
              cursorTrailPositions.current[0]?.y - newPosition.y
            ) > 5) {
          cursorTrailPositions.current = 
            [newPosition, ...cursorTrailPositions.current.slice(0, MAX_TRAIL_POINTS - 1)];
        }
      }
    };
    
    // Visibility and click handling
    const handleMouseDown = () => {
      isClicking.current = true;
      updateCursorClasses();
    };
    
    const handleMouseUp = () => {
      isClicking.current = false;
      updateCursorClasses();
    };
    
    const handleMouseEnter = () => {
      isVisible.current = true;
      if (cursorRef.current) {
        cursorRef.current.classList.remove('opacity-0');
        cursorRef.current.classList.add('opacity-100');
      }
    };
    
    const handleMouseLeave = () => {
      isVisible.current = false;
      if (cursorRef.current) {
        cursorRef.current.classList.remove('opacity-100');
        cursorRef.current.classList.add('opacity-0');
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Clean up
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
      document.body.classList.add('cursor-default');
      document.body.style.cursor = 'auto';
    };
  }, [cursorType]);
  
  // Helper to update cursor classes based on state
  const updateCursorClasses = () => {
    if (!cursorRef.current) return;
    
    // Update pointer state
    if (isPointer.current) {
      cursorRef.current.classList.add('cursor-pointer');
    } else {
      cursorRef.current.classList.remove('cursor-pointer');
    }
    
    // Update clicking state
    if (isClicking.current) {
      cursorRef.current.classList.add('cursor-clicking');
    } else {
      cursorRef.current.classList.remove('cursor-clicking');
    }
  };

  // Don't render on mobile
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  if (cursorType === 'default') {
    return null;
  }
  
  return (
    <>
      {/* Main cursor element */}
      <div 
        ref={cursorRef}
        className={`
          fixed pointer-events-none z-[9999] transition-opacity duration-150
          cursor-${cursorType} ${isDarkMode ? 'dark' : ''} ${isVisible.current ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor trails for gradient type */}
      {cursorType === 'gradient' && Array.from({ length: MAX_TRAIL_POINTS }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed pointer-events-none z-[9998] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30"
          style={{
            left: 0,
            top: 0,
            width: 15 - i * 2,
            height: 15 - i * 2,
            filter: 'blur(2px)',
            opacity: 0.4 - i * 0.07,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Inject required cursor styles */}
      <style jsx global>{`
        /* Base cursor styles */
        .cursor-pulse, .cursor-ring, .cursor-dot, .cursor-gradient {
          transition: opacity 0.15s ease;
          will-change: transform;
        }

        /* Pulse cursor */
        .cursor-pulse {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgb(192, 132, 252)' : 'rgb(147, 51, 234)'};
          opacity: 0.6;
          box-shadow: 0 0 0 0 ${isDarkMode ? 'rgba(192, 132, 252, 0.6)' : 'rgba(147, 51, 234, 0.6)'};
          animation: pulse-animation 2s infinite;
        }
        .cursor-pulse::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid ${isDarkMode ? 'rgb(192, 132, 252)' : 'rgb(147, 51, 234)'};
          opacity: 0.2;
          animation: pulse-ring 1.5s infinite ease-in-out;
        }
        .cursor-pulse.cursor-pointer {
          width: 30px;
          height: 30px;
          opacity: 0.8;
          mix-blend-mode: difference;
        }
        .cursor-pulse.cursor-clicking {
          transform: translate(-50%, -50%) scale(0.8);
        }
        .cursor-pulse.cursor-clicking::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'rgb(192, 132, 252)' : 'rgb(147, 51, 234)'};
          animation: click-pulse 0.5s 1 ease-out;
        }

        /* Ring cursor */
        .cursor-ring {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid ${isDarkMode ? 'white' : 'rgb(147, 51, 234)'};
          opacity: 0.8;
        }
        .cursor-ring.cursor-pointer {
          opacity: 1;
          animation: ring-rotation 3s infinite linear;
          mix-blend-mode: difference;
        }
        .cursor-ring.cursor-pointer::after {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'white' : 'rgb(147, 51, 234)'};
          mix-blend-mode: difference;
        }
        .cursor-ring.cursor-clicking {
          transform: translate(-50%, -50%) scale(0.8);
          border-width: 3px;
        }
        .cursor-ring.cursor-clicking::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid ${isDarkMode ? 'white' : 'rgb(147, 51, 234)'};
          animation: click-ring 0.4s 1 ease-out;
        }

        /* Dot cursor */
        .cursor-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${isDarkMode ? 'white' : 'rgb(147, 51, 234)'};
        }
        .cursor-dot.cursor-pointer {
          width: 16px;
          height: 16px;
          box-shadow: 0 0 10px 2px ${isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(124, 58, 237, 0.4)'};
          mix-blend-mode: difference;
        }
        .cursor-dot.cursor-clicking {
          transform: translate(-50%, -50%) scale(0.5);
        }
        .cursor-dot.cursor-clicking::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          animation: dot-particles 0.4s ease-out;
        }

        /* Gradient cursor */
        .cursor-gradient {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #3b82f6);
          opacity: 0.8;
          filter: blur(3px);
        }
        .cursor-gradient.cursor-pointer {
          width: 30px;
          height: 30px;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6);
          mix-blend-mode: difference;
        }
        .cursor-gradient.cursor-pointer::after {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
        }
        .cursor-gradient.cursor-clicking {
          transform: translate(-50%, -50%) scale(0.8);
        }
        
        /* Animations */
        @keyframes pulse-animation {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.2; }
          50% { opacity: 0; }
          100% { transform: scale(1.2); opacity: 0.2; }
        }
        
        @keyframes ring-rotation {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes click-pulse {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes click-ring {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes dot-particles {
          0% { 
            box-shadow: 
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'},
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'},
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'},
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'},
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'},
              0 0 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(147, 51, 234, 0.7)'};
            opacity: 0.7;
          }
          100% { 
            box-shadow: 
              0 20px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'},
              17.3px 10px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'},
              10px -17.3px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'},
              -10px -17.3px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'},
              -17.3px 10px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'},
              0 -20px 0 0 ${isDarkMode ? 'rgba(255, 255, 255, 0)' : 'rgba(147, 51, 234, 0)'};
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}; 