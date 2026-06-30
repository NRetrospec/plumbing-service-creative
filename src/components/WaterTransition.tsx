import { motion, AnimatePresence } from 'framer-motion';

interface WaterTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function WaterTransition({ isActive, onComplete }: WaterTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onAnimationComplete={() => {
            if (!isActive && onComplete) onComplete();
          }}
        >
          {/* Water vortex layers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{
                clipPath: 'circle(0% at 50% 50%)',
                rotate: 0,
              }}
              animate={{
                clipPath: [
                  'circle(0% at 50% 50%)',
                  'circle(75% at 50% 50%)',
                  'circle(150% at 50% 50%)',
                ],
                rotate: [0, 90 * (i % 2 === 0 ? 1 : -1), 180 * (i % 2 === 0 ? 1 : -1)],
              }}
              exit={{
                clipPath: 'circle(0% at 50% 50%)',
                rotate: 360,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: `radial-gradient(ellipse at ${50 + i * 5}% ${50 - i * 3}%, 
                  rgba(6, 182, 212, ${0.95 - i * 0.15}) 0%, 
                  rgba(10, 22, 40, ${0.98 - i * 0.1}) ${40 + i * 10}%, 
                  rgba(2, 6, 23, ${0.99 - i * 0.05}) 100%)`,
              }}
            />
          ))}
          
          {/* Swirling water particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                background: `rgba(${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${230 + Math.random() * 25}, ${0.3 + Math.random() * 0.5})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1,
                delay: 0.1 + i * 0.03,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Center vortex glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 3, 0],
              opacity: [0, 0.5, 0],
              rotate: [0, 720],
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-aqua-500/30 via-teal-glow/20 to-cyan-glow/30 blur-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
