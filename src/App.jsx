import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TypeAnimation } from 'react-type-animation';
import {
  Heart, Sparkles, Pause, Play,
  X, Gift, Smile, Flame, Crown, Quote, Flower2
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
/*  2. SPLASH / INTRO SCREEN                                             */
/* ═══════════════════════════════════════════════════════════════════════ */
function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="mt-10 flex gap-1.5"
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
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  3. TOP NAVIGATION                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed top-4 left-4 right-4 z-40 nav-premium-glass rounded-2xl"
    >
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <motion.div whileHover={{ rotate: 20, scale: 1.1 }} className="text-pink-400">
          <Flower2 size={22} />
        </motion.div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {['HOME', 'JOURNEY', 'UNIVERSE', 'MOMENTS', 'LETTER', 'WHY YOU', 'CELEBRATE'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="nav-link-elegant text-[10px] lg:text-[11px] tracking-[0.2em] text-pink-500/80 hover:text-pink-700 transition-colors font-sans uppercase font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        <motion.div
          className="text-pink-400"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <Heart size={18} className="fill-pink-300" />
        </motion.div>
      </div>
    </motion.nav>
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
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 lg:bottom-10 lg:right-10 z-50 flex items-center gap-3"
    >
      <audio ref={audioRef} src="/song.mp3" loop />

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
/* ═══════════════════════ MAIN APP ═════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const blowCandles = () => {
    setCandlesBlown(true);

    // Massive confetti explosion
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.8 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2', '#fbbf24', '#a855f7']
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.8 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2', '#fbbf24', '#a855f7']
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => {
      confetti({
        particleCount: 250,
        spread: 160,
        startVelocity: 50,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#a855f7', '#fbbf24', '#ffffff'],
        zIndex: 100
      });
    }, 400);
  };

  const qualities = [
    { icon: Smile, title: 'Your Smile', desc: 'Your smile lights up the darkest rooms and fills every heart around you with pure, uncontainable joy.' },
    { icon: Heart, title: 'Your Kindness', desc: 'You carry kindness like second nature — every gentle word and thoughtful gesture makes the world warmer.' },
    { icon: Flame, title: 'Your Spirit', desc: 'Your spirit is fire and grace combined — bold enough to chase dreams, tender enough to lift others along the way.' },
    { icon: Crown, title: 'Your Strength', desc: 'You face every storm with unshakable grace, turning challenges into triumphs with elegance that inspires everyone.' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-pink-50 font-sans overflow-x-hidden grid-pattern">

      {/* ─── Splash Screen ─── */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* ─── Background Continuous Animations ─── */}
      {!showSplash && <GlobalFloatingElements />}

      {/* ─── Navigation ─── */}
      {!showSplash && <Navigation />}

      {/* ─── Audio Player ─── */}
      {!showSplash && <AudioPlayer />}

      {/* ─── Surprise Modal ─── */}
      <SurpriseModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  HERO SECTION                                                  */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-[100svh] lg:min-h-[calc(100vh-48px)] flex items-center justify-center px-6 md:px-12 lg:px-20 pt-16 pb-8 lg:pt-12 lg:pb-6 z-10 overflow-hidden"
      >
        {/* ── Soft radial glow behind heading area ── */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-pink-100/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* ═══════ LEFT COLUMN — Content ═══════ */}
          <div className="flex-1 text-center lg:text-left max-w-xl lg:max-w-lg z-10 order-2 lg:order-1 mt-4 lg:mt-0">

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
              className="text-5xl sm:text-6xl md:text-[4rem] lg:text-[4.2rem] xl:text-[5rem] font-serif font-bold leading-[1.05] text-pink-800 hero-heading-glow tracking-tight"
            >
              Happy Birthday
            </motion.h1>

            {/* Cursive subtitle with blossom icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-2 md:mt-3 flex items-center gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <span className="text-xl md:text-2xl opacity-90 drop-shadow-sm">🌸</span>
              <p className="text-2xl md:text-3xl lg:text-4xl font-cursive text-pink-600 drop-shadow-sm">
                My Beautiful Love
              </p>
              <span className="text-xl md:text-2xl opacity-90 drop-shadow-sm">🌸</span>
            </motion.div>

            {/* Champagne divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="champagne-divider w-40 md:w-48 mx-auto lg:mx-0 mt-3 md:mt-4"
            />

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-3 md:mt-4 text-pink-700/70 font-sans text-sm md:text-base leading-relaxed font-light max-w-[380px] mx-auto lg:mx-0"
            >
              You are the most extraordinary soul I've ever known. Today, the entire universe celebrates the beautiful miracle that is you.
            </motion.p>

            {/* Type animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-2 md:mt-3 h-6 md:h-8 flex items-center justify-center lg:justify-start"
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
                className="text-pink-700/80 font-sans text-sm md:text-base italic font-light"
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
              className="hero-btn-shine relative mt-4 md:mt-6 px-8 md:px-10 py-3 md:py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-pink-500 to-rose-500 text-white font-sans text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg shadow-pink-300/40 cursor-pointer transition-all flex items-center gap-2 md:gap-3 mx-auto lg:mx-0 overflow-hidden"
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
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', bounce: 0.2 }}
            className="flex-1 relative z-10 order-1 lg:order-2 max-w-[260px] sm:max-w-xs lg:max-w-[340px] xl:max-w-[380px] w-full"
          >
            {/* Ambient glow behind image */}
            <div className="absolute -inset-8 bg-gradient-to-br from-pink-200/40 via-pink-300/30 to-rose-200/40 rounded-[60px] blur-[40px] ambient-glow pointer-events-none" />

            {/* Glass frame with image */}
            <div className="relative hero-glass-frame hero-image-reflection">
              <img
                src="/1.png"
                alt="Birthday Girl"
                className="w-full aspect-[3/4] object-cover rounded-[33px]"
              />
            </div>

            {/* ── Floating glassmorphism labels ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -left-4 md:-left-8 top-[15%] floating-label-glass rounded-full px-4 py-2 md:px-5 md:py-2.5 cursor-default"
            >
              <span className="text-xs md:text-sm font-sans font-medium text-pink-700/90 tracking-wide">❤️ Forever</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="absolute -right-4 md:-right-6 top-[45%] floating-label-glass rounded-full px-4 py-2 md:px-5 md:py-2.5 cursor-default"
            >
              <span className="text-xs md:text-sm font-sans font-medium text-pink-700/90 tracking-wide">🌸 Birthday Girl</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="absolute -left-2 md:-left-4 bottom-[12%] floating-label-glass rounded-full px-4 py-2 md:px-5 md:py-2.5 cursor-default"
            >
              <span className="text-xs md:text-sm font-sans font-medium text-pink-700/90 tracking-wide">⭐ My Universe</span>
            </motion.div>

            {/* ── Decorative sparkle stars ── */}
            <div className="absolute -top-4 -right-4 text-amber-400/60 text-lg twinkle-star" style={{ animationDelay: '0s' }}>✦</div>
            <div className="absolute top-[25%] -right-8 text-pink-300/50 text-sm twinkle-star" style={{ animationDelay: '0.8s' }}>✦</div>
            <div className="absolute -bottom-2 right-[20%] text-amber-400/50 text-base twinkle-star" style={{ animationDelay: '1.5s' }}>✦</div>
            <div className="absolute top-[10%] -left-6 text-pink-300/40 text-xs twinkle-star" style={{ animationDelay: '2s' }}>✦</div>
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
      <FadeSection id="journey" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden">
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
      <FadeSection id="universe" className="relative z-10 min-h-[100svh] lg:min-h-[100vh] flex flex-col justify-center py-16 lg:py-0 px-6 overflow-hidden">
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
      <FadeSection id="moments" className="relative z-10 py-24 md:py-32 px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-800 text-center mb-2 drop-shadow-sm">
          Cherished Moments
        </h2>
        <p className="text-pink-500 font-cursive text-2xl md:text-3xl text-center mb-12 drop-shadow-sm">
          Every picture tells your beautiful story ✨
        </p>

        <div className="flex gap-8 overflow-x-auto hide-scrollbar px-6 pb-12 snap-x snap-mandatory max-w-6xl mx-auto">
          {['/3.jpg', '/4.jpg', '/5.jpg'].map((src, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 snap-center"
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="relative bg-white rounded-xl p-3 shadow-xl shadow-pink-200/40 border border-pink-50">
                <img
                  src={src}
                  alt={`Cherished moment ${i + 1}`}
                  className="w-72 sm:w-80 md:w-88 aspect-[4/5] object-cover rounded-lg border-4 border-white"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg p-5 pt-10">
                  <p className="text-white font-cursive text-xl md:text-2xl text-center">
                    {['A moment frozen in love', 'Where every glance is a story', 'Pure magic, pure you'][i]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  LETTER SECTION                                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="letter" className="relative z-10 py-24 md:py-32 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-block mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto shadow-inner shadow-pink-200/50">
            <Quote size={28} className="text-pink-500" />
          </div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-800 mb-2 drop-shadow-sm">
          A Letter Written in Stars
        </h2>
        <p className="text-pink-500 font-cursive text-2xl md:text-3xl mb-12 drop-shadow-sm">
          Words from the deepest corner of the heart
        </p>

        <blockquote className="relative bg-white/70 backdrop-blur-lg rounded-[2rem] p-10 md:p-14 shadow-xl shadow-pink-200/30 border border-pink-100 text-left">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full opacity-60" />

          <p className="text-pink-900/80 font-sans leading-loose text-lg md:text-xl font-light">
            You are a beautiful dream that the universe carefully wove into reality.
            You carry a light so warm and golden that everyone around you feels its glow.
            You bring so much magic into ordinary moments — turning simple laughter into
            music and quiet silences into the most comforting poetry.
          </p>
          <p className="mt-6 text-pink-900/80 font-sans leading-loose text-lg md:text-xl font-light">
            You make every moment magical, every heartbeat meaningful, and every day
            worth celebrating. You are kindness wrapped in grace, courage wrapped in
            softness, and beauty wrapped in the purest soul this world has ever known.
          </p>

          <footer className="mt-12 pt-8 border-t border-pink-100 text-center">
            <p className="text-pink-600 font-cursive text-3xl md:text-4xl">
              Forever yours, Sajith
            </p>
            <Heart size={20} className="text-pink-400 fill-pink-400 mx-auto mt-4" />
          </footer>
        </blockquote>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  WHY YOU ARE EXTRAORDINARY                                     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="why-you" className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-800 text-center mb-2 drop-shadow-sm">
          Why You Are Extraordinary
        </h2>
        <p className="text-pink-500 font-cursive text-2xl md:text-3xl text-center mb-16 drop-shadow-sm">
          Just a few of the million reasons you are adored
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualities.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-pink-100/50 border border-pink-50 text-center group cursor-default transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center mx-auto mb-6 group-hover:from-pink-100 group-hover:to-pink-200 transition-colors shadow-inner shadow-pink-100/50">
                <q.icon size={28} className="text-pink-500" />
              </div>
              <h3 className="font-serif font-bold text-pink-800 text-xl mb-3">
                {q.title}
              </h3>
              <p className="text-pink-700/70 font-sans text-base leading-relaxed font-light">
                {q.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </FadeSection>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  CAKE FINALE                                                   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <FadeSection id="celebrate" className="relative z-10 py-28 md:py-36 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-pink-800 mb-3 drop-shadow-sm">
          The Grand Finale
        </h2>
        <p className="text-pink-500 font-cursive text-2xl md:text-3xl mb-16 drop-shadow-sm">
          Make a wish, close your eyes...
        </p>

        <motion.div
          className="text-8xl md:text-[10rem] mb-10 drop-shadow-xl"
          animate={
            candlesBlown
              ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }
              : { y: [0, -10, 0] }
          }
          transition={{ repeat: Infinity, duration: candlesBlown ? 0.5 : 2 }}
        >
          🎂
        </motion.div>

        {!candlesBlown && (
          <motion.div
            className="flex justify-center gap-5 mb-12 text-3xl md:text-4xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🕯️🕯️🕯️🕯️🕯️
          </motion.div>
        )}

        {candlesBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 text-3xl md:text-4xl"
          >
            ✨🎉🥳💖🎊✨
          </motion.div>
        )}

        <motion.button
          onClick={!candlesBlown ? blowCandles : undefined}
          whileHover={!candlesBlown ? { scale: 1.05 } : {}}
          whileTap={!candlesBlown ? { scale: 0.95 } : {}}
          className={`px-12 py-5 rounded-full font-sans text-sm md:text-base font-bold tracking-widest uppercase text-white shadow-xl cursor-pointer transition-all duration-500 border-2 ${candlesBlown
            ? 'bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 shadow-amber-300/40 border-transparent'
            : 'bg-pink-500 hover:bg-pink-600 shadow-pink-300/50 border-pink-400'
            }`}
        >
          {candlesBlown ? (
            <span className="flex items-center gap-2">
              <Sparkles size={20} />
              WISH MADE! THE MAGIC IS REAL
              <Sparkles size={20} />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Flame size={20} />
              BLOW OUT THE CANDLES!
            </span>
          )}
        </motion.button>

        {candlesBlown && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-pink-500/80 font-cursive text-3xl"
          >
            "You are the wish that already came true" 💕
          </motion.p>
        )}
      </FadeSection>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative z-10 py-12 text-center border-t border-pink-100">
        <p className="text-pink-400/60 font-sans text-[10px] tracking-[0.3em] uppercase">
          Made with 💕 just for you
        </p>
        <p className="text-pink-400 font-cursive text-xl mt-3">
          Forever yours, Sajith
        </p>
      </footer>
    </div>
  );
}
