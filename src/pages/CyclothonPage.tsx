import React, { useState } from 'react';
import { CountdownTimer } from '../components/ui/CountdownTimer';
import { TiltGlassCard } from '../components/ui/TiltGlassCard';
import { DraggableGlassCard } from '../components/ui/DraggableGlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { SahyadriContourScene } from '../components/ui/SahyadriContourScene';
import { 
  EVENT_EDITION, 
  REGISTER_FORM_URL,
  COLLEGE_NAME,
  COLLEGE_PARENT_BODY
} from '../config/constants';
import { 
  Calendar, 
  MapPin, 
  Timer, 
  Award, 
  ShieldCheck, 
  Zap, 
  FileText, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Download,
  Move,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CyclothonPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'25' | '50' | '100'>('50');

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#d97706', '#bef264', '#f59e0b', '#fef3c7']
    });
  };

  // Distance categories details
  const categories = [
    {
      id: '25' as const,
      distance: '25 km',
      title: 'The Fun Ride',
      subtitle: 'Scenic Dighi Perimeter & Rolling Ridges',
      elevation: '+180m Elevation Gain',
      target: 'Beginners, recreational riders, campus students & families',
      timeLimit: '2 Hours 30 Mins',
      stations: '2 Hydration & Energy Stations',
      perks: ['Finisher Ribbon', 'Breakfast Buffet', 'Mechanical Support', 'E-Certificate'],
      glow: 'moss' as const,
      colorHex: '#84cc16'
    },
    {
      id: '50' as const,
      distance: '50 km',
      title: 'The Challenge',
      subtitle: 'Alandi - Dighi Sahyadri Foothills Circuit',
      elevation: '+460m Elevation Gain',
      target: 'Enthusiasts & intermediate endurance cyclists',
      timeLimit: '3 Hours 45 Mins',
      stations: '4 Hydration, Electrolyte & Banana Stations',
      perks: ['Custom Cast Finisher Medal', 'Hot Breakfast', 'Electronic RFID Timing', 'Technical Support Vehicle', 'Commemorative Dry-Fit T-Shirt'],
      glow: 'amber' as const,
      colorHex: '#d97706'
    },
    {
      id: '100' as const,
      distance: '100 km',
      title: 'The Century',
      subtitle: 'Premier Mountain Endurance Odyssey',
      elevation: '+1,120m Elevation Gain',
      target: 'Seasoned breveteers, endurance racers & club athletes',
      timeLimit: '6 Hours Cut-Off',
      stations: '7 Hydration, Medical & Electrolyte Stations',
      perks: ['Heavy Antiqued Bronze Medal', 'Bespoke Century Cycling Jersey', 'Official Timing Slip', 'SAG Wagon Escort', 'Full Post-Race Recovery Zone'],
      glow: 'moss' as const,
      colorHex: '#84cc16'
    }
  ];

  // Schedule Timeline
  const scheduleEvents = [
    {
      time: '05:00 AM',
      title: 'Reporting & Bike Scrutiny',
      detail: 'AIT Sports Complex. Helmet inspection, brake check, and RFID transponder bib pickup.',
      icon: Clock
    },
    {
      time: '05:30 AM',
      title: 'Pre-Race Safety Briefing',
      detail: 'Route instructions by Chief Ride Marshal, pace guidelines, and emergency hand signal recap.',
      icon: ShieldCheck
    },
    {
      time: '06:00 AM',
      title: 'Grand Flag-Off: 100 km & 50 km',
      detail: 'Flag-off by AWES Dignitaries and AIT Director from the Main Gate Arch.',
      icon: Zap
    },
    {
      time: '06:30 AM',
      title: 'Flag-Off: 25 km Fun Ride',
      detail: 'Rolling departure with pace motorcycles and medical sweep accompaniment.',
      icon: Sparkles
    },
    {
      time: '10:30 AM',
      title: 'Podium & Medal Ceremony',
      detail: 'Recognizing fastest KOM climbers, oldest rider, youngest cadet, and spirit awards.',
      icon: Award
    },
    {
      time: '11:30 AM',
      title: 'Celebration Breakfast & Group Photo',
      detail: 'Nutritional post-ride refueling at AIT Dining Hall with riders and marshals.',
      icon: HeartHandshake
    }
  ];

  // Sponsors & Partners (Draggable Cards)
  const sponsors = [
    {
      id: 'sp-1',
      name: 'Sahyadri Gear Co.',
      category: 'Official Technical Partner',
      perk: 'Providing 4 Neutral Mobile Repair Vans & Puncture Stations',
      glow: 'moss' as const,
      initialRotation: -2
    },
    {
      id: 'sp-2',
      name: 'Pune Velo Labs',
      category: 'Timing & Telemetry Partner',
      perk: 'Precision RFID Timing Mats with Instant SMS Milestone Splits',
      glow: 'amber' as const,
      initialRotation: 1.5
    },
    {
      id: 'sp-3',
      name: 'Ghat Hydration & Electrolytes',
      category: 'Nutrition Partner',
      perk: 'Supplying 1,500L Isotonic Hydration & Energy Bars',
      glow: 'moss' as const,
      initialRotation: -1.2
    },
    {
      id: 'sp-4',
      name: 'AWES Sports Foundation',
      category: 'Patron & Host',
      perk: 'Army Institute of Technology Infrastructure & Medical Escort',
      glow: 'amber' as const,
      initialRotation: 2.2
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0f0b] text-[#f3efe6] overflow-hidden">
      {/* ----------------- CYCLOTHON HERO ----------------- */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <SahyadriContourScene />

        {/* Ambient Amber & Moss glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#d97706]/15 via-[#84cc16]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Official AIT Cycling Club Logo */}
          <div className="flex justify-center pt-2">
            <div className="relative p-2.5 rounded-2xl glass-panel border border-[#d97706]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(217,119,6,0.25)] hover:scale-105 transition-transform duration-300">
              <img 
                src={`${import.meta.env.BASE_URL}images/ait-cycling-logo-light.png`} 
                alt="AIT Cycling Club Official Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)]"
              />
            </div>
          </div>

          {/* Header pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1710]/90 border border-[#d97706]/50 text-xs font-mono tracking-wider text-[#fbbf24] shadow-[0_4px_25px_rgba(217,119,6,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#d97706] animate-ping" />
            <span>OFFICIAL RACE REGISTRATION OPEN · {EVENT_EDITION}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#fbfaf8] uppercase leading-[0.95]">
            UNMATCH <br />
            <span className="bg-gradient-to-r from-[#fbbf24] via-[#d97706] to-[#84cc16] bg-clip-text text-transparent">
              CYCLOTHON 2026
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300">
            The marquee cycling endurance challenge of Pune. Organized by <strong>AIT Cycling Club</strong> 
            under <strong>AWES</strong>. 25km, 50km, and 100km categories flagging off from the hills of Dighi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono text-stone-300">
            <span className="flex items-center gap-1.5 bg-[#141b15] px-3.5 py-1.5 rounded-xl border border-stone-800">
              <Calendar className="w-4 h-4 text-[#84cc16]" />
              <span>30 December 2026</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#141b15] px-3.5 py-1.5 rounded-xl border border-stone-800">
              <Clock className="w-4 h-4 text-[#d97706]" />
              <span>06:00 AM IST Flag-Off</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#141b15] px-3.5 py-1.5 rounded-xl border border-stone-800">
              <MapPin className="w-4 h-4 text-[#84cc16]" />
              <span>AIT Campus, Dighi Hills, Pune</span>
            </span>
          </div>

          {/* Real Live Countdown Component */}
          <div className="pt-4">
            <CountdownTimer />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <GlassButton
              id="cyclothon-hero-register-btn"
              href={REGISTER_FORM_URL}
              target="_blank"
              variant="amber"
              size="lg"
              onClick={triggerCelebration}
              className="font-bold text-base shadow-2xl"
            >
              <FileText className="w-5 h-5 text-[#fde047]" />
              <span>Register on Google Form</span>
            </GlassButton>

            <GlassButton
              href="#distance-categories"
              variant="ghost"
              size="lg"
            >
              <span>View Distance Categories</span>
              <ChevronRight className="w-4 h-4" />
            </GlassButton>
          </div>

          <div className="pt-2 text-xs text-stone-400 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Registrations Open · Direct Link to Google Form</span>
          </div>
        </div>
      </section>

      {/* ----------------- DISTANCE CATEGORIES (25 / 50 / 100 KM) ----------------- */}
      <section id="distance-categories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
            <Zap className="w-3.5 h-3.5" />
            <span>RACE CLASSIFICATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f3efe6] tracking-tight">
            Select Your Challenge Distance
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            From the gentle tarmac of our 25km Fun Ride to the punishing Sahyadri gradient of the 100km Century.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <TiltGlassCard
                key={cat.id}
                glowColor={cat.glow}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-7 flex flex-col justify-between transition-all ${
                  isSelected ? 'ring-2 ring-[#d97706] shadow-[0_20px_60px_rgba(217,119,6,0.25)]' : ''
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-black text-[#fef3c7] tracking-tight">
                      {cat.distance}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                      cat.glow === 'amber' ? 'bg-[#d97706]/20 text-[#fbbf24] border border-[#d97706]/40' : 'bg-[#84cc16]/20 text-[#bef264] border border-[#84cc16]/40'
                    }`}>
                      {cat.title}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-stone-200">{cat.subtitle}</h3>
                    <div className="mt-2 text-xs font-mono text-[#fbbf24] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#fbbf24]" />
                      <span>{cat.elevation}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed border-t border-stone-800/80 pt-3">
                    <strong>Rider Profile:</strong> {cat.target}
                  </p>

                  <div className="space-y-2 text-xs text-stone-300 bg-[#0c140e]/70 p-3 rounded-xl border border-stone-800">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Time Limit:</span>
                      <span className="font-mono text-stone-200">{cat.timeLimit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Pitstops:</span>
                      <span className="font-mono text-[#84cc16]">{cat.stations}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Rider Inclusions</div>
                    <ul className="space-y-1.5">
                      {cat.perks.map((perk, i) => (
                        <li key={i} className="text-xs text-stone-300 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#84cc16] flex-shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-800">
                  <GlassButton
                    href={REGISTER_FORM_URL}
                    target="_blank"
                    variant={cat.glow}
                    size="md"
                    className="w-full text-xs font-bold"
                    onClick={triggerCelebration}
                  >
                    <span>Register for {cat.distance}</span>
                    <ChevronRight className="w-4 h-4" />
                  </GlassButton>
                </div>
              </TiltGlassCard>
            );
          })}
        </div>
      </section>

      {/* ----------------- RACE DAY SCHEDULE ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
            <Timer className="w-3.5 h-3.5" />
            <span>ITINERARY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f3efe6] tracking-tight">
            Race Day Schedule (30 Dec 2026)
          </h2>
          <p className="text-sm text-stone-400">
            Strict military timings. Riders are advised to assemble at least 45 minutes before departure.
          </p>
        </div>

        <div className="relative border-l-2 border-[#84cc16]/30 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-8">
          {scheduleEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="relative group">
                {/* Time Badge on left for desktop */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                  <span className="font-mono text-sm font-bold text-[#fbbf24]">{evt.time}</span>
                </div>

                {/* Node marker on timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0a0f0b] border-2 border-[#84cc16] group-hover:scale-125 transition-transform flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
                </div>

                <TiltGlassCard glowColor="moss" className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1 sm:hidden">
                    <span className="font-mono text-xs font-bold text-[#fbbf24]">{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#84cc16]/10 text-[#84cc16] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#f3efe6]">
                      {evt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {evt.detail}
                  </p>
                </TiltGlassCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- MOVEABLE & DRAGGABLE SPONSORS SECTION ----------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1710] border border-[#d97706]/40 text-xs font-mono text-[#fbbf24] mb-3">
              <Move className="w-3.5 h-3.5" />
              <span>TACTILE PARTNERS EXHIBIT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f3efe6] tracking-tight">
              Event Sponsors & Partners
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-[#141e16]/80 border border-[#84cc16]/30 text-xs text-stone-300 flex items-center gap-2.5 max-w-md">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
            <span><strong>Draggable Tiles:</strong> Pick up, reposition, and inspect our cycling ecosystem partners.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((sponsor) => (
            <DraggableGlassCard
              key={sponsor.id}
              glowColor={sponsor.glow}
              initialRotation={sponsor.initialRotation}
              dragBounds={{ top: -90, left: -110, right: 110, bottom: 90 }}
            >
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#fbbf24] font-semibold">{sponsor.category}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#f3efe6] leading-snug">
                    {sponsor.name}
                  </h3>
                  <div className="p-3 rounded-xl bg-[#0e1610]/80 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                    {sponsor.perk}
                  </div>
                </div>
                <div className="pt-3 border-t border-stone-800 text-[11px] font-mono text-[#84cc16] flex items-center justify-between">
                  <span>Verified Partner</span>
                  <span>Pune, MH</span>
                </div>
              </div>
            </DraggableGlassCard>
          ))}
        </div>
      </section>

      {/* ----------------- OFFICIAL EVENT POSTER SECTION ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231a] border border-[#84cc16]/30 text-xs font-mono text-[#84cc16]">
            <FileText className="w-3.5 h-3.5" />
            <span>OFFICIAL RACE POSTER</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f3efe6] tracking-tight">
            Event Commemorative Poster
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Share with your cycling groups, collegiate clubs, and riding partners.
          </p>
        </div>

        <TiltGlassCard glowColor="amber" className="p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-stone-700 bg-[#0b120c] p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            {/* Topographic watermark */}
            <div className="absolute inset-0 topographic-bg opacity-30 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex justify-center pb-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 rounded-2xl bg-[#142017]/80 border border-[#84cc16]/40 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/ait-cycling-logo-light.png`} 
                    alt="AIT Cycling Club Official Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(132,204,22,0.3)]"
                  />
                </div>
              </div>

              <div className="text-xs font-mono tracking-widest uppercase text-[#84cc16]">
                {COLLEGE_NAME}
              </div>
              <div className="text-[11px] font-mono text-stone-400">
                Under the Aegis of {COLLEGE_PARENT_BODY}
              </div>

              <div className="py-4 border-y border-stone-700/80 my-4 space-y-2">
                <div className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#fef3c7] uppercase">
                  UNMATCH CYCLOTHON
                </div>
                <div className="text-sm sm:text-lg font-mono text-[#fbbf24] font-bold">
                  30 DECEMBER 2026 · 06:00 AM IST
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
                <div className="p-2.5 rounded-xl bg-[#142017] border border-[#84cc16]/30">
                  <div className="font-display font-black text-xl text-[#f7fee7]">25 KM</div>
                  <div className="text-[10px] font-mono text-stone-400">Fun Ride</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#231b12] border border-[#d97706]/40">
                  <div className="font-display font-black text-xl text-[#fef3c7]">50 KM</div>
                  <div className="text-[10px] font-mono text-[#fbbf24]">Challenge</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#142017] border border-[#84cc16]/30">
                  <div className="font-display font-black text-xl text-[#f7fee7]">100 KM</div>
                  <div className="text-[10px] font-mono text-stone-400">Century</div>
                </div>
              </div>

              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Starts at AIT Main Gate, Dighi Hills, Pune. RFID timing, finisher medals, medical escort, and recovery breakfast.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <GlassButton
                  href={REGISTER_FORM_URL}
                  target="_blank"
                  variant="amber"
                  size="md"
                  onClick={triggerCelebration}
                >
                  <span>Open Registration Form</span>
                </GlassButton>

                <GlassButton
                  onClick={() => alert("Official PDF poster download will be activated upon sponsor logo lock.")}
                  variant="ghost"
                  size="md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Poster PDF</span>
                </GlassButton>
              </div>
            </div>
          </div>
        </TiltGlassCard>
      </section>

      {/* ----------------- FINAL REGISTRATION CTA ----------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl glass-panel-amber p-8 sm:p-14 border border-[#d97706]/50 shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#d97706]/30 text-[#fef08a] text-xs font-mono font-bold tracking-wider uppercase border border-[#d97706]/60">
              Limited to 500 Cyclists Across Categories
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#fef3c7] tracking-tight">
              Claim Your Spot on the Starting Line
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Registrations close once slots fill. Secure your bib, commemorative dry-fit t-shirt, 
              and RFID transponder chip today via our official Google Form.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlassButton
                id="cyclothon-footer-register-btn"
                href={REGISTER_FORM_URL}
                target="_blank"
                variant="amber"
                size="lg"
                onClick={triggerCelebration}
                className="w-full sm:w-auto font-bold text-base shadow-2xl"
              >
                <FileText className="w-5 h-5 text-[#fde047]" />
                <span>Submit Google Form Registration</span>
              </GlassButton>
            </div>

            <p className="text-xs text-stone-400 pt-2">
              Instant confirmation will be sent upon completing the official Google Form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
