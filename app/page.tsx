'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Luckiest_Guy, JetBrains_Mono, Pinyon_Script } from 'next/font/google';
import {
  AlertTriangle,
  Trophy,
  Star,
  Shield,
  Wifi,
  HelpCircle,
  Users,
  QrCode,
  Hexagon,
  Award,
  MapPin,
  Terminal,
  Bug,
  Layout,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Network,
  Zap,
  Fingerprint,
  Activity,
  Scan,
  Map
} from 'lucide-react';

// --- Font Configuration ---
const luckiestGuy = Luckiest_Guy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-luckiest-guy',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon-script',
  display: 'swap',
});

// --- Constants & Variants ---
const SPRING_TRANSITION = { type: 'spring', damping: 20, stiffness: 100 };

const slideVariants: any = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    rotateY: direction < 0 ? 45 : -45,
    transition: {
      duration: 0.4,
    },
  }),
};

// --- Decorative Components ---

const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,35,33,0.05),transparent_70%)]" />
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.15, 0.1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-red-900/10 blur-[150px]"
    />
    <motion.div
      animate={{
        x: [-20, 20, -20],
        y: [-20, 20, -20],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-900/5 blur-[120px]"
    />
    {/* Scanlines Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20" />
  </div>
);

const TechLines = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-20">
    <svg width="100%" height="100%" className="text-red-900/30">
      <pattern id="tech-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 L 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 90 0 L 100 0 L 100 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 90 100 L 100 100 L 100 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M 10 100 L 0 100 L 0 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#tech-pattern)" />
    </svg>
  </div>
);

const Barcode = () => (
  <div className="flex h-8 w-full items-end justify-between px-2 gap-0.5 opacity-40">
    {[...Array(24)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${Math.random() * 100}%` }}
        className="bg-current"
        style={{ width: i % 3 === 0 ? '3px' : '1px' }}
      />
    ))}
  </div>
);

// --- Refactored Slide Components ---

const SlideHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
  <header className="w-full px-8 md:px-12 py-10 flex justify-between items-end border-b-2 border-red-900/30 bg-black/40 backdrop-blur-3xl z-40 relative group">
    <TechLines />
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.08, x: 0 }}
        className="absolute -top-12 -left-8 text-white text-[10rem] font-brand select-none pointer-events-none -z-10 whitespace-nowrap"
      >
        {subtitle.split(' ')[0]}
      </motion.div>
      <div className="flex items-center gap-6">
        <motion.div
          initial={{ rotate: -15, scale: 0.8 }}
          animate={{ rotate: -3, scale: 1 }}
          className="bg-red-900 p-3 rounded-xl border-2 border-white/20 shadow-[0_0_30px_rgba(153,27,27,0.4)] relative"
        >
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full border-2 border-red-900 animate-pulse" />
          {Icon && <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />}
        </motion.div>
        <div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl text-white tracking-tighter font-brand"
          >
            {title}
          </motion.h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-mono-bold text-red-600 text-sm tracking-[0.2em] uppercase">Status: ACTIVE</span>
            <div className="h-0.5 w-12 bg-red-900/50" />
            <p className="text-slate-400 text-lg md:text-xl font-mono tracking-tight uppercase">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="text-right hidden lg:block relative z-10">
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-4">
        <div className="text-right">
          <div className="text-red-600 text-[10px] font-mono-bold tracking-widest uppercase mb-1">Regional Access</div>
          <div className="text-white text-xl tracking-wider font-brand">ASTANA // KAZ</div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <QrCode className="w-10 h-10 text-white/40" />
      </div>
    </div>
  </header>
);

const BadgeMockup = ({ role, color, quantity }: { role: string, color: string, quantity: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      whileHover={{ y: -20 }}
      className="flex flex-col items-center gap-4 group cursor-pointer"
    >
      {/* Heavy Duty Lanyard Attachment */}
      <div className="w-full h-20 relative flex justify-center -mb-6 z-30">
        <div className="w-10 h-10 bg-slate-900 rounded-full border-4 border-slate-700 shadow-2xl flex items-center justify-center">
          <div className="w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-600" />
        </div>
        <div className="absolute top-8 w-1 h-8 bg-slate-700 shadow-xl" />
      </div>

      <div className="relative perspective-1000 z-10 w-80 h-[520px]">
        {/* Glow behind the badge */}
        <div className={`absolute -inset-10 ${color.replace('bg-', 'bg-')}/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full relative"
        >
          {/* FRONT SIDE - TACTICAL DARK */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-950 rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col border-[4px] border-slate-800"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Sponsor Micro-Line */}
            <div className="h-10 bg-black flex items-center justify-center gap-4 px-6 border-b border-white/5">
              <span className="text-[6px] font-mono text-slate-500 uppercase tracking-[0.5em]">SYSTEM_PARTNERS // 2026 // NODE_01</span>
            </div>

            {/* Background Textures */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:16px_16px]" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -rotate-6" />
              <div className="absolute top-2/3 left-0 w-full h-px bg-white/5 rotate-12" />
            </div>

            {/* Vertical Identity text */}
            <div className="absolute left-4 top-24 bottom-24 w-12 flex items-center justify-center">
              <span className="rotate-[-90deg] whitespace-nowrap text-[10px] font-mono-bold text-slate-700 tracking-[1em] uppercase">CSHACK_REGISTRY_V2.0</span>
            </div>

            {/* Main Content Area */}
            <div className="ml-16 mr-8 mt-12 mb-8 flex-1 flex flex-col items-start relative z-10">
              {/* Technical Module instead of Photo */}

              {/* Role/Name Section */}
              <div className="space-y-6 w-full mt-14">
                <div>
                  <div className="text-[10px] font-mono text-red-600 tracking-widest mb-2 flex items-center gap-2">
                    <Scan size={10} /> ACCESS_GRANTED
                  </div>
                  <h3 className="text-4xl font-brand text-white leading-none tracking-tight">STUDENT_USER</h3>
                </div>

                <div className={`inline-block px-4 py-1.5 rounded-sm border-l-4 border-white font-mono text-sm text-white shadow-[0_0_20px_rgba(255,0,255,0.1)] ${color}`}>
                  {role}
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5 w-full">
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Hash_ID</span>
                    <span className="text-white">8f7...21c</span>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Sect_Ref</span>
                    <span className="text-white">DELTA_6</span>
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Auth_LVL</span>
                    <span className="text-white">CLASS_A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Fingerprint Area */}
            <div className="h-24 bg-black/50 px-8 flex items-center gap-6 border-t border-white/5 relative">
              <div className="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-red-600 transition-colors">
                <Fingerprint size={24} className="text-slate-600 group-hover:text-red-600 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-[7px] font-mono text-slate-600 uppercase mb-1">Fingerprint Data Verified</div>
                <Barcode />
              </div>
            </div>
          </div>

          {/* BACK SIDE - BLUEPRINT / SCHEMATIC */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-900 rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col border-[4px] border-slate-800"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Blueprint Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

            <div className="p-8 flex-1 flex flex-col relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="text-[10px] font-mono-bold text-red-500 uppercase tracking-[0.4em]">Node topology // v.7</div>
                <Hexagon size={24} className="text-white/20" />
              </div>

              {/* Large Schematic Map Illustration */}
              <div className="flex-1 relative border border-white/5 rounded-2xl bg-black/20 overflow-hidden flex items-center justify-center p-4">
                <Map size={180} className="text-white/5 stroke-[0.5]" />
                {/* Animated Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2 + i, repeat: Infinity }}
                    className="absolute w-2 h-2 bg-red-600 rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`
                    }}
                  />
                ))}
                {/* Drawing lines between nodes */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>

                <div className="absolute bottom-4 left-4 text-[7px] font-mono text-white/30 uppercase">
                  COORD: 43.120 / -108.452 // LEVEL_03
                </div>
              </div>

              {/* Massive QR and Support Info */}
              <div className="mt-8 flex gap-6 items-end">
                <div className="w-24 h-24 bg-white p-2 rounded-lg shrink-0">
                  <QrCode size={80} className="text-black" />
                </div>
                <div className="flex-1 space-y-3 pb-2">
                  <div className="text-[8px] font-mono text-slate-400 leading-tight uppercase">
                    If found, please return to any Information Desk or contact network administration at 0x88F23A.
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between">
                    <span className="text-[8px] font-mono-bold text-red-500 tracking-widest uppercase">Emergency Protocol</span>
                    <span className="text-[8px] font-mono text-white uppercase tracking-tighter">SIG_ALPHA_NINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety/Status Strip */}
            <div className={`h-12 w-full ${color} opacity-80 flex items-center justify-center overflow-hidden`}>
              <div className="whitespace-nowrap flex gap-8 animate-[marquee_20s_linear_infinity]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[10px] font-mono-bold text-black uppercase tracking-[0.5em]">
                    SYSTEMS_NOMINAL // ENCRYPTION_ACTIVE // DATA_SYNC_COMPLETE //
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Batch Holder with magnetic glow */}
      <div className="relative mt-6">
        <div className={`absolute -inset-4 ${color.replace('bg-', 'bg-')}/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-slate-800 px-6 py-2 rounded-xl shadow-2xl relative z-20 flex items-center gap-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-brand text-white">{quantity}</span>
            <span className="text-[8px] font-mono-bold text-slate-500 uppercase tracking-widest">Units Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LogoStand = ({ title }: { title: string }) => (
  <div className="relative group perspective-1000">
    {/* Floor base */}
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-12 bg-slate-900 shadow-2xl rounded-full blur-xl opacity-60" />

    <div className="w-40 h-[280px] bg-slate-900 rounded-2xl relative overflow-hidden border-t-8 border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-slate-800" />
      <div className="absolute inset-0 p-4 border border-white/10 rounded-2xl m-2 flex flex-col items-center justify-center gap-6">
        <Hexagon className="w-12 h-12 text-red-700 animate-pulse" />
        <div className="h-px w-full bg-white/10" />
        <div className="text-center">
          <div className="text-[8px] font-mono-bold text-red-600 tracking-widest uppercase mb-1">Official</div>
          <div className="text-xl font-brand text-white leading-tight uppercase">{title}</div>
        </div>
      </div>

      {/* Light glow at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-red-600/10 to-transparent" />
    </div>

    {/* Physical structure details */}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-2 bg-slate-800 rounded-full border-t border-white/10" />
  </div>
);



const BannerMockup = ({ title, format }: { title: string, format: string }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    className="relative group perspective-1000"
  >
    {/* Stand Framework */}
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-slate-900 rounded-full blur-sm opacity-50" />
    <div className="w-64 h-[500px] bg-slate-950 border-x-[12px] border-t-[12px] border-slate-900 rounded-t-3xl relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-white opacity-5 pointer-events-none" />
      <TechLines />

      {/* Banner Content */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-between text-center">
        <div className="w-16 h-16 bg-red-900 rounded-2xl flex items-center justify-center p-3">
          <Hexagon className="w-full h-full text-white" />
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-mono-bold text-red-600 tracking-[0.5em] uppercase">Sponsor Area</div>
          <h4 className="text-3xl font-brand text-white leading-none">{title}</h4>
        </div>

        <div className="w-full space-y-2">
          <div className="h-0.5 w-full bg-white/10" />
          <div className="text-[8px] font-mono text-slate-500 uppercase">{format}</div>
        </div>
      </div>

      {/* Lighting Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </div>
  </motion.div>
);

const PressStage = () => (
  <div className="w-full max-w-5xl aspect-video bg-slate-950 border-8 border-slate-900 rounded-2xl relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] perspective-1000">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />
    <TechLines />

    {/* Step & Repeat Pattern */}
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 p-12 opacity-30">
      {[...Array(36)].map((_, i) => (
        <div key={i} className="flex items-center justify-center p-4">
          {i % 2 === 0 ? (
            <Hexagon className="text-red-900 w-8 h-8" />
          ) : (
            <div className="text-[10px] font-brand text-white tracking-tighter">CSC HACK</div>
          )}
        </div>
      ))}
    </div>

    {/* Central Focus */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div className="bg-black/80 px-12 py-6 rounded-3xl border-2 border-red-900/50 backdrop-blur-xl shadow-2xl transform -rotate-1">
        <h3 className="text-6xl md:text-8xl font-brand text-white text-center">
          <span className="text-red-700">PHOTO</span> ZONE
        </h3>
        <p className="text-center font-mono-bold text-slate-500 tracking-[0.3em] uppercase mt-2">Industrial Series // Astana</p>
      </div>
    </div>

    {/* Red Carpet / Floor Mockup */}
    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-red-950/50 to-transparent border-t border-red-900/20" />

    {/* Spotlight Effects */}
    <div className="absolute -top-20 left-1/4 w-32 h-64 bg-white/10 blur-[60px] transform -rotate-12" />
    <div className="absolute -top-20 right-1/4 w-32 h-64 bg-red-600/10 blur-[60px] transform rotate-12" />
  </div>
);

const PremiumCertificate = ({ recipient = "PREMIUM RECIPIENT", award = "TEAM INNOVATOR" }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0, rotateY: 5 }}
    whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
    className="w-full max-w-4xl aspect-[1.414/1] bg-white rounded-sm p-1 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative group overflow-hidden"
  >
    {/* Industrial Outer Border */}
    <div className="absolute inset-0 border-[12px] border-slate-950 flex items-center justify-center">
      <div className="absolute inset-0 border-[1px] border-white/20 m-1" />
    </div>

    {/* Digital Guilloche / Pattern Background */}
    <div className="absolute inset-[12px] bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] scale-150 rotate-12 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]" />

      {/* Corner Tech Ornaments */}
      {[0, 90, 180, 270].map((rot) => (
        <div key={rot} className="absolute w-24 h-24 border-red-900/10 border-t-2 border-l-2"
          style={{ transform: `rotate(${rot}deg)`, top: rot < 180 ? '20px' : 'auto', bottom: rot >= 180 ? '20px' : 'auto', left: (rot === 0 || rot === 270) ? '20px' : 'auto', right: (rot === 90 || rot === 180) ? '20px' : 'auto' }} />
      ))}
    </div>

    {/* Main Content Area */}
    <div className="absolute inset-[40px] border-2 border-red-900/20 flex flex-col items-center p-12 text-slate-950">
      <div className="space-y-2 mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-0.5 w-12 bg-red-900" />
          <span className="font-mono-bold text-[10px] tracking-[0.5em] text-red-700 uppercase">Industrial Series 2026</span>
          <div className="h-0.5 w-12 bg-red-900" />
        </div>
        <h3 className="text-6xl font-brand tracking-tighter leading-none italic uppercase">Certificate</h3>
        <p className="font-mono-bold text-slate-400 tracking-[0.3em] uppercase text-xs">Of Outstanding Achievement</p>
      </div>

      <div className="w-full text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">This document verifies that</p>
          <h2 className="text-7xl font-brand text-red-900 tracking-tight underline decoration-slate-200 decoration-dotted underline-offset-8">
            {recipient}
          </h2>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">Has successfully demonstrated mastery in</p>
          <div className="bg-slate-900 inline-block px-10 py-3 rounded-full transform -rotate-1 shadow-xl">
            <span className="text-3xl font-brand text-white tracking-widest">{award}</span>
          </div>
        </div>
      </div>

      {/* Signature & Verification Footer */}
      <div className="w-full mt-auto grid grid-cols-3 items-end gap-12">
        <div className="text-center space-y-2">
          <div className="font-accent text-3xl text-slate-800 h-10 border-b border-slate-200">Smaiyl I.</div>
          <div className="text-[8px] font-mono-bold text-slate-400 uppercase tracking-widest">Lead Organizer</div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Holographic Seal */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-red-900 rounded-full animate-pulse opacity-20" />
            <div className="absolute inset-2 border-4 border-dashed border-red-900/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 bg-white shadow-xl rounded-full flex items-center justify-center border-2 border-red-900/50">
              <Hexagon className="text-red-900 w-10 h-10" />
            </div>
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-full pointer-events-none" />
          </div>
          <div className="text-[7px] font-mono text-red-900/40 text-center leading-tight">
            HASH_AUTH_9.231.0<br />VERIFIED_INDUSTRIAL_NODE
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="font-accent text-3xl text-slate-800 h-10 border-b border-slate-200">Adilbek M.</div>
          <div className="text-[8px] font-mono-bold text-slate-400 uppercase tracking-widest">Chief Arbitrator</div>
        </div>
      </div>
    </div>

    <div className="absolute left-[12px] top-[12px] bottom-[12px] w-[6px] bg-red-900 opacity-20" />
    <div className="absolute right-[12px] top-[12px] bottom-[12px] w-[6px] bg-red-900 opacity-20" />
  </motion.div>
);

// --- Main Application ---

export default function HackathonDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 'intro',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center relative bg-slate-950 px-4">
          <GridBackground />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10"
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mb-10 inline-flex items-center justify-center p-12 bg-red-900 rounded-[3rem] shadow-[0_0_60px_rgba(153,27,27,0.5)] border-4 border-white/10 relative overflow-hidden"
            >
              <TechLines />
              <Hexagon className="text-white w-24 h-24 relative z-10" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <h1 className="text-[7rem] md:text-[12rem] text-white leading-[0.75] mb-12 font-brand drop-shadow-[12px_12px_0px_#932321] tracking-tighter">
              CSC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-600">HACK</span>
            </h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mb-16 inline-block"
            >
              <div className="absolute -inset-1 bg-red-600 rounded-full blur opacity-30 animate-pulse" />
              <div className="relative bg-white text-slate-950 px-10 py-4 rounded-full shadow-2xl transform hover:rotate-0 rotate-2 transition-transform duration-500">
                <p className="text-2xl md:text-4xl font-brand tracking-widest uppercase">New School Experience</p>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-6 md:gap-10 justify-center z-20 relative">
              {[
                { label: 'LOC // ASTANA', icon: MapPin },
                { label: 'DATE // FEB 7-8', icon: Layout },
                { label: 'VER // 2.0.26', icon: Terminal }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-black/40 border border-white/10 px-8 py-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl group hover:border-red-900/50 transition-colors"
                >
                  <item.icon size={28} className="text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-mono-bold text-xl tracking-tight">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'identity',
      content: (
        <div className="flex flex-col h-full bg-slate-950 relative">
          <GridBackground />
          <SlideHeader title="Participant Identity" subtitle="Identity Hardware" icon={Users} />
          <div className="flex-1 flex items-center justify-center p-8">
            <BadgeMockup role="PARTICIPANT" color="bg-red-800" quantity="80" />
          </div>
        </div>
      )
    },
    {
      id: 'staff',
      content: (
        <div className="flex flex-col h-full bg-slate-950">
          <SlideHeader title="The Enforcers" subtitle="Organization & Oversight" icon={Terminal} />
          <div className="flex-1 grid md:grid-cols-2 gap-12 p-12 items-center justify-center overflow-auto md:overflow-hidden">
            <BadgeMockup role="COORDINATOR" color="bg-emerald-600" quantity="3" />
            <BadgeMockup role="JURY" color="bg-amber-500" quantity="5" />
          </div>
        </div>
      )
    },
    {
      id: 'volunteers',
      content: (
        <div className="flex flex-col h-full bg-slate-950">
          <SlideHeader title="The Support" subtitle="Volunteer Network" icon={Award} />
          <div className="flex-1 flex items-center justify-center p-8">
            <BadgeMockup role="VOLUNTEER" color="bg-indigo-600" quantity="15" />
          </div>
        </div>
      )
    },

    {
      id: 'infrastructure',
      content: (
        <div className="flex flex-col h-full bg-slate-950">
          <SlideHeader title="Sponsorship Spec" subtitle="Physical Branding" icon={Layout} />
          <div className="flex-1 flex items-center justify-center gap-12 p-8 overflow-auto">
            <BannerMockup title="MAIN SPONSOR" format="VERTICAL // 1.5x3m" />
            <BannerMockup title="TECH PARTNER" format="VERT // 1x2m" />
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="bg-red-900/10 border border-white/10 p-6 rounded-2xl">
                <p className="text-white font-brand text-xl mb-4 uppercase">Infrastructure Specs</p>
                <ul className="space-y-3 font-mono text-xs text-slate-400">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Banner Count</span>
                    <span className="text-white font-bold">12 Total</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Stand Type</span>
                    <span className="text-white font-bold">X-Frame</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Print Quality</span>
                    <span className="text-white font-bold">720 DPI</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-8 pt-0 flex justify-center gap-12 overflow-x-auto">
            <LogoStand title="Check-in" />
            <LogoStand title="Help Desk" />
            <LogoStand title="Coffee Bar" />
            <LogoStand title="Gaming" />
          </div>
        </div>
      )
    },
    {
      id: 'press-stage',
      content: (
        <div className="flex flex-col h-full bg-slate-950">
          <SlideHeader title="Victory Wall" subtitle="Press Stage & Photo Zone" icon={QrCode} />
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <PressStage />
            <div className="mt-8 bg-black/40 px-12 py-4 rounded-full border border-white/5 backdrop-blur flex gap-12">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-mono-bold uppercase">Dimensions</div>
                <div className="text-2xl text-white font-brand">4.5m x 2.4m</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-mono-bold uppercase">Logo Spacing</div>
                <div className="text-2xl text-white font-brand">150mm Grid</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'awards',
      content: (
        <div className="flex flex-col h-full bg-slate-950 relative overflow-hidden">
          <GridBackground />
          <SlideHeader title="The Victory" subtitle="Awards & Recognition" icon={Trophy} />
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <PremiumCertificate recipient="ALTYNBEK TEAM" award="GRAND PRIX 2026" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-8 flex gap-8 items-center bg-black/40 px-8 py-4 rounded-2xl border border-white/5 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500 w-5 h-5" />
                <span className="text-white font-brand text-lg">GOLD FOIL SEAL</span>
              </div>
              <div className="w-1 h-8 bg-white/10" />
              <div className="flex items-center gap-3">
                <Award className="text-red-500 w-5 h-5" />
                <span className="text-white font-brand text-lg">HAND-NUMBERED</span>
              </div>
              <div className="w-1 h-8 bg-white/10" />
              <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
                PAPER: 350GSM SOFT TOUCH
              </div>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const paginate = (newDirection: number) => {
    const next = currentSlide + newDirection;
    if (next >= 0 && next < slides.length) {
      setDirection(newDirection);
      setCurrentSlide(next);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <main className={`${luckiestGuy.variable} ${jetbrainsMono.variable} ${pinyonScript.variable} w-full h-screen bg-black text-white overflow-hidden selection:bg-red-800 selection:text-white`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full perspective-1000"
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <nav className="absolute bottom-8 right-8 z-50 flex items-center gap-6">
        <div className="text-white/40 font-brand text-2xl tracking-widest bg-black/60 px-6 py-2 rounded-2xl backdrop-blur-xl border border-white/5">
          <span className="text-white">{currentSlide + 1}</span>
          <span className="mx-2 opacity-20">/</span>
          <span>{slides.length}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className="p-5 rounded-2xl bg-white/5 hover:bg-red-800 text-white disabled:opacity-20 transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === slides.length - 1}
            className="p-5 rounded-2xl bg-red-800 hover:bg-white hover:text-red-800 text-white transition-all shadow-2xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </nav>

      {/* Status Bar */}
      <div className="absolute bottom-8 left-8 z-50 pointer-events-none">
        <div className="flex items-center gap-4 bg-black/60 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl">
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-red-600 rounded-full animate-ping" />
            <div className="relative w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_red]" />
          </div>
          <span className="text-[10px] font-mono-bold tracking-[0.3em] uppercase opacity-60">Session: ASTANA_2026</span>
        </div>
      </div>

      {/* Custom Styles for Redesign */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  );
}


