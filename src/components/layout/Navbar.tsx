import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { GlassButton } from '../ui/GlassButton';
import { Menu, X, LogOut, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCyclothonRoute = location.pathname === '/cyclothon';

  const navLinks = [
    { name: 'Home', path: '/', isHash: false },
    { name: 'About Club', path: '/#about-club', isHash: true },
    { name: 'AIT Heritage', path: '/#about-college', isHash: true },
    { name: 'Expeditions', path: '/#next-rides', isHash: true },
    { name: 'Adventure Gallery', path: '/#gallery', isHash: true },
    { name: 'Unmatch Cyclothon', path: '/cyclothon', isHash: false, badge: 'Dec 2026' }
  ];

  const handleNavClick = (path: string, isHash: boolean) => {
    setMobileMenuOpen(false);
    if (isHash) {
      if (location.pathname !== '/') {
        navigate(path);
      } else {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#0a0f0b]/85 backdrop-blur-xl border-b border-[#243327]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <Link 
          to="/" 
          className="group flex items-center gap-3 no-underline focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#84cc16]/15 via-[#172219]/60 to-[#0e1610]/80 border border-[#84cc16]/40 flex items-center justify-center p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-[#84cc16] group-hover:shadow-[0_0_20px_rgba(132,204,22,0.35)] transition-all">
            <img 
              src={`${import.meta.env.BASE_URL}images/ait-cycling-logo-light.png`} 
              alt="AIT Cycling Club Official Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-wider text-[#f3efe6] uppercase group-hover:text-[#bef264] transition-colors">
              AIT CYCLING CLUB
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#a3b19b] uppercase flex items-center gap-1.5">
              <span>Dighi Hills</span>
              <span className="w-1 h-1 rounded-full bg-[#84cc16]" />
              <span>AWES Pune</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#111812]/70 border border-[#243327]/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          {navLinks.map((link) => {
            const isActive = link.isHash 
              ? false 
              : location.pathname === link.path;

            return (
              <React.Fragment key={link.name}>
                {link.isHash ? (
                  <button
                    onClick={() => handleNavClick(link.path, true)}
                    className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#c4d1c0] hover:text-[#bef264] transition-colors rounded-full hover:bg-[#1a251c]/60"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all ${
                      isActive 
                        ? 'text-[#f7fee7] bg-[#84cc16]/20 border border-[#84cc16]/40 shadow-[0_0_15px_rgba(132,204,22,0.2)]' 
                        : 'text-[#c4d1c0] hover:text-[#bef264] hover:bg-[#1a251c]/60'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {link.name}
                      {link.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight rounded-md bg-[#d97706]/30 text-[#fef08a] border border-[#d97706]/50">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right Section: Google Auth & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Google Sign In / User Profile */}
          {user ? (
            <div className="relative">
              <button
                id="user-profile-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#172219]/80 border border-[#84cc16]/30 hover:border-[#84cc16]/60 transition-colors backdrop-blur-md"
              >
                <img 
                  src={user.photoURL || "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2384cc16'><circle cx='12' cy='8' r='5'/><path d='M20 21a8 8 0 1 0-16 0'/></svg>"} 
                  alt={user.displayName || "Cyclist"} 
                  className="w-7 h-7 rounded-lg object-cover border border-[#84cc16]/50 bg-[#121a14]"
                />
                <span className="hidden sm:inline text-xs font-semibold text-[#f7fee7] max-w-[110px] truncate">
                  {user.displayName?.split(' ')[0] || "Rider"}
                </span>
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 p-3 rounded-2xl glass-panel shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-[#84cc16]/25 z-50"
                  >
                    <div className="p-2 border-b border-stone-800/80 mb-2">
                      <p className="text-xs font-bold text-[#f7fee7] truncate">{user.displayName}</p>
                      <p className="text-[11px] font-mono text-stone-400 truncate">{user.email}</p>
                      {user.isDemo && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#d97706]/20 text-[#fde047] border border-[#d97706]/40">
                          Demo Google Auth Active
                        </span>
                      )}
                    </div>
                    <button
                      id="nav-sign-out-btn"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <GlassButton
              id="google-signin-btn"
              onClick={loginWithGoogle}
              variant="moss"
              size="sm"
              disabled={loading}
              className="flex items-center gap-2"
            >
              {/* Google Brand SVG with clean colors */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
                <path fill="#4285F4" className="hidden" d="M0 0h24v24H0z"/>
                <path fill="#FBBC05" d="M1.6 7.4C.6 9.8 0 12.3 0 15s.6 5.2 1.6 7.6l3.7-2.9C4.4 18.2 4 16.6 4 15s.4-3.2 1.3-4.7L1.6 7.4z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.8-3.1c-1.1.7-2.5 1.1-4.2 1.1-3.1 0-5.8-2.3-6.7-5.3L1.6 15.6C3.5 19.4 7.4 23 12 23z"/>
                <path fill="#EAB308" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.5 3.7l3.8 3.1c2.2-2 3.7-5 3.7-9z"/>
              </svg>
              <span>{loading ? "Connecting..." : "Sign in with Google"}</span>
            </GlassButton>
          )}

          {/* Cyclothon CTA in Nav (if on home page) */}
          {!isCyclothonRoute && (
            <Link
              to="/cyclothon"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d97706]/30 to-[#b45309]/20 border border-[#d97706]/50 text-xs font-semibold text-[#fef3c7] hover:border-[#f59e0b] shadow-[0_4px_15px_rgba(217,119,6,0.2)] transition-all hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Cyclothon 2026</span>
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#151f17]/70 border border-[#243327] text-stone-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Responsive 375px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 mx-4 p-5 rounded-2xl glass-panel border border-[#84cc16]/25 shadow-[0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.isHash ? (
                    <button
                      onClick={() => handleNavClick(link.path, true)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-sm font-semibold text-[#c4d1c0] hover:text-[#bef264] hover:bg-[#1a251c]/60"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-stone-500" />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm font-semibold ${
                        location.pathname === link.path 
                          ? 'text-[#f7fee7] bg-[#84cc16]/20 border border-[#84cc16]/40' 
                          : 'text-[#c4d1c0] hover:text-[#bef264] hover:bg-[#1a251c]/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.name}
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-[#d97706]/30 text-[#fef08a]">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-500" />
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
                <Link
                  to="/cyclothon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#d97706]/30 to-[#b45309]/30 border border-[#d97706]/50 text-sm font-bold text-[#fef3c7]"
                >
                  Unmatch Cyclothon (30 Dec 2026)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
