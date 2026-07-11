import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TypeAnimation } from 'react-type-animation';
import {
  Heart, Sparkles, Pause, Play,
  X, Gift, Smile, Flame, Crown, Quote, Flower2, Volume2, VolumeX, Menu
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════ */
/*  1. CONTINUOUS BOTTOM-TO-TOP FLOATING ELEMENTS (Global Background)    */
/* ═══════════════════════════════════════════════════════════════════════ */
function GlobalFloatingElements() {
  const elements = useMemo(() => {
    const symbols = ['🌸', '💖', '🎀', '✨', '🌸', '💖', '🎀', '✨'];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 7 + 3) % 100}%`,
      delay: (i * 1.5) % 15,
      duration: 12 + (i % 8) * 2, // 12s to 26s
      size: ['text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'][i % 4],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.size} opacity-40 drop-shadow-lg`}
          style={{ left: el.left, bottom: '-10%' }}
          animate={{
            y: ['10vh', '-110vh'],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {el.symbol}
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  1.5 CINEMATIC PARTICLES FOR CELEBRATE SECTION                        */
/* ═══════════════════════════════════════════════════════════════════════ */
function CinematicParticles({ isEnding }) {
  const particles = useMemo(() => {
    const config = [];
    // Bokeh
    for (let i = 0; i < 20; i++) config.push({ type: 'bokeh', size: Math.random() * 40 + 20, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 10, duration: Math.random() * 5 + 5, opacity: Math.random() * 0.2 + 0.1 });
    // Stars
    for (let i = 0; i < 40; i++) config.push({ type: 'star', size: Math.random() * 4 + 2, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 5, duration: Math.random() * 3 + 2, opacity: Math.random() * 0.5 + 0.2 });
    // Cherry Blossoms
    for (let i = 0; i < 80; i++) config.push({ type: 'float', symbol: '🌸', size: Math.random() * 20 + 15, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 20, duration: Math.random() * 10 + 10, opacity: Math.random() * 0.4 + 0.2, rotStart: Math.random() * 360, rotEnd: Math.random() * 720 });
    // Roses
    for (let i = 0; i < 40; i++) config.push({ type: 'float', symbol: '🌹', size: Math.random() * 25 + 15, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 20, duration: Math.random() * 15 + 12, opacity: Math.random() * 0.3 + 0.2, rotStart: Math.random() * 360, rotEnd: Math.random() * 720 });
    // Glitter
    for (let i = 0; i < 150; i++) config.push({ type: 'float', symbol: '✨', size: Math.random() * 10 + 5, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 15, duration: Math.random() * 8 + 7, opacity: Math.random() * 0.6 + 0.2, rotStart: 0, rotEnd: 0 });
    // Hearts
    for (let i = 0; i < 60; i++) config.push({ type: 'float', symbol: '💖', size: Math.random() * 15 + 10, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 15, duration: Math.random() * 8 + 5, opacity: Math.random() * 0.5 + 0.3, rotStart: Math.random() * 360, rotEnd: Math.random() * 720 });
    // Fairy dust
    for (let i = 0; i < 80; i++) config.push({ type: 'float', symbol: '✦', size: Math.random() * 8 + 3, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 10, duration: Math.random() * 6 + 4, opacity: Math.random() * 0.7 + 0.2, rotStart: 0, rotEnd: 360 });
    // Sparkles
    for (let i = 0; i < 120; i++) config.push({ type: 'float', symbol: '✧', size: Math.random() * 12 + 4, startX: Math.random() * 100, endX: Math.random() * 100, delay: Math.random() * 10, duration: Math.random() * 7 + 3, opacity: Math.random() * 0.6 + 0.2, rotStart: 0, rotEnd: 180 });
    return config;
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isEnding ? 'ending-slowdown' : ''}`}>
      {particles.map((p, i) => {
        if (p.type === 'bokeh') {
          return (
            <div key={i} className="particle-base anim-pulse rounded-full bg-white blur-md"
              style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, '--delay': `-${p.delay}s`, '--duration': `${p.duration}s`, '--max-opacity': p.opacity }} />
          );
        } else if (p.type === 'star') {
          return (
            <div key={i} className="particle-base anim-pulse rounded-full bg-yellow-200 shadow-[0_0_8px_rgba(253,224,71,0.8)]"
              style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, '--delay': `-${p.delay}s`, '--duration': `${p.duration}s`, '--max-opacity': p.opacity }} />
          );
        } else {
          return (
            <div key={i} className="particle-base anim-float drop-shadow-sm"
              style={{ fontSize: p.size, left: 0, '--start-x': `${p.startX}vw`, '--end-x': `${p.endX}vw`, '--delay': `-${p.delay}s`, '--duration': `${p.duration}s`, '--max-opacity': p.opacity, '--start-rot': `${p.rotStart}deg`, '--end-rot': `${p.rotEnd}deg` }}>
              {p.symbol}
            </div>
          );
        }
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  2. SPLASH / INTRO SCREEN                                             */
/* ═══════════════════════════════════════════════════════════════════════ */
function SplashScreen({ onComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center shadow-lg shadow-pink-200/50 mb-8"
      >
        <Flower2 size={40} className="text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-4xl md:text-5xl font-cursive text-pink-600 mb-6"
      >
        A Magical Surprise...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="text-[11px] tracking-[0.35em] text-pink-400/70 font-sans uppercase text-center"
      >
        CRAFTED WITH LOVE &nbsp;·&nbsp; JUST FOR YOU
      </motion.p>

      <div className="h-24 mt-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-pink-300"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.button
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              style={{
                backgroundImage: 'linear-gradient(180deg, #ff3d8d, #ff6fa8)',
                boxShadow: '0 18px 45px rgba(255,40,130,.35), 0 0 40px rgba(255,90,170,.35)',
              }}
              className="relative group overflow-hidden flex items-center justify-center px-10 py-5 rounded-full text-white font-sans font-bold text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open Your Surprise <span className="inline-block" style={{ WebkitTextFillColor: 'initial' }}>❤️</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  3. TOP NAVIGATION                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const links = ['HOME', 'JOURNEY', 'UNIVERSE', 'MOMENTS', 'LETTER', 'WHY YOU', 'CELEBRATE'];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-[120] nav-premium-glass rounded-2xl"
      >
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <motion.div whileHover={{ rotate: 20, scale: 1.1 }} className="text-pink-400">
            <Flower2 size={22} />
          </motion.div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="nav-link-elegant text-[10px] lg:text-[11px] tracking-[0.2em] text-pink-500/80 hover:text-pink-700 transition-colors font-sans uppercase font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.div
              className="text-pink-400"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Heart size={18} className="fill-pink-300" />
            </motion.div>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-[0_4px_15px_rgba(255,100,150,0.15)] flex items-center justify-center text-pink-500 border border-pink-100"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-11 h-11 rounded-full bg-pink-50/80 flex items-center justify-center text-pink-500 border border-pink-100 hover:bg-pink-100 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center gap-6">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl tracking-[0.2em] text-pink-600 hover:text-pink-800 transition-colors font-sans uppercase font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  4. SURPRISE MODAL                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
function SurpriseModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="relative bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl shadow-pink-200/40 border border-pink-100/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:text-pink-600 hover:bg-pink-100 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="text-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 mb-6"
              >
                <Gift size={28} className="text-pink-500" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-pink-700 mb-2">
                A Secret Just For You
              </h2>
              <p className="text-sm text-pink-400 font-cursive mb-6">
                Open your heart and read...
              </p>

              <div className="space-y-4 text-pink-700/80 font-sans leading-relaxed text-sm md:text-base text-left">
                <p>
                  You are the most extraordinary soul to ever grace this world. Every
                  moment spent knowing you is a gift that words can never fully capture.
                </p>
                <p>
                  You deserve galaxies of happiness, oceans of laughter, and an infinity
                  of love. Today and always, you are celebrated, cherished, and adored
                  beyond measure.
                </p>
                <p className="text-center text-pink-500 font-serif italic text-lg pt-2">
                  "You are not just loved — you are the very definition of love." 💕
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pink-100">
                <p className="text-pink-500 font-cursive text-lg">
                  Forever yours, Sajith
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  5. INFINITE MARQUEE / SCROLLING RIBBON                               */
/* ═══════════════════════════════════════════════════════════════════════ */
function InfiniteMarquee() {
  const phrases = [
    'Dreams Come True',
    'You Are Everything',
    'Happy Birthday',
    'You Are Loved',
  ];

  const content = phrases.map((phrase, i) => (
    <span key={i} className="flex items-center gap-4 whitespace-nowrap">
      <span className="text-white/95 font-sans text-sm tracking-widest uppercase font-medium">
        {phrase}
      </span>
      <span className="text-white/70 flex-shrink-0 text-xs">✦</span>
    </span>
  ));

  return (
    <div className="w-full bg-pink-400 py-3 overflow-hidden shadow-sm">
      <div className="marquee-track flex items-center gap-4">
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  6. AUDIO PLAYER (Bottom Right Sticky)                                */
/* ═══════════════════════════════════════════════════════════════════════ */
function AudioPlayer({ audioRef, isPlaying, setIsPlaying, isMuted, setIsMuted }) {

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;

    const events = ['pointerdown', 'click', 'touchstart', 'keydown', 'wheel'];

    const handleInteraction = async () => {
      events.forEach(e => window.removeEventListener(e, handleInteraction));
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) { }
      }
    };

    const attemptPlay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
        events.forEach(e => window.addEventListener(e, handleInteraction, { once: true }));
      }
    };

    const storedState = localStorage.getItem('musicPlaying');
    if (storedState !== 'false') {
      attemptPlay();
    } else {
      setIsPlaying(false);
    }

    return () => {
      events.forEach(e => window.removeEventListener(e, handleInteraction));
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    localStorage.setItem('musicMuted', isMuted);
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('musicPlaying', 'false');
    } else {
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
      localStorage.setItem('musicPlaying', 'true');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 lg:bottom-10 lg:right-10 z-50 flex items-center gap-3"
    >
      <audio ref={audioRef} src="/Our_Song (1).mp3" loop preload="auto" playsInline />

      <div className="bg-white/90 backdrop-blur-md rounded-full px-5 py-3 shadow-lg shadow-pink-200/50 border border-pink-100 flex items-center gap-4">
        <div className="flex items-end gap-[3px] h-4 w-6 justify-center">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-[3px] rounded-full transition-all duration-300 ${isPlaying
                ? `bg-pink-500 eq-bar-${n}`
                : 'bg-pink-200 h-1'
                }`}
              style={!isPlaying ? { height: '3px' } : undefined}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-pink-500 font-sans uppercase w-16">
          {isPlaying ? 'PLAYING' : 'SILENT'}
        </span>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 ${isMuted
              ? 'bg-pink-50 border border-pink-200 text-pink-500 hover:bg-pink-100'
              : 'bg-pink-500 text-white shadow-pink-300/50'
              }`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>

          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 ${isPlaying
              ? 'bg-pink-500 text-white shadow-pink-300/50'
              : 'bg-pink-50 border border-pink-200 text-pink-500 hover:bg-pink-100'
              }`}
          >
            {isPlaying ? (
              <Pause size={14} className="fill-white" />
            ) : (
              <Play size={14} className="fill-pink-500 ml-0.5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  7. SECTION WRAPPER (Fade-in on scroll)                               */
/* ═══════════════════════════════════════════════════════════════════════ */
function FadeSection({ children, className = '', id = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  8. ORBITING IMAGE                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
function OrbitImage({ src, radius, startAngle, duration, label }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: 72,
        height: 72,
        top: '50%',
        left: '50%',
        marginTop: -36,
        marginLeft: -36,
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
    >
      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{
          transform: `rotate(${startAngle}deg) translateX(${radius}px)`,
          transformOrigin: '36px 36px',
        }}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration, ease: 'linear' }}
          className="relative w-full h-full"
        >
          <img
            src={src}
            alt="Memory"
            className="w-full h-full rounded-full border-[3px] border-white/90 shadow-[0_10px_30px_rgba(233,30,99,0.15)] object-cover overflow-hidden"
          />
          {label && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-max max-w-[80px] text-center">
              <div className="bg-white/75 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_4px_15px_rgba(255,110,170,0.15)] border border-white/80">
                <span className="text-[8px] md:text-[9px] font-sans font-semibold text-pink-700/90 uppercase tracking-widest">{label}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
function WhyYouCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/40 backdrop-blur-xl rounded-[1.5rem] p-6 shadow-[0_10px_30px_rgba(255,100,150,0.1)] border border-white/60 text-center transition-all duration-300 hover:shadow-[0_15px_40px_rgba(255,100,150,0.25)] hover:bg-white/50"
    >
      <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-pink-100 to-pink-200 border border-white flex items-center justify-center text-2xl shadow-inner mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-pink-900 mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        {title}
      </h3>
      <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-300" />
        <span className="text-[10px] text-pink-400">♥</span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-300" />
      </div>
      <p className="text-pink-900/80 leading-relaxed text-sm md:text-base font-light" style={{ fontFamily: '"Inter", sans-serif' }}>
        {desc}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════ MAIN APP ═════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem('musicPlaying') === 'true';
  });
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('musicMuted') === 'true';
  });
  const audioRef = useRef(null);

  const handleOpenSurprise = async () => {
    setShowSplash(false);
    setTimeout(async () => {
      try {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.muted = false;
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
          localStorage.setItem('musicPlaying', 'true');
          localStorage.setItem('musicMuted', 'false');
        }
      } catch (err) {
        console.error(err);
      }
    }, 150);
  };

  const heroImageRef = useRef(null);

  const blowCandles = () => {
    if (isBlowing || candlesBlown) return;
    setIsBlowing(true);

    // Step 2: Reduce music volume
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      const fadeVolume = () => {
        const target = 0.4;
        const step = (audioEl.volume - target) / 20;
        const interval = setInterval(() => {
          if (audioEl.volume > target + 0.01) {
            audioEl.volume = Math.max(target, audioEl.volume - step);
          } else {
            audioEl.volume = target;
            clearInterval(interval);
          }
        }, 50);
      };
      fadeVolume();
    }

    // Trigger state-based animations (Steps 3-6, 10-16)
    setCandlesBlown(true);

    // Step 7: Burst of cherry blossom petals
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ffb7c5', '#ff9eaa', '#ffc0cb', '#ffd1dc'],
        scalar: 1.4,
        ticks: 300,
        zIndex: 100
      });
    }, 100);

    // Step 8: Luxury confetti
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 360,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#ffffff', '#f59e0b', '#fde68a'],
        ticks: 400,
        gravity: 0.8,
        zIndex: 100
      });
    }, 300);

    // Step 9: Tiny glowing particles
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 360,
        startVelocity: 50,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#fbbf24', '#fecdd3', '#ffffff'],
        scalar: 0.5,
        ticks: 200,
        gravity: 0.4,
        zIndex: 100
      });
    }, 500);

    // Step 17: Fade in message card
    setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    // Final Screen Transition
    setTimeout(() => {
      setShowMessage(false);
      setTimeout(() => setShowEnding(true), 600);
    }, 7000);
  };

  const qualities = [
    { icon: Smile, title: 'Your Smile', desc: 'Your smile lights up the darkest rooms and fills every heart around you with pure, uncontainable joy.' },
    { icon: Heart, title: 'Your Kindness', desc: 'You carry kindness like second nature — every gentle word and thoughtful gesture makes the world warmer.' },
    { icon: Flame, title: 'Your Spirit', desc: 'Your spirit is fire and grace combined — bold enough to chase dreams, tender enough to lift others along the way.' },
    { icon: Crown, title: 'Your Strength', desc: 'You face every storm with unshakable grace, turning challenges into triumphs with elegance that inspires everyone.' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-pink-50 font-sans grid-pattern">

      {/* ─── Splash Screen ─── */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleOpenSurprise} />}
      </AnimatePresence>

      {/* ─── Background Continuous Animations ─── */}
      {!showSplash && <GlobalFloatingElements />}

      {/* ─── Navigation ─── */}
      {!showSplash && <Navigation />}

      {/* ─── Audio Player ─── */}
      {!showSplash && <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} isMuted={isMuted} setIsMuted={setIsMuted} />}

      {/* ─── Surprise Modal ─── */}
      <SurpriseModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  HERO SECTION                                                  */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative h-[calc(100svh-44px)] min-h-[600px] flex items-center justify-center z-10 overflow-hidden overflow-x-hidden max-w-full pt-24 md:pt-0"
      >
        <div className="max-w-[1400px] mx-auto w-full h-full px-6 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center gap-8 md:gap-12 lg:gap-20">

          {/* ═══════ LEFT COLUMN — Content ═══════ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 order-2 lg:order-1 w-full max-w-[620px] mx-auto lg:mx-0 lg:pl-20">

            {/* Subtitle label */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-pink-500/80 font-sans uppercase mb-2 md:mb-3 font-semibold"
            >
              ✦ TODAY IS A VERY SPECIAL DAY ✦
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
              className="text-5xl sm:text-6xl md:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-serif font-bold leading-[1.05] text-pink-800 hero-heading-glow tracking-tight whitespace-nowrap"
            >
              Happy Birthday
            </motion.h1>

            {/* Cursive subtitle with blossom icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-2 md:mt-4 flex items-center gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <span className="text-xl md:text-2xl opacity-90 drop-shadow-sm">🌸</span>
              <p className="text-2xl md:text-3xl lg:text-[40px] font-cursive text-pink-600 drop-shadow-sm leading-none">
                My Beautiful Love
              </p>
              <span className="text-xl md:text-2xl opacity-90 drop-shadow-sm">🌸</span>
            </motion.div>

            {/* Champagne divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="champagne-divider w-40 md:w-56 mx-auto lg:mx-0 mt-4 md:mt-6"
            />

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-4 md:mt-6 text-pink-700/70 font-sans text-sm md:text-base xl:text-lg leading-relaxed font-light max-w-[420px] mx-auto lg:mx-0"
            >
              You are the most extraordinary soul I've ever known. Today, the entire universe celebrates the beautiful miracle that is you.
            </motion.p>

            {/* Type animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-2 md:mt-4 h-6 md:h-8 flex items-center justify-center lg:justify-start"
            >
              <TypeAnimation
                sequence={[
                  'The most beautiful soul I know...', 2500,
                  'My favourite everything in this world...', 2500,
                  'Today is entirely yours ✨', 2500,
                ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
                className="text-pink-700/80 font-sans text-sm md:text-base xl:text-lg italic font-light"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="hero-btn-shine relative mt-6 md:mt-8 lg:mt-10 px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-pink-500 via-pink-500 to-rose-500 text-white font-sans text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg shadow-pink-300/40 cursor-pointer transition-all flex items-center gap-2 md:gap-3 mx-auto lg:mx-0 overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(233, 30, 99, 0.3), 0 8px 40px rgba(233, 30, 99, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              <span>✦</span>
              <span>OPEN YOUR SURPRISE</span>
              <span>→</span>
            </motion.button>
          </div>

          {/* ═══════ RIGHT COLUMN — Hero Image ═══════ */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', bounce: 0.15 }}
            className="relative z-10 order-1 lg:order-2 w-[85%] max-w-[90vw] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] mx-auto lg:mx-0 lg:-translate-x-10 aspect-[3/4]"
          >
            {/* Ambient glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-br from-pink-200/50 via-pink-300/40 to-rose-200/50 rounded-[60px] blur-[50px] ambient-glow pointer-events-none z-0" />

            {/* Glass frame with image */}
            <div className="relative z-10 w-full h-full rounded-[32px] border-[4px] border-white/95 shadow-[0_20px_60px_rgba(255,100,150,0.3),inset_0_0_20px_rgba(255,255,255,0.8)] overflow-hidden bg-pink-50/50 backdrop-blur-sm group hover:rotate-0 transition-transform duration-700">
              {/* Glass Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/40 to-transparent opacity-60 z-20 pointer-events-none" />

              <img
                src="/1.png"
                alt="Birthday Girl"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
            </div>

            {/* ── Floating glassmorphism labels ── */}
            {/* Forever — top-left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -left-2 lg:-left-[70px] top-[8%] lg:top-[18%] floating-label-glass rounded-full px-5 py-2.5 cursor-default z-30 shadow-[0_10px_30px_rgba(255,100,150,0.2)] border border-white/60 bg-white/70 backdrop-blur-md"
            >
              <span className="text-sm font-sans font-semibold text-pink-800 tracking-wide">❤️ Forever</span>
            </motion.div>

            {/* Birthday Girl — center-right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="absolute -right-2 lg:-right-[70px] top-[55%] lg:top-[52%] floating-label-glass rounded-full px-5 py-2.5 cursor-default z-30 shadow-[0_10px_30px_rgba(255,100,150,0.2)] border border-white/60 bg-white/70 backdrop-blur-md"
            >
              <span className="text-sm font-sans font-semibold text-pink-800 tracking-wide">⭐ My Universe</span>
            </motion.div>

            {/* My Universe — bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="absolute -left-1 lg:-left-[60px] bottom-[10%] lg:bottom-[18%] floating-label-glass rounded-full px-5 py-2.5 cursor-default z-30 shadow-[0_10px_30px_rgba(255,100,150,0.2)] border border-white/60 bg-white/70 backdrop-blur-md"
            >
              <span className="text-sm font-sans font-semibold text-pink-800 tracking-wide">🌸 Birthday Girl</span>
            </motion.div>

            {/* ── Decorative sparkle stars ── */}
            <div className="absolute -top-6 left-1/4 text-amber-400/60 text-2xl twinkle-star z-20" style={{ animationDelay: '0s' }}>✦</div>
            <div className="absolute top-[30%] -right-8 text-pink-300/60 text-xl twinkle-star z-20" style={{ animationDelay: '0.8s' }}>✦</div>
            <div className="absolute -bottom-8 right-[30%] text-amber-400/60 text-2xl twinkle-star z-20" style={{ animationDelay: '1.5s' }}>✦</div>
            <div className="absolute bottom-[25%] -left-10 text-pink-300/50 text-xl twinkle-star z-20" style={{ animationDelay: '2s' }}>✦</div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 scroll-indicator"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-pink-400/60 font-sans uppercase">Scroll</span>
          <div className="w-4 h-7 md:w-5 md:h-8 rounded-full border border-pink-300/40 flex items-start justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 md:h-2 rounded-full bg-pink-400/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Infinite Marquee Ribbon ─── */}
      <InfiniteMarquee />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  TWO SOULS, ONE JOURNEY                                        */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="journey" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden overflow-x-hidden max-w-full">
        {/* Soft radial glows and background lighting */}
        <div className="absolute top-1/2 left-[10%] w-[500px] h-[500px] bg-pink-300/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-rose-300/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        {/* Decorative Glass Orbs */}
        <div className="absolute top-[15%] left-[5%] w-32 h-32 journey-glass-orb opacity-40 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[10%] right-[8%] w-20 h-20 journey-glass-orb opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

        {/* Tiny Light Particles */}
        <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)] animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-[35%] left-[15%] w-2 h-2 bg-pink-100 rounded-full shadow-[0_0_15px_rgba(255,182,193,1)] animate-ping" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />

        <div className="text-center mb-20 md:mb-28 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="journey-heading mb-3 md:mb-4"
          >
            Two Souls, One Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="journey-subtitle"
          >
            A beautiful collision of two worlds
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-6 relative max-w-5xl mx-auto min-h-[500px] sm:min-h-[450px]">

          {/* Elegant Connecting Lines (desktop only) */}
          <div className="hidden sm:block absolute top-1/2 left-[15%] right-[15%] border-t border-dashed border-pink-300/40 z-0 -translate-y-1/2" />
          <div className="hidden sm:block absolute top-1/2 left-[25%] right-[25%] border-t border-solid border-pink-200/30 z-0 -translate-y-1/2 translate-y-1.5" />

          {/* Image 1 (/3.png) */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -12 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
            className="z-10 relative order-1"
          >
            <div className="absolute -inset-6 bg-pink-300/20 blur-[30px] rounded-[2rem] pointer-events-none" />
            <div className="journey-image-frame w-56 sm:w-64 md:w-72 aspect-[4/5]">
              <img src="/3.png" alt="Soul 1" className="w-full h-full object-cover" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-3 -left-3 journey-badge journey-badge-float" style={{ animationDelay: '0.2s' }}>
              <span className="text-xs md:text-sm font-sans font-medium text-pink-700 flex items-center gap-1.5">
                <Heart size={14} className="fill-pink-500 text-pink-500" />
                Her Smile
              </span>
            </div>

            {/* Sparkles */}
            <div className="absolute -top-4 -left-4 text-gold-400 text-xl twinkle-star" style={{ color: '#F6C56B' }}>✦</div>
          </motion.div>

          {/* Center Image (/4.png) replacing beating heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1.05 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.4, delay: 0.1 }}
            className="z-30 relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 order-2 my-8 sm:my-0"
          >
            <div className="absolute -inset-10 bg-gradient-to-r from-pink-200/30 to-rose-200/30 blur-[40px] rounded-full pointer-events-none pulse-glow" />

            <div className="journey-image-frame journey-center-frame w-64 sm:w-72 md:w-80 aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-[2.5rem]">
              <img src="/4.png" alt="Together" className="w-full h-full object-cover" />

              {/* Preserved Beating Heart Animation as an elegant overlay */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(233,30,99,0.2)] border border-white/80">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                  <Heart size={20} className="text-pink-500 fill-pink-500 drop-shadow-md" />
                </motion.div>
              </div>
            </div>

            {/* Sparkles */}
            <div className="absolute -top-6 right-8 text-gold-400 text-2xl twinkle-star" style={{ color: '#F6C56B' }}>✦</div>
            <div className="absolute bottom-8 -left-5 text-pink-300 text-base twinkle-star" style={{ animationDelay: '1s' }}>✦</div>
          </motion.div>

          {/* Image 2 (/7.png) */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 12 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
            className="z-10 relative order-3"
          >
            <div className="absolute -inset-6 bg-rose-300/20 blur-[30px] rounded-[2rem] pointer-events-none" />
            <div className="journey-image-frame w-56 sm:w-64 md:w-72 aspect-[4/5]">
              <img src="/7.png" alt="Soul 2" className="w-full h-full object-cover" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-3 -right-3 journey-badge journey-badge-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-xs md:text-sm font-sans font-medium text-pink-700 flex items-center gap-1.5">
                <Heart size={14} className="fill-pink-500 text-pink-500" />
                His World
              </span>
            </div>

            {/* Sparkles */}
            <div className="absolute -bottom-5 right-6 text-gold-400 text-xl twinkle-star" style={{ color: '#F6C56B' }}>✦</div>
          </motion.div>
        </div>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  OUR UNIVERSE (ORBITING)                                       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="universe" className="relative z-10 min-h-[100svh] lg:min-h-[100vh] flex flex-col justify-center py-16 lg:py-0 px-6 overflow-hidden overflow-x-hidden max-w-full">
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto w-full relative">

          {/* Header Area */}
          <div className="text-center z-10 relative">
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-bold text-pink-800 tracking-tight mb-2 md:mb-3 drop-shadow-sm">
              Our Universe
            </h2>
            <p className="text-pink-500 font-cursive text-2xl md:text-3xl mb-4 md:mb-5 drop-shadow-sm">
              You are at the center of every beautiful memory
            </p>
            <motion.div className="champagne-divider w-32 md:w-40 mx-auto mb-6 md:mb-10" />
          </div>

          {/* Complete Orbit System container */}
          <div className="relative w-full flex items-center justify-center">

            {/* Left Side Quote Card (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="hidden lg:block absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 w-64 bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_15px_40px_rgba(255,110,170,0.12)]"
            >
              <Quote size={20} className="text-pink-400 mb-3" />
              <p className="text-pink-700/80 font-serif italic text-lg leading-relaxed">
                "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
              </p>
            </motion.div>

            {/* Orbit */}
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
              {/* Center image - reduced slightly (w-48 -> w-[170px]) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="pulse-glow rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <img
                    src="/5.png"
                    alt="Center of my universe"
                    className="w-[120px] h-[120px] md:w-[170px] md:h-[170px] rounded-full border-[6px] border-white/95 shadow-[0_20px_50px_rgba(233,30,99,0.4)] object-cover overflow-hidden bg-white/20 backdrop-blur-sm"
                  />
                </motion.div>
              </div>

              {/* Reduced radius by ~9% (160 -> 145) */}
              <OrbitImage src="/6.png" radius={145} startAngle={225} duration={22} label="Adventure" />
              <OrbitImage src="/3.png" radius={145} startAngle={315} duration={22} label="Laughter" />
              <OrbitImage src="/7.png" radius={145} startAngle={45} duration={22} label="Romance" />
              <OrbitImage src="/8.png" radius={145} startAngle={90} duration={22} label="Joy" />
              <OrbitImage src="/5.png" radius={145} startAngle={135} duration={22} label="Forever" />

              {/* Delicate concentric rings */}
              <div className="absolute inset-1 md:inset-3 rounded-full border border-dashed border-pink-200/40" />
              <div className="absolute inset-10 md:inset-[3.25rem] rounded-full border border-solid border-pink-100/30" />
            </div>

            {/* Right Side Quote Card (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 w-64 bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_15px_40px_rgba(255,110,170,0.12)]"
            >
              <Quote size={20} className="text-pink-400 mb-3" />
              <p className="text-pink-700/80 font-serif italic text-lg leading-relaxed">
                "You are my sun, my moon, and all of my stars. With you, every single moment feels like magic."
              </p>
            </motion.div>
          </div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mt-8 md:mt-12 text-center relative z-10"
          >
            <p className="text-pink-600/80 font-sans font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
              My Whole World Revolves Around You
            </p>
          </motion.div>

        </div>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  CHERISHED MOMENTS GALLERY                                     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="moments" className="relative z-10 min-h-[100svh] lg:h-screen lg:max-h-screen flex flex-col justify-center py-16 lg:py-0 px-6 overflow-x-hidden lg:overflow-hidden max-w-full">

        <div className="flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full h-full relative">

          <div className="flex flex-col lg:flex-row items-center h-full w-full gap-8 lg:gap-4">

            {/* LEFT COLUMN (35%) */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center text-center lg:text-left z-20 pt-10 lg:pt-0">
              <motion.h2
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-4 lg:mb-6 bg-gradient-to-br from-rose-700 via-pink-600 to-rose-500 bg-clip-text text-transparent drop-shadow-sm leading-tight"
              >
                Cherished <br className="hidden lg:block" /> Moments
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-pink-500 font-cursive text-3xl md:text-4xl lg:text-5xl drop-shadow-sm mb-6 lg:mb-12"
              >
                Every picture tells your beautiful story ✨
              </motion.p>
            </div>

            {/* RIGHT CONTENT (65%) - Desktop Collage */}
            <div className="hidden lg:flex w-[65%] relative h-[90%] items-center justify-center">

              {/* Center Largest (/8.png) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 hover:scale-105 hover:rotate-1 hover:z-50"
              >
                <div className="absolute -inset-8 bg-pink-400/30 blur-[40px] rounded-full pointer-events-none" />
                <img src="/8.png" alt="Center memory" className="w-[280px] xl:w-[320px] aspect-[4/5] object-cover rounded-[30px] border-[8px] border-white shadow-[0_25px_60px_rgba(233,30,99,0.35)] overflow-hidden" />
              </motion.div>

              {/* Top Left (/5.png) */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50, rotate: -20 }} whileInView={{ opacity: 1, x: 0, y: 0, rotate: -6 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-[8%] left-[8%] xl:left-[12%] z-20 transition-all duration-500 hover:scale-110 hover:-rotate-2 hover:z-50"
              >
                <img src="/5.png" alt="Memory" className="w-[180px] xl:w-[220px] aspect-[3/4] object-cover rounded-3xl border-[5px] border-white shadow-[0_15px_40px_rgba(233,30,99,0.25)] overflow-hidden" />
                <div className="absolute -top-5 -left-5 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 text-xs font-semibold text-pink-700 whitespace-nowrap">💖 Spring Love</div>
              </motion.div>

              {/* Top Right (/3.png) */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -50, rotate: 20 }} whileInView={{ opacity: 1, x: 0, y: 0, rotate: 5 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-[12%] right-[5%] xl:right-[10%] z-20 transition-all duration-500 hover:scale-110 hover:rotate-8 hover:z-50"
              >
                <img src="/3.png" alt="Memory" className="w-[190px] xl:w-[230px] aspect-[4/5] object-cover rounded-3xl border-[5px] border-white shadow-[0_15px_40px_rgba(233,30,99,0.25)] overflow-hidden" />
                <div className="absolute -bottom-4 -right-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 text-xs font-semibold text-pink-700 whitespace-nowrap">🌸 Garden Day</div>
              </motion.div>

              {/* Bottom Left (/10.png) */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 50, rotate: -20 }} whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-[18%] left-[2%] xl:left-[6%] z-40 transition-all duration-500 hover:scale-110 hover:-rotate-1 hover:z-50"
              >
                <img src="/10.png" alt="Memory" className="w-[220px] xl:w-[260px] aspect-[4/3] object-cover rounded-3xl border-[5px] border-white shadow-[0_15px_40px_rgba(233,30,99,0.25)] overflow-hidden" />
                <div className="absolute -bottom-4 -left-3 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 text-xs font-semibold text-pink-700 whitespace-nowrap">🌅 Sunset Walk</div>
              </motion.div>

              {/* Bottom Right (/6.png) */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50, rotate: 20 }} whileInView={{ opacity: 1, x: 0, y: 0, rotate: 3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-[12%] right-[3%] xl:right-[8%] z-40 transition-all duration-500 hover:scale-110 hover:rotate-6 hover:z-50"
              >
                <img src="/6.png" alt="Memory" className="w-[240px] xl:w-[280px] aspect-[3/2] object-cover rounded-3xl border-[5px] border-white shadow-[0_15px_40px_rgba(233,30,99,0.25)] overflow-hidden" />
                <div className="absolute -top-4 -right-2 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-white/60 text-xs font-semibold text-pink-700 whitespace-nowrap">☕ First Coffee</div>
              </motion.div>

              {/* Center Bottom (/8.png) */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -10 }} whileInView={{ opacity: 1, y: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-[2%] left-[45%] -translate-x-1/2 z-50 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:z-50"
              >
                <div className="bg-white/95 p-3 rounded-2xl shadow-[0_20px_45px_rgba(233,30,99,0.35)] border border-pink-100 flex flex-col items-center">
                  <img src="/8.png" alt="Memory" className="w-[160px] xl:w-[180px] aspect-[2/1] object-cover rounded-xl overflow-hidden" />
                  <span className="mt-2 text-xs font-cursive font-bold text-pink-500 whitespace-nowrap">🎂 Birthday Vibes</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT CONTENT - Mobile Stacked Cards */}
            <div className="lg:hidden w-full flex flex-col gap-10 items-center justify-center pb-20 relative z-20">
              {[
                { src: "/8.png", label: "💖 The Best Day", aspect: "aspect-[4/5]" },
                { src: "/5.png", label: "💖 Spring Love", aspect: "aspect-[3/4]" },
                { src: "/3.png", label: "🌸 Garden Day", aspect: "aspect-[4/5]" },
                { src: "/10.png", label: "🌅 Sunset Walk", aspect: "aspect-[4/3]" },
                { src: "/6.png", label: "☕ First Coffee", aspect: "aspect-[3/2]" },
                { src: "/8.png", label: "🎂 Birthday Vibes", aspect: "aspect-[2/1]" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative w-[85%] max-w-sm"
                >
                  <img src={item.src} className={`w-full ${item.aspect} object-cover rounded-3xl border-[5px] border-white shadow-[0_15px_35px_rgba(233,30,99,0.25)] overflow-hidden`} />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-5 py-2 rounded-full shadow-lg border border-white/60 text-xs font-semibold text-pink-700 whitespace-nowrap">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Bottom Quote */}
          <div className="w-full text-center pb-6 lg:pb-8 lg:absolute lg:bottom-2 lg:left-0 lg:right-0 z-50">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}
              className="font-serif text-xl md:text-2xl lg:text-3xl italic text-pink-800 drop-shadow-sm px-4"
            >
              "Every memory with you<br className="lg:hidden" /> is my favorite place to return."
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
              className="mt-3 flex justify-center"
            >
              <Heart size={16} className="text-pink-500 fill-pink-500 opacity-80" />
            </motion.div>
          </div>

        </div>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  LETTER SECTION                                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section id="letter" className="relative min-h-[100svh] w-full max-w-full flex flex-col items-center justify-center overflow-hidden overflow-x-hidden py-16 lg:py-24">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        `}</style>

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle SVG Stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-400/60 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ repeat: Infinity, duration: 3 + Math.random() * 4 }}
            >
              ✦
            </motion.div>
          ))}
          {/* Subtle Glowing Hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-pink-400/40 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.3
              }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
              transition={{ repeat: Infinity, duration: 4 + Math.random() * 5 }}
            >
              ♥
            </motion.div>
          ))}
        </div>

        {/* SVG Decorative Dashed Paths (Hidden on mobile) */}
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-0 lg:opacity-60" style={{ zIndex: 0 }}>
          <path d="M 200 250 Q 350 150 500 350" fill="transparent" stroke="url(#goldGradient)" strokeWidth="2.5" strokeDasharray="8 8" />
          <path d="M 200 800 Q 350 900 500 650" fill="transparent" stroke="url(#goldGradient)" strokeWidth="2.5" strokeDasharray="8 8" />
          <path d="M 800 500 Q 650 300 500 450" fill="transparent" stroke="url(#goldGradient)" strokeWidth="2.5" strokeDasharray="8 8" />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f3e5ab" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center px-4">

          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center w-full mb-10 lg:mb-16 mt-8 lg:mt-0"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-900 drop-shadow-sm mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
              A Letter Written in Stars ✨
            </h2>
            <p className="text-2xl md:text-4xl drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600" style={{ fontFamily: '"Great Vibes", cursive' }}>
              Words from the deepest corner of the heart♡
            </p>
          </motion.div>

          {/* Main Layout Container */}
          <div className="relative w-full flex items-center justify-center min-h-[500px]">

            {/* Left Side Images (Hidden on mobile, absolute on desktop) */}
            <div className="hidden lg:block absolute left-0 xl:left-8 top-0 bottom-0 w-[260px]">
              {/* Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-[5%] left-0 flex flex-col items-center z-10"
              >
                <div className="w-40 h-40 rounded-full p-2 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/60 hover:scale-105 transition-transform duration-500">
                  <img src="/2.png" className="w-full h-full rounded-full object-cover shadow-inner" />
                </div>
                <div className="mt-4 bg-white/50 backdrop-blur-md px-5 py-2 rounded-full border border-white/60 text-pink-950 text-sm font-bold shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Special Moments ❤️
                </div>
              </motion.div>

              {/* Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-[5%] right-0 flex flex-col items-center z-10"
              >
                <div className="w-44 h-44 rounded-full p-2 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/60 hover:scale-105 transition-transform duration-500">
                  <img src="/5.png" className="w-full h-full rounded-full object-cover shadow-inner" />
                </div>
                <div className="mt-4 bg-white/50 backdrop-blur-md px-5 py-2 rounded-full border border-white/60 text-pink-950 text-sm font-bold shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Beautiful You 🌸
                </div>
              </motion.div>
            </div>

            {/* Right Side Image (Hidden on mobile) */}
            <div className="hidden lg:block absolute right-0 xl:right-8 top-1/2 -translate-y-1/2 w-[260px]">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex flex-col items-center z-10"
              >
                <div className="w-48 h-48 rounded-full p-2 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/60 hover:scale-105 transition-transform duration-500">
                  <img src="/9.png" className="w-full h-full rounded-full object-cover shadow-inner" />
                </div>
                <div className="mt-4 bg-white/50 backdrop-blur-md px-5 py-2 rounded-full border border-white/60 text-pink-950 text-sm font-bold shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Endless Love ❤️
                </div>
              </motion.div>
            </div>

            {/* Center Letter & Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[700px] z-20 flex flex-col items-center"
            >
              {/* Portrait overlapping top */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-30 -mb-16"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-[0_0_40px_rgba(255,100,150,0.4)] overflow-hidden bg-pink-50">
                  <img src="/3.png" className="w-full h-full object-cover" />
                </div>
                {/* Decorative overlapping flowers */}
                <div className="absolute -bottom-1 -right-4 text-3xl drop-shadow-lg rotate-12">🌸</div>
                <div className="absolute top-2 -left-4 text-2xl drop-shadow-lg -rotate-12">🌺</div>
              </motion.div>

              {/* The Paper Letter */}
              <div
                className="relative w-full rounded-[2rem] p-8 md:p-14 text-center md:text-left"
                style={{
                  backgroundColor: '#fdfaf5', // warm cream
                  backgroundImage: 'radial-gradient(rgba(150,100,50,0.06) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                  boxShadow: '0 30px 60px rgba(200,100,120,0.15), inset 0 0 60px rgba(240,220,200,0.6)',
                  border: '1px solid rgba(220,200,180,0.8)'
                }}
              >
                {/* Gold corner ornaments */}
                <div className="absolute top-5 left-5 w-8 h-8 border-t-[3px] border-l-[3px] border-[#d4af37]/70 rounded-tl-xl" />
                <div className="absolute top-5 right-5 w-8 h-8 border-t-[3px] border-r-[3px] border-[#d4af37]/70 rounded-tr-xl" />
                <div className="absolute bottom-5 left-5 w-8 h-8 border-b-[3px] border-l-[3px] border-[#d4af37]/70 rounded-bl-xl" />
                <div className="absolute bottom-5 right-5 w-8 h-8 border-b-[3px] border-r-[3px] border-[#d4af37]/70 rounded-br-xl" />

                <div className="mt-12" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#3a2b22' }}>
                  <p className="leading-[2.2] text-[18px] md:text-[22px] font-medium px-2 md:px-6">
                    You are a beautiful dream that the universe carefully wove into reality.
                    You carry a light so warm and golden that everyone around you feels its glow.
                    You bring so much magic into ordinary moments — turning simple laughter into
                    music and quiet silences into the most comforting poetry.
                  </p>
                  <p className="mt-6 leading-[2.2] text-[18px] md:text-[22px] font-medium px-2 md:px-6">
                    You make every moment magical, every heartbeat meaningful, and every day
                    worth celebrating. You are kindness wrapped in grace, courage wrapped in
                    softness, and beauty wrapped in the purest soul this world has ever known.
                  </p>
                </div>

                <div className="mt-14 pt-8 border-t border-[#e8d5c4] flex flex-col items-center md:items-end md:pr-12">
                  <p className="text-xl md:text-2xl text-[#5c473a]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    Forever Yours,
                  </p>
                  <p className="text-5xl md:text-6xl text-[#9b0048] mt-2 -rotate-3 drop-shadow-sm" style={{ fontFamily: '"Allura", cursive' }}>
                    Sajith ♡
                  </p>
                </div>

                {/* Wax Seal */}
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-8 -right-4 md:-right-8 z-30"
                >
                  <div className="relative">
                    {/* Ribbon */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-10 h-20 bg-[#a00048] shadow-lg transform -rotate-12 rounded-b-sm" />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/3 w-10 h-24 bg-[#7a0036] shadow-lg transform rotate-6 rounded-b-sm" />
                    {/* Seal */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#e6005c] via-[#b30047] to-[#800033] border-[3px] border-[#660029] shadow-[0_12px_25px_rgba(120,0,40,0.6),inset_0_5px_10px_rgba(255,100,150,0.5)] flex items-center justify-center">
                      <span className="font-serif text-[#ffb3d1] text-4xl md:text-5xl drop-shadow-md" style={{ fontFamily: '"Playfair Display", serif' }}>S</span>
                      {/* Inner embossed ring */}
                      <div className="absolute inset-2 border-2 border-[#ff66a3]/30 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  WHY YOU ARE EXTRAORDINARY                                     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section id="why-you" className="relative min-h-[100svh] w-full max-w-full flex flex-col items-center justify-center overflow-hidden overflow-x-hidden py-16 lg:py-20 px-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        `}</style>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle SVG Stars */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`star-wy-${i}`}
              className="absolute text-yellow-400/50 drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: Math.random() * 0.4 + 0.4 }}
              animate={{ opacity: [0.1, 0.7, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 3 }}
            >
              ✦
            </motion.div>
          ))}
          {/* Subtle Glowing Hearts */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`heart-wy-${i}`}
              className="absolute text-pink-400/30 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: Math.random() * 0.5 + 0.3 }}
              animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }}
              transition={{ repeat: Infinity, duration: 4 + Math.random() * 5 }}
            >
              ♥
            </motion.div>
          ))}
          {/* Large blurred radial glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center h-full justify-center">
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 lg:mb-16 mt-6 lg:mt-0"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-900 drop-shadow-sm mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
              ✨ Why You Are Extraordinary ♡
            </h2>
            <p className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-500 drop-shadow-sm" style={{ fontFamily: '"Great Vibes", cursive' }}>
              "Just a few of the million reasons you are adored 🌸"
            </p>
          </motion.div>

          {/* Main Layout */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 xl:gap-20">

            {/* LEFT CARDS */}
            <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-sm order-2 lg:order-1 z-20">
              <WhyYouCard
                icon="😊"
                title="Your Smile"
                desc="Your smile lights up even the darkest days and turns ordinary moments into unforgettable memories."
                delay={0.2}
              />
              <WhyYouCard
                icon="♡"
                title="Your Kindness"
                desc="Your gentle heart makes everyone around you feel safe, loved, and appreciated."
                delay={0.4}
              />
            </div>

            {/* CENTER PORTRAIT */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative order-1 lg:order-2 z-10 flex-shrink-0 my-4 lg:my-0"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-[1px] border-pink-400/30 scale-[1.15]" />
                <div className="absolute inset-0 rounded-full border-[1px] border-pink-300/20 scale-[1.3]" />
                <div className="absolute inset-0 rounded-full border-[1px] border-pink-200/10 scale-[1.45]" />

                {/* Portrait */}
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-[6px] border-white shadow-[0_0_50px_rgba(255,100,150,0.5)] overflow-hidden bg-pink-100 relative z-20">
                  <img src="/3.png" className="w-full h-full object-cover" />
                </div>

                {/* Flowers overlapping frame */}
                <div className="absolute -bottom-2 -left-2 text-4xl drop-shadow-lg z-30 -rotate-12">🌸</div>
                <div className="absolute top-4 -right-4 text-3xl drop-shadow-lg z-30 rotate-12">🌺</div>
              </motion.div>
            </motion.div>

            {/* RIGHT CARDS */}
            <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-sm order-3 z-20">
              <WhyYouCard
                icon="✨"
                title="Your Beautiful Soul"
                desc="You carry warmth, grace, and positivity wherever you go, making life brighter for everyone."
                delay={0.6}
              />
              <WhyYouCard
                icon="👑"
                title="Everything About You"
                desc="You are simply one of a kind, and every little thing about you makes me fall in love even more."
                delay={0.8}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  THE GRAND FINALE — CELEBRATE                                   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section
        id="celebrate"
        className="relative z-10 min-h-screen pb-40 max-w-full overflow-x-hidden"
      >
        {/* ── Background Layer ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Soft blush pink gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/60 to-rose-50/80" />
          {/* Subtle grid texture */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Soft pink light rays */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-pink-200/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-1/4 w-[400px] h-[600px] bg-gradient-to-b from-pink-100/15 to-transparent rotate-12 blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[600px] bg-gradient-to-t from-rose-100/15 to-transparent -rotate-12 blur-2xl" />

          <CinematicParticles isEnding={showEnding} />
        </div>

        {/* Step 5 & 6: Dim and Vignette Overlays */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 pointer-events-none z-[5]"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 pt-24 md:pt-20 pb-40">

          {/* ── TITLE ── */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-3 md:mb-4"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-sm"
              style={{
                fontFamily: '"Playfair Display", serif',
                background: 'linear-gradient(135deg, #9f1239 0%, #e11d48 40%, #fb7185 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ✨ The Grand Finale ♡
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2 drop-shadow-sm"
            style={{
              fontFamily: '"Great Vibes", cursive',
              color: '#e11d48',
            }}
          >
            Make a wish, close your eyes...
          </motion.p>

          {/* Small decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="champagne-divider w-24 md:w-32 mb-3 md:mb-5"
          />

          {/* ── MAIN HERO AREA WITH DECORATIONS ── */}
          <div className="relative flex items-center justify-center w-full max-w-[760px] mb-8 md:mb-12">

            {/* ── LEFT DECORATION: Gift Box ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block absolute -left-8 xl:left-0 bottom-[15%]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Gift box body */}
                <div className="w-16 h-14 rounded-lg bg-white shadow-[0_8px_25px_rgba(236,72,153,0.2)] border border-pink-100 relative overflow-hidden">
                  {/* Pink ribbon vertical */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-pink-400 to-rose-400" />
                  {/* Pink ribbon horizontal */}
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-3 bg-gradient-to-r from-pink-400 to-rose-400" />
                </div>
                {/* Lid */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[72px] h-5 rounded-t-lg bg-white shadow-md border border-pink-100 border-b-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-pink-400 to-rose-400" />
                </div>
                {/* Bow */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl">🎀</div>
                {/* Small flower petals */}
                <div className="absolute -bottom-2 -left-2 text-sm opacity-60">🌸</div>
                <div className="absolute -bottom-1 right-0 text-xs opacity-50">🌺</div>
                {/* Tiny golden stars */}
                <motion.div
                  className="absolute -top-8 -right-3 text-amber-400 text-xs"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >✦</motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 text-amber-400 text-[10px]"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >✦</motion.div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT DECORATION: Heart Balloon ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block absolute -right-8 xl:right-0 top-[10%]"
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex flex-col items-center"
              >
                {/* Balloon */}
                <div className="text-5xl drop-shadow-lg filter">🩷</div>
                {/* Balloon string */}
                <div className="w-px h-12 bg-gradient-to-b from-pink-300 to-transparent" />
                {/* Glowing heart icon */}
                <motion.div
                  className="absolute -bottom-2 -left-4 text-pink-400 text-sm"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart size={12} className="fill-pink-400" />
                </motion.div>
                {/* Tiny particles */}
                <motion.div
                  className="absolute top-2 -right-3 w-1 h-1 rounded-full bg-pink-300"
                  animate={{ opacity: [0, 1, 0], y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-6 right-2 w-0.5 h-0.5 rounded-full bg-rose-300"
                  animate={{ opacity: [0, 1, 0], y: [0, -6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* ── HERO IMAGE ── */}
            <motion.div
              ref={heroImageRef}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              animate={candlesBlown ? { scale: 1.15, y: -10 } : {}}
              className="relative z-[75]"
              style={{ transition: 'transform 2s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
            >
              {/* Soft pink neon glow & Bloom Lighting (Step 16) */}
              <div className={`absolute -inset-4 md:-inset-6 rounded-[42px] md:rounded-[48px] bg-gradient-to-br from-pink-300/30 via-rose-300/25 to-pink-200/30 blur-xl celebrate-glow-pulse pointer-events-none transition-all duration-1000 ${candlesBlown ? 'opacity-100 scale-110 blur-3xl' : 'opacity-80'}`} />

              {/* Expanding Light Waves (Step 12) */}
              <AnimatePresence>
                {candlesBlown && [0, 1, 2].map((i) => (
                  <motion.div
                    key={`wave-${i}`}
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 2.5, delay: i * 0.4, ease: 'easeOut' }}
                    className="absolute inset-0 border-2 border-pink-300/50 rounded-[36px] pointer-events-none"
                  />
                ))}
              </AnimatePresence>

              {/* Image frame */}
              <div
                className="relative rounded-[28px] md:rounded-[36px] overflow-hidden border-[3px] md:border-4 border-white/95 z-10 bg-black"
                style={{
                  width: 'min(680px, 80vw)',
                  aspectRatio: '16 / 9',
                  boxShadow: '0 20px 50px rgba(236,72,153,0.2), 0 8px 20px rgba(0,0,0,0.06), 0 0 40px rgba(251,113,133,0.15), inset 0 1px 2px rgba(255,255,255,0.6)',
                }}
              >
                <img
                  src="/11.png"
                  alt="Birthday Celebration"
                  className="w-full h-full object-cover transition-opacity duration-1500"
                  style={{ opacity: candlesBlown ? 0.8 : 1 }}
                />

                {/* Candle fade radial mask (Step 4) */}
                <AnimatePresence>
                  {candlesBlown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.8)_100%)] pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/20 to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Tiny flowers at frame corners */}
              <div className="absolute -top-3 -left-3 text-lg md:text-xl drop-shadow-md">🌸</div>
              <div className="absolute -top-3 -right-3 text-lg md:text-xl drop-shadow-md">🌺</div>
              <div className="absolute -bottom-3 -left-3 text-lg md:text-xl drop-shadow-md">🌺</div>
              <div className="absolute -bottom-3 -right-3 text-lg md:text-xl drop-shadow-md">🌸</div>

              {/* Tiny sparkles around border */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`frame-sparkle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,1)]"
                  style={{
                    top: `${['-2%', '30%', '60%', '95%', '50%', '10%'][i]}`,
                    left: `${['30%', '98%', '-1%', '70%', '-1%', '98%'][i]}`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}

              {/* Cherry blossoms around hero */}
              <motion.div
                className="absolute -top-6 left-[20%] text-2xl opacity-40"
                animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >🌸</motion.div>
              <motion.div
                className="absolute -bottom-6 right-[25%] text-xl opacity-35"
                animate={{ y: [0, 5, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >🌹</motion.div>
              <motion.div
                className="absolute top-[40%] -left-6 text-lg opacity-30"
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >💮</motion.div>
              <motion.div
                className="absolute top-[30%] -right-6 text-lg opacity-30"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
              >🌸</motion.div>
            </motion.div>
          </div>

          {/* ── BUTTON ── */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={blowCandles}
            disabled={isBlowing || candlesBlown}
            whileHover={!candlesBlown && !isBlowing ? { scale: 1.03, y: -3 } : {}}
            whileTap={!candlesBlown && !isBlowing ? { scale: 0.97 } : {}}
            className="relative group overflow-hidden cursor-pointer disabled:cursor-default"
            style={{
              padding: '14px 36px',
              borderRadius: '999px',
              background: candlesBlown
                ? 'linear-gradient(135deg, #a78bfa, #ec4899, #f472b6)'
                : 'linear-gradient(135deg, #ec4899, #f43f5e, #e11d48)',
              boxShadow: candlesBlown
                ? '0 12px 35px rgba(168,85,247,0.3), 0 0 25px rgba(236,72,153,0.2)'
                : '0 12px 35px rgba(236,72,153,0.4), 0 0 25px rgba(236,72,153,0.2)',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(13px, 2vw, 16px)',
              color: 'white',
              letterSpacing: '0.05em',
              border: 'none',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none" />
            {/* Shine sweep */}
            {!candlesBlown && <div className="absolute inset-0 hero-btn-shine pointer-events-none" />}
            <span className="relative z-10 flex items-center gap-2">
              {candlesBlown ? (
                <><Sparkles size={18} /> ✨ Wish Made! <Sparkles size={18} /></>
              ) : (
                <>🔥 Blow Out The Candles!</>
              )}
            </span>
          </motion.button>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* FINAL MESSAGE CARD (Glassmorphism)                     */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 120, damping: 20 }}
                className="relative max-w-xl w-full rounded-[2rem] p-6 sm:p-8 md:p-10 text-center overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(24px) saturate(1.5)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 25px 60px rgba(236,72,153,0.2), 0 0 40px rgba(251,113,133,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                {/* Glow behind card */}
                <div className="absolute -inset-10 bg-pink-200/20 blur-3xl rounded-full pointer-events-none" />

                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-sm"
                  style={{ fontFamily: '"Playfair Display", serif', color: '#9f1239' }}
                >
                  ❤️ Happy Birthday ❤️
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl sm:text-2xl mb-4"
                  style={{ fontFamily: '"Great Vibes", cursive', color: '#e11d48' }}
                >
                  My Beautiful Princess
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="space-y-3 text-sm sm:text-base leading-relaxed max-h-[50vh] overflow-y-auto hide-scrollbar"
                  style={{ fontFamily: '"Cormorant Garamond", serif', color: '#4a1d34' }}
                >
                  <p>Today is not only your birthday...</p>
                  <p>It is the day the world received someone truly extraordinary.</p>
                  <p>
                    Thank you for filling my life with love,<br />
                    laughter,<br />
                    kindness,<br />
                    and endless beautiful memories.
                  </p>
                  <p>
                    May every dream in your heart come true.<br />
                    May your smile shine forever.<br />
                    May happiness always choose you.
                  </p>
                  <p>No matter where life takes us,</p>
                  <p>
                    I promise to protect your smile,<br />
                    support your dreams,<br />
                    celebrate every success,<br />
                    and love you a little more every single day.
                  </p>
                  <p className="text-base sm:text-lg font-semibold pt-2" style={{ fontFamily: '"Playfair Display", serif', color: '#9f1239' }}>
                    Happy Birthday,<br />
                    My Forever Love.
                  </p>
                  <p className="text-lg sm:text-xl font-bold" style={{ color: '#e11d48' }}>
                    I Love You ❤️
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ENDING SCREEN                                          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showEnding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md px-4 pointer-events-none"
              transition={{ duration: 1.2 }}
              onAnimationComplete={() => { document.body.style.overflow = 'auto'; }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEnding(false)}
                className="absolute top-24 right-6 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-pink-500 shadow-[0_4px_15px_rgba(236,72,153,0.15)] hover:bg-pink-50 transition-colors z-[110] pointer-events-auto cursor-pointer border border-pink-100"
              >
                <X size={20} />
              </button>
              {/* Sparkles background */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`end-sparkle-${i}`}
                  className="absolute text-amber-400/40"
                  style={{
                    top: `${(i * 7 + 5) % 95}%`,
                    left: `${(i * 9 + 3) % 95}%`,
                    fontSize: `${8 + (i % 3) * 4}px`,
                  }}
                  animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                >
                  ✦
                </motion.div>
              ))}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 drop-shadow-sm"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #9f1239, #e11d48, #fb7185)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ✨ Forever Begins... ✨
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-pink-600/70 text-sm md:text-base tracking-wide mb-6"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Made with all my love
              </motion.p>

              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-4xl md:text-5xl -rotate-3 drop-shadow-sm"
                style={{ fontFamily: '"Allura", cursive', color: '#9f1239' }}
              >
                — Sajith ♡
              </motion.p>

              {/* Slow heart pulse */}
              <motion.div
                className="mt-8"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={28} className="text-pink-500 fill-pink-500 drop-shadow-md" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
