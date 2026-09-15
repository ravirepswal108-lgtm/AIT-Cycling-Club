import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TiltGlassCard } from '../components/ui/TiltGlassCard';
import { DraggableGlassCard } from '../components/ui/DraggableGlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { SahyadriContourScene } from '../components/ui/SahyadriContourScene';
import { 
  COLLEGE_NAME, 
  COLLEGE_PARENT_BODY, 
  COLLEGE_AFFILIATION, 
  CLUB_INSTAGRAM_URL, 
  CLUB_EMAIL, 
  CLUB_PHONE,
  ADVENTURE_GALLERY_CARDS
} from '../config/constants';
import { 
  Compass, 
  Mountain, 
  ShieldCheck, 
  Users, 
  Activity, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Move,
  Send,
  X,
  ExternalLink
} from 'lucide-react';
import type { Variants } from 'framer-motion';

export const HomePage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);

  // Orchestrated entrance variants
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1
      }
    }
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };


  // Adventure Gallery Cards (Draggable - Configured in src/config/constants.ts)
  const adventureCards = ADVENTURE_GALLERY_CARDS;

  // Past Activities & Milestones (Draggable)
  const pastActivities = [
    {
      id: 'past-1',
      title: 'Annual Sahyadri 200K Brevet',
      date: 'March 2026',
      badge: 'Audax India Tag',
      highlight: '24 Cadets Finished Under 9.5 Hours',
      summary: 'Pune to Satara highway crossover and steep ghat descents with zero mechanical DNFs.',
      glow: 'amber' as const,
      initialRotation: -1.5
    },
    {
      id: 'past-2',
      title: 'Campus Perimeter Night Crit',
      date: 'October 2025',
      badge: 'AIT Sports Cup',
      highlight: '35 Laps High-Cadence Circuit',
      summary: 'High-speed closed campus criterium under tactical floodlights, testing cornering precision.',
      glow: 'moss' as const,
      initialRotation: 2
    },
    {
      id: 'past-3',
      title: 'Sinhagad Hill Climb Championship',
      date: 'December 2025',
      badge: 'King of Mountain',
      highlight: 'Sub-28 Minute Summit Record',
      summary: 'All-out vertical battle from Donje toll gate to the fort plateau with electronic chip timing.',
      glow: 'amber' as const,
      initialRotation: -2
    },
    {
      id: 'past-4',
      title: 'Dighi Eco-Trail Clean-up Ride',
      date: 'January 2026',
      badge: 'Community Action',
      highlight: '120 kg Trail Waste Cleared',
      summary: 'Combined trail ride and conservation effort keeping our local Sahyadri ridges clean and ridable.',
      glow: 'moss' as const,
      initialRotation: 1
    }
  ];

  // Next Rides
  const nextRides = [
    {
      title: 'Sinhagad Fort Assault',
      distance: '65 km',
      elevation: '+850m',
      grade: 'Category 3 Climb',
      date: 'Every Sunday',
      time: '05:30 AM Muster',
      startPoint: 'AIT Main Gate, Dighi',
      pace: '24-28 km/h rolling',
      lead: 'Cadet Captain / Lead Ride Marshall',
      terrain: 'Urban tarmac -> Steep hairpins',
      glow: 'moss' as const
    },
    {
      title: 'Panshet Dam Circuit Loop',
      distance: '82 km',
      elevation: '+420m',
      grade: 'Rolling Endurance',
      date: 'Alternate Saturdays',
      time: '05:00 AM Muster',
      startPoint: 'AIT Main Gate, Dighi',
      pace: '28-32 km/h echelon',
      lead: 'Technical Pacer / Sag Wagon Escort',
      terrain: 'Smooth lakeside tarmac',
      glow: 'amber' as const
    },
    {
      title: 'Mulshi Ghat Ascent & Return',
      distance: '115 km',
      elevation: '+1,250m',
      grade: 'Century Challenge',
      date: 'Monthly Feature',
      time: '04:30 AM Muster',
      startPoint: 'AIT Main Gate, Dighi',
      pace: 'Self-paced groups with sweeps',
      lead: 'Endurance Marshal Team',
      terrain: 'High mountain passes',
      glow: 'moss' as const
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0f0b] text-[#f3efe6] overflow-hidden">
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Interactive Topographic Contour Canvas */}
        <SahyadriContourScene />

        {/* Ambient Warm Earth Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#84cc16]/10 via-[#d97706]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Official Club Logo Crest */}
            <motion.div variants={heroItemVariants} className="flex justify-center pt-2">
              <div className="relative p-3 rounded-2xl glass-panel border border-[#84cc16]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(132,204,22,0.25)] hover:scale-105 transition-transform duration-300">
                <img 
                  src={`${import.meta.env.BASE_URL}images/ait-cycling-logo-light.png`} 
                  alt="Army Institute of Technology Cycling Club Official Crest" 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_4px_12px_rgba(132,204,22,0.3)]"
                />
              </div>
            </motion.div>

            {/* Top Badge: Military Heritage & Pune Base */}
            <motion.div variants={heroItemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18231a]/80 border border-[#84cc16]/30 text-xs font-mono tracking-wider text-[#bef264] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              <span>ARMY INSTITUTE OF TECHNOLOGY · DIGHI HILLS, PUNE</span>
            </motion.div>

            {/* Main Orchestrated Headline */}
            <motion.h1 
              variants={heroItemVariants}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-[#fbfaf8]"
            >
              CONQUER THE <br />
              <span className="bg-gradient-to-r from-[#bef264] via-[#84cc16] to-[#d97706] bg-clip-text text-transparent">
                SAHYADRI RIDGES
              </span>
            </motion.h1>

            {/* Subheading with real ethos */}
            <motion.p 
              variants={heroItemVariants}
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-normal leading-relaxed"
            >
              Born on the steep climbs of Dighi Hills. Powered by military-grade road discipline, 
              brotherhood, and weekend century epics across Sinhagad, Panshet, and Mulshi.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div 
              variants={heroItemVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <GlassButton
                href="#next-rides"
                variant="moss"
                size="lg"
                className="group"
              >
                <span>Explore Next Rides</span>
                <ArrowRight className="w-4 h-4 text-[#84cc16] group-hover:translate-x-1 transition-transform" />
              </GlassButton>

              <GlassButton
                href="/cyclothon"
                variant="amber"
                size="lg"
                className="group"
              >
                <Calendar className="w-4 h-4 text-[#fbbf24]" />
                <span>Unmatch Cyclothon 2026</span>
              </GlassButton>
            </motion.div>

            {/* Live Club Telemetry Grid */}
            <motion.div 
              variants={heroItemVariants}
              className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left"
            >
              <TiltGlassCard glowColor="moss" className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Elevation Peak</span>
                  <Mountain className="w-4 h-4 text-[#84cc16]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#f7fee7]">1,450 m</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Sinhagad & Mulshi Ghat</div>
              </TiltGlassCard>

              <TiltGlassCard glowColor="amber" className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Peloton Riders</span>
                  <Users className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#fef3c7]">65+ Active</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Cadets & Club Alumni</div>
              </TiltGlassCard>

              <TiltGlassCard glowColor="moss" className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Safety Record</span>
                  <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#f7fee7]">100%</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Helmets & Echelon Strict</div>
              </TiltGlassCard>

              <TiltGlassCard glowColor="amber" className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider">Miles Logged</span>
                  <Activity className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#fef3c7]">14,200 km</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Across Sahyadri Circuits</div>
              </TiltGlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- ABOUT THE CLUB SECTION ----------------- */}
      <section id="about-club" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CLUB ETHOS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#f3efe6]">
              More than speed. <br />
              <span className="text-[#84cc16]">Safety, cadence, and fellowship.</span>
            </h2>

            <p className="text-stone-300 leading-relaxed">
              At AIT Cycling Club, we train on the steep climbs and sweeping descents of Pune's 
              Western Ghats. Every ride is structured around strict military paceline discipline: 
              sweepers, ride marshals, hand-signal protocols, and no rider left behind.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#84cc16] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#f3efe6]">Safety-First Echelon Cycling</h3>
                  <p className="text-xs text-stone-400">Strict helmet mandates, dual-light systems, and hand-signal communication on fast descents.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#84cc16] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#f3efe6]">Pre-Dawn Sahyadri Rollouts</h3>
                  <p className="text-xs text-stone-400">We hit the roads at 5:00 AM to beat Pune traffic, catch the morning mountain mist, and finish before sunup.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#84cc16] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#f3efe6]">Technical Cadence Workshops</h3>
                  <p className="text-xs text-stone-400">Bi-weekly bike maintenance, gear ratio tuning, puncture clinics, and nutrition coaching.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TiltGlassCard glowColor="moss" className="p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#84cc16]/15 border border-[#84cc16]/30 flex items-center justify-center text-[#84cc16]">
                  <Mountain className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#f7fee7]">Sinhagad & Mulshi Epics</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Conquering category 3 & 4 mountain passes with calculated heart rates and steady power output.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-stone-800 text-xs font-mono text-[#84cc16]">
                Average Gradient: 7.8% · Max: 16%
              </div>
            </TiltGlassCard>

            <TiltGlassCard glowColor="amber" className="p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#d97706]/15 border border-[#d97706]/30 flex items-center justify-center text-[#fbbf24]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#fef3c7]">No Rider Left Behind</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Designated sweep riders carry tools, tubes, and first aid to ensure every cyclist completes the circuit safely.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-stone-800 text-xs font-mono text-[#d97706]">
                100% Ride Completion Track Record
              </div>
            </TiltGlassCard>
          </div>
        </div>
      </section>

      {/* ----------------- ABOUT THE COLLEGE (AIT PUNE) ----------------- */}
      <section id="about-college" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 lg:p-14 border border-[#84cc16]/20 relative overflow-hidden">
          {/* Subtle green ambient spotlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/40 text-xs font-mono text-[#bef264]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{COLLEGE_PARENT_BODY}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f3efe6] tracking-tight">
                {COLLEGE_NAME}
              </h2>

              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                Established in 1994 by the Indian Army under the Army Welfare Education Society (AWES), 
                AIT Pune stands proudly on the verdant, rolling slopes of <strong>Dighi Hills</strong>. 
                Affiliated to <strong>{COLLEGE_AFFILIATION}</strong>, our campus fosters exceptional engineering 
                pedagogy paired with the indomitable physical discipline of our military heritage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-[#0e1610]/80 border border-stone-800">
                  <div className="text-xs font-mono text-[#84cc16] uppercase">Campus Location</div>
                  <div className="font-semibold text-sm text-[#f3efe6] mt-1">Dighi Hills, Pune</div>
                  <div className="text-[11px] text-stone-400">Direct access to Sahyadri ridges</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1610]/80 border border-stone-800">
                  <div className="text-xs font-mono text-[#d97706] uppercase">Parent Society</div>
                  <div className="font-semibold text-sm text-[#f3efe6] mt-1">AWES New Delhi</div>
                  <div className="text-[11px] text-stone-400">Military discipline & excellence</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1610]/80 border border-stone-800">
                  <div className="text-xs font-mono text-[#84cc16] uppercase">Academic Affiliation</div>
                  <div className="font-semibold text-sm text-[#f3efe6] mt-1">SPPU (Pune University)</div>
                  <div className="text-[11px] text-stone-400">Premier engineering institution</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#121b14]/70 border border-[#84cc16]/25 text-center space-y-3">
              <Award className="w-12 h-12 text-[#84cc16]" />
              <div className="font-display font-bold text-xl text-[#f3efe6]">On Honour For Country</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Carrying the proud motto of AIT into our cycling peloton. Courage, grit, and enduring camaraderie on every kilometre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- NEXT RIDES SECTION ----------------- */}
      <section id="next-rides" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
            <Mountain className="w-3.5 h-3.5" />
            <span>SAHYADRI EXPEDITIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f3efe6] tracking-tight">
            Next Scheduled Rides
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Open to all AIT cadets, alumni, and verified guest riders. Meet at AIT Main Gate at designated muster times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextRides.map((ride) => (
            <TiltGlassCard
              key={ride.title}
              glowColor={ride.glow}
              className="p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold ${
                    ride.glow === 'amber' ? 'bg-[#d97706]/20 text-[#fbbf24] border border-[#d97706]/30' : 'bg-[#84cc16]/20 text-[#bef264] border border-[#84cc16]/30'
                  }`}>
                    {ride.grade}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>{ride.time}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#f3efe6]">{ride.title}</h3>
                  <p className="text-xs text-stone-400 mt-1">{ride.terrain}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800/80">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-400">Distance</div>
                    <div className="font-display text-xl font-bold text-[#f7fee7]">{ride.distance}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-400">Climb Gain</div>
                    <div className="font-display text-xl font-bold text-[#fbbf24]">{ride.elevation}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{ride.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>{ride.startPoint}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4">
                <GlassButton
                  href={`mailto:${CLUB_EMAIL}?subject=Ride Registration: ${encodeURIComponent(ride.title)}`}
                  variant={ride.glow}
                  size="sm"
                  className="w-full text-xs"
                >
                  <span>RSVP for Peloton</span>
                </GlassButton>
              </div>
            </TiltGlassCard>
          ))}
        </div>
      </section>

      {/* ----------------- OUR ADVENTURE GALLERY (DRAGGABLE CARDS) ----------------- */}
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16] mb-3">
              <Move className="w-3.5 h-3.5" />
              <span>INTERACTIVE TACTILE GALLERY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f3efe6] tracking-tight">
              Our Adventure Gallery
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-[#141e16]/80 border border-[#84cc16]/30 text-xs text-stone-300 flex items-center gap-2.5 max-w-md">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
            <span><strong>Try it:</strong> Click and drag any card around to explore moments from the Sahyadri mountains.</span>
          </div>
        </div>

        {/* Draggable Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[480px]">
          {adventureCards.map((card) => (
            <DraggableGlassCard
              key={card.id}
              glowColor={card.glow}
              initialRotation={card.initialRotation}
              dragBounds={{ top: -100, left: -120, right: 120, bottom: 100 }}
              className="h-full"
            >
              <div 
                className="cursor-pointer"
                onClick={() => setActiveLightbox(card.image)}
              >
                {/* Image Container with specular glass border */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-stone-700/50 shadow-inner group">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0a0f0b]/80 border border-stone-700 text-[10px] font-mono text-[#84cc16]">
                    {card.tag}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[11px] text-white flex items-center gap-1 font-mono">
                      <ExternalLink className="w-3 h-3" /> Click to enlarge
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>{card.location}</span>
                    <span className="text-[#fbbf24] font-bold">{card.elevation}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#f3efe6] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </DraggableGlassCard>
          ))}
        </div>
      </section>

      {/* ----------------- PAST ACTIVITIES & MILESTONES (DRAGGABLE) ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>CLUB MILESTONES & MEMORIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f3efe6] tracking-tight">
              Past Activities & Achievements
            </h2>
          </div>
          <div className="text-xs text-stone-400 font-mono">
            <span>Draggable milestone archive · Physically moveable cards</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastActivities.map((act) => (
            <DraggableGlassCard
              key={act.id}
              glowColor={act.glow}
              initialRotation={act.initialRotation}
              dragBounds={{ top: -80, left: -100, right: 100, bottom: 80 }}
            >
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#d97706] font-semibold">{act.badge}</span>
                    <span className="text-stone-400">{act.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#f3efe6] leading-snug">
                    {act.title}
                  </h3>
                  <div className="p-2 rounded-lg bg-[#141e16]/80 border border-[#84cc16]/20 text-xs font-mono text-[#bef264]">
                    ★ {act.highlight}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed pt-1">
                    {act.summary}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-stone-500 pt-3 border-t border-stone-800">
                  Verified Club Record
                </div>
              </div>
            </DraggableGlassCard>
          ))}
        </div>
      </section>

      {/* ----------------- CYCLOTHON TEASER BANNER ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl glass-panel-amber p-8 sm:p-12 border border-[#d97706]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden text-center sm:text-left">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-[#d97706]/30 text-[#fde047] text-xs font-mono font-bold tracking-wider uppercase border border-[#d97706]/50">
                Flagship Event · 30 December 2026
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#fef3c7] tracking-tight">
                UNMATCH CYCLOTHON 2026
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                25 km Fun Ride · 50 km Challenge · 100 km Century. Flagging off from AIT Dighi Hills Campus. 
                Experience live RFID timing, hydration pitstops, and custom finisher medals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <GlassButton
                href="/cyclothon"
                variant="amber"
                size="lg"
                className="font-bold text-base shadow-xl"
              >
                <span>Explore Cyclothon & Countdown</span>
                <ArrowRight className="w-4 h-4" />
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CONNECT & CONTACT SECTION ----------------- */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <TiltGlassCard glowColor="moss" className="p-8 sm:p-12">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
              <Send className="w-3.5 h-3.5" />
              <span>GET IN THE SADDLE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f3efe6] tracking-tight">
              Connect With AIT Cycling Club
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
              Want to join our morning paceline, borrow a club bicycle, or partner for our upcoming cyclothon?
            </p>
          </div>

          {contactSent ? (
            <div className="p-6 rounded-2xl bg-[#142217] border border-[#84cc16]/50 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#84cc16] mx-auto" />
              <h3 className="font-display font-bold text-lg text-[#f3efe6]">Transmission Received!</h3>
              <p className="text-xs text-stone-300">
                Our Ride Marshals will reach out via email before the upcoming Sunday rollout.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setContactSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Cadet Rohan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f1711]/90 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="e.g. rider@aitpune.edu.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f1711]/90 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-stone-400 mb-1.5">Cycling Experience / Query</label>
                <textarea 
                  rows={3} 
                  required 
                  placeholder="Tell us about your bicycle, road experience, or any questions regarding AIT rides..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f1711]/90 border border-stone-700 text-stone-200 text-sm focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                />
              </div>

              <div className="text-center pt-2">
                <GlassButton
                  type="submit"
                  variant="moss"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <span>Transmit to Ride Marshals</span>
                  <Send className="w-3.5 h-3.5" />
                </GlassButton>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-stone-400">
            <div>
              <span className="font-mono text-[#84cc16] block">Direct Email</span>
              <a href={`mailto:${CLUB_EMAIL}`} className="hover:text-white transition-colors">{CLUB_EMAIL}</a>
            </div>
            <div>
              <span className="font-mono text-[#84cc16] block">Instagram</span>
              <a href={CLUB_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@ait_cycling_club</a>
            </div>
            <div>
              <span className="font-mono text-[#d97706] block">Phone Verification</span>
              <span>{CLUB_PHONE}</span>
            </div>
          </div>
        </TiltGlassCard>
      </section>

      {/* Lightbox Modal for Enlarge Image */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden glass-panel border border-stone-600">
            <button 
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={activeLightbox} 
              alt="Enlarged moment" 
              className="max-h-[80vh] w-auto object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
};
