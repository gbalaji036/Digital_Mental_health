import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { HealerLogo, IconMenu, IconX } from './IconComponents';

const Header: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const primaryLinks = NAV_LINKS.filter(link => link.isPrimary);
  const secondaryLinks = NAV_LINKS.filter(link => !link.isPrimary);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-4 md:px-8 py-4 ${scrolled ? 'pt-2' : 'pt-6'}`}>
      <header 
        className={`mx-auto max-w-7xl nav-glass rounded-[2rem] shadow-2xl transition-all duration-700 ${scrolled ? 'py-2 px-6' : 'py-3 px-8'}`}
        style={{
            boxShadow: scrolled ? '0 15px 45px -15px rgba(167, 139, 250, 0.2)' : '0 25px 60px -20px rgba(0, 0, 0, 0.4)'
        }}
      >
        <nav className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
                <HealerLogo className="w-14 h-14 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
            <span className="text-4xl md:text-5xl font-black text-light-text tracking-tighter group-hover:text-primary transition-colors duration-500">Healer</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {primaryLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-700 flex items-center gap-2 group ${isActive ? 'text-dark-bg font-bold' : 'text-light-text/60 hover:text-light-text hover:bg-light-neutral/40'}`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-primary rounded-full shadow-[0_0_25px_rgba(167,139,250,0.6)] z-0"></div>
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}

            {/* More Dropdown */}
            {secondaryLinks.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 text-light-text/60 hover:text-light-text hover:bg-light-neutral/40 ${isDropdownOpen ? 'bg-light-neutral text-light-text' : ''}`}
                >
                  More
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-60 bg-dark-neutral/95 backdrop-blur-3xl rounded-2xl shadow-3xl py-4 z-50 border border-primary/20 overflow-hidden">
                    <div className="px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-primary/60 font-black border-b border-light-neutral/30 mb-3">System Directory</div>
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`block px-6 py-3 text-sm transition-all duration-500 ${location.pathname === link.path ? 'bg-primary/10 text-primary font-bold' : 'text-light-text/70 hover:bg-primary/5 hover:text-primary hover:pl-8'}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
                onClick={() => setIsMobileOpen(!isMobileOpen)} 
                className={`p-3 rounded-full transition-all duration-500 ${isMobileOpen ? 'bg-primary text-dark-bg' : 'bg-light-neutral/60 text-light-text'}`}
            >
              {isMobileOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileOpen && (
          <div className="md:hidden mt-8 pb-6 space-y-3 border-t border-light-neutral/30 pt-6 overflow-y-auto max-h-[70vh]">
            <ul className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block px-6 py-4 rounded-2xl transition-all duration-500 ${location.pathname === link.path ? 'bg-primary/20 text-primary font-bold shadow-inner' : 'text-light-text/60 hover:bg-light-neutral hover:text-light-text'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;