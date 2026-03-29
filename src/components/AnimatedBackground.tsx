"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const symbols = ['∑', '∫', 'π', '∞', '</>', '{ }', 'ƒ', 'Δ', 'λ', 'θ', '+', '×', '÷', '=', '!', '?', 'α', 'β'];

export function AnimatedBackground() {
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    // We generate the random elements purely on the client after mounting.
    // This perfectly prevents server-client React hydration mismatches!
    const gen = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      duration: 15 + Math.random() * 20, // Long smooth durations
      delay: Math.random() * 5,
      scale: 0.4 + Math.random() * 1.2,
      opacity: 0.02 + Math.random() * 0.08, // Subtle opacity so it's not distracting
      rotate: Math.random() * 360,
      moveX: (Math.random() - 0.5) * 150,
      moveY: (Math.random() - 0.5) * 150,
    }));
    setElements(gen);
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ 
            left: el.left, 
            top: el.top, 
            rotate: el.rotate, 
            scale: el.scale,
            opacity: 0,
            position: 'absolute'
          }}
          animate={{ 
            x: [0, el.moveX, 0],
            y: [0, el.moveY, 0],
            rotate: [el.rotate, el.rotate + 180, el.rotate],
            opacity: [el.opacity, el.opacity * 1.5, el.opacity]
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity, 
            delay: el.delay, 
            ease: "easeInOut" 
          }}
          className="text-emerald-700 dark:text-emerald-300 font-extrabold select-none text-4xl mix-blend-multiply dark:mix-blend-screen"
        >
          {el.symbol}
        </motion.div>
      ))}
    </div>
  );
}
