import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// const namePool = [
//   'Afsal', 'Ashutosh', 'Chitranshu', 'Derangula Suresh', 'Ezra', 'Harsh',
//   'Kaliappan', 'Navin', 'Omprakash', 'Pranay', 'Riyaz', 'Sabari',
//   'Sai Bharath', 'Santhosh', 'Saran', 'Senthil', 'Shivam', 'Sriram',
//   'Stuti', 'Vinoth'
// ];

const namePool = [
  'Ashutosh', 'Suresh', 'Ezra', 'Omprakash', 'Afsal'
];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [showWinners, setShowWinners] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const selectRandomWinners = (): string[] => {
    const shuffled = [...namePool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  };

  const playSpinSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playCelebrationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const createConfetti = () => {
    const colors = ['#00C896', '#ffffff', '#ffd700', '#ff6b6b', '#4ecdc4'];
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2
      });
    }
    
    setConfetti(newConfetti);
    
    // Clear confetti after 5 seconds
    setTimeout(() => setConfetti([]), 5000);
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowWinners(false);
    playSpinSound();

    // Select winners
    const selectedWinners = selectRandomWinners();
    setWinners(selectedWinners);

    // Show winners after 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setShowWinners(true);
      createConfetti();
      playCelebrationSound();
    }, 3000);
  };

  const resetGame = () => {
    setShowWinners(false);
    setWinners([]);
    setConfetti([]);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 grid-background z-0" />
      
      {/* Bottom Neon Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bottom-glow z-0" />

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="fixed w-2 h-2 z-50 pointer-events-none"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotate: 720, 
              opacity: 0 
            }}
            transition={{ 
              duration: piece.duration, 
              delay: piece.delay,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <motion.h1 
          className="text-xl font-light text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fun Friday 🎉
        </motion.h1>
        

      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20 relative z-10">
        {/* Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl xl:text-[5rem] font-light text-white tracking-tight leading-none mb-6">
            Next Fun Friday<br />
            <span className="neon-text-glow" style={{ color: 'var(--neon-green)' }}>
              Board Leaders
            </span>
          </h1>
          <p className="text-base font-normal text-gray-300 max-w-2xl mx-auto">
            Click on the button to find next week board leaders.
          </p>
        </motion.div>

        {/* Spin Button */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateX: -5,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{ perspective: 1000 }}
          >
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              className="bg-[var(--neon-green)] hover:bg-[var(--neon-green)]/90 text-white font-semibold text-lg px-8 py-4 rounded-xl neon-glow transition-all duration-300 disabled:opacity-50"
              size="lg"
            >
              {isSpinning ? 'Spinning... 🎰' : 'Pick Board Leaders 🎰'}
            </Button>
          </motion.div>
        </motion.div>

        {/* Spinning Wheel */}
        <AnimatePresence>
          {isSpinning && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-[var(--neon-green)] to-emerald-600 rounded-full flex items-center justify-center text-4xl neon-glow"
                animate={{ 
                  rotateY: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 3, ease: [0.68, -0.55, 0.265, 1.55] },
                  scale: { duration: 3, times: [0, 0.5, 1] }
                }}
              >
                🎰
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Winner Reveal */}
        <AnimatePresence>
          {showWinners && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8 neon-text-glow"
                style={{ color: 'var(--neon-green)' }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                🎉 Next Week's Board Leaders 🎉
              </motion.h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
                {winners.map((winner, index) => (
                  <motion.div
                    key={winner}
                    className="bg-gray-900/50 backdrop-blur-sm border border-[var(--neon-green)]/30 rounded-2xl p-8 neon-glow"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + index * 0.2,
                      type: "spring",
                      bounce: 0.4
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">💫</div>
                      <h3 
                        className="text-2xl md:text-3xl font-bold neon-text-glow"
                        style={{ color: 'var(--neon-green)' }}
                      >
                        {winner}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Button
                  onClick={resetGame}
                  variant="secondary"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 border border-gray-600"
                >
                  Spin Again ↻
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
