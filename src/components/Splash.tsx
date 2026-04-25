import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="text-6xl font-display font-bold tracking-tighter text-white flex items-center">
          <span className="text-blue-500">AS</span>
          <motion.div
            animate={{ width: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-12 ml-1 bg-blue-500"
          />
        </div>
        <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
      </motion.div>

      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 glow"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400"
      >
        Initializing Portfolio Subsystems
      </motion.div>
    </motion.div>
  );
}
