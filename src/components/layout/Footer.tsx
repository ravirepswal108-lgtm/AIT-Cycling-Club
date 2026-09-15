import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CLUB_INSTAGRAM, 
  CLUB_INSTAGRAM_URL, 
  CLUB_EMAIL, 
  CLUB_PHONE, 
  CLUB_PHONE_NOTE,
  COLLEGE_PARENT_BODY,
  COLLEGE_AFFILIATION,
  EVENT_LOCATION
} from '../../config/constants';
import { Mail, Phone, MapPin, Compass, Shield, ArrowUpRight, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#070b08] border-t border-[#1b261e] pt-16 pb-12 overflow-hidden text-stone-300">
      {/* Subtle topographic gradient ambient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#84cc16]/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#84cc16]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-stone-800/80">
          {/* Column 1: Brand & College Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#84cc16]/10 border border-[#84cc16]/40 flex items-center justify-center p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                <img 
                  src="/images/ait-cycling-logo-light.png" 
                  alt="AIT Cycling Club Official Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#f3efe6] tracking-wider uppercase">
                  AIT CYCLING CLUB
                </h3>
                <p className="text-xs font-mono text-[#84cc16] tracking-wider">
                  Army Institute of Technology
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed">
              Forged on the gradients of Dighi Hills and the Sahyadri mountains. 
              Engineering endurance, fellowship, and road discipline under the aegis of AWES.
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-stone-400">
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>{COLLEGE_PARENT_BODY}</span>
              </span>
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Affiliated to {COLLEGE_AFFILIATION}</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-[#bef264]">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-stone-400 hover:text-[#f3efe6] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                  <span>Home Expeditions</span>
                </Link>
              </li>
              <li>
                <Link to="/cyclothon" className="text-[#fde68a] hover:text-[#fef08a] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                  <span>Unmatch Cyclothon 2026</span>
                </Link>
              </li>
              <li>
                <a href="#about-club" className="text-stone-400 hover:text-[#f3efe6] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]/50" />
                  <span>Club Ethos & Cadence</span>
                </a>
              </li>
              <li>
                <a href="#next-rides" className="text-stone-400 hover:text-[#f3efe6] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]/50" />
                  <span>Sahyadri Mountain Passes</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-stone-400 hover:text-[#f3efe6] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]/50" />
                  <span>Adventure Photography</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-[#bef264]">
              Connect & Verify
            </h4>
            <div className="space-y-3 text-sm">
              {/* Instagram */}
              <a 
                href={CLUB_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-2.5 rounded-xl bg-[#121913]/60 border border-stone-800 hover:border-[#84cc16]/40 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-[#84cc16]/10 text-[#84cc16] group-hover:text-[#bef264]">
                  {/* Instagram camera icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-200">Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#84cc16]" />
                  </div>
                  <span className="text-xs font-mono text-stone-400 truncate block">@{CLUB_INSTAGRAM}</span>
                </div>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${CLUB_EMAIL}`}
                className="group flex items-start gap-3 p-2.5 rounded-xl bg-[#121913]/60 border border-stone-800 hover:border-[#84cc16]/40 transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-[#84cc16]/10 text-[#84cc16] group-hover:text-[#bef264]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-200">Club Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#84cc16]" />
                  </div>
                  <span className="text-xs font-mono text-stone-400 truncate block">{CLUB_EMAIL}</span>
                </div>
              </a>

              {/* Phone with Verification Note */}
              <div className="p-2.5 rounded-xl bg-[#171410]/80 border border-[#d97706]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#fde047]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Verification</span>
                </div>
                <p className="mt-1 text-xs font-mono text-stone-300">{CLUB_PHONE}</p>
                <p className="mt-1 text-[11px] text-[#f59e0b] flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{CLUB_PHONE_NOTE}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Base Location */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-[#bef264]">
              Base Camp
            </h4>
            <div className="p-4 rounded-2xl glass-panel text-xs space-y-2 border border-stone-800">
              <div className="flex items-start gap-2.5 text-stone-300">
                <MapPin className="w-4 h-4 text-[#84cc16] flex-shrink-0 mt-0.5" />
                <span>{EVENT_LOCATION}</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed pt-2 border-t border-stone-800/60">
                Nestled on the slopes of Dighi Hills with direct access to Pune-Alandi ridge routes, Sinhagad, Panshet, and Mulshi ghat passes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <p>© 2026 AIT Cycling Club, Army Institute of Technology Pune. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#84cc16] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
              <span>Safety First · Ride As One</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
