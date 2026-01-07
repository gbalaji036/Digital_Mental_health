import React, { useState } from 'react';

export const HealerLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Left Hemisphere - The Neural Tissue (Darker/High Contrast) */}
    <g className="text-primary-dark">
      <path d="M50 15 C30 15 20 25 20 50 C20 75 30 85 50 85 L50 15 Z" fill="currentColor" opacity="0.3" />
      <path d="M35 30 Q40 35 45 30" stroke="currentColor" strokeWidth="2.5" fill="none" className="animate-pulse" />
      <path d="M30 50 Q40 50 45 45" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ animationDelay: '0.5s' }} className="animate-pulse" />
      <path d="M35 70 Q40 65 45 70" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ animationDelay: '1s' }} className="animate-pulse" />
      <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    </g>

    {/* Right Hemisphere - The Flora & Fauna */}
    <g className="text-accent">
      {/* Blooming Flowers */}
      <circle cx="68" cy="35" r="7" fill="currentColor" opacity="0.9" className="animate-bloom" />
      <circle cx="75" cy="55" r="9" fill="currentColor" opacity="0.7" className="animate-bloom" style={{ animationDelay: '0.8s' }} />
      <circle cx="62" cy="72" r="6" fill="currentColor" opacity="0.9" className="animate-bloom" style={{ animationDelay: '1.6s' }} />
      
      {/* Fluttering Hummingbird */}
      <g className="animate-wing-flap origin-[78px_45px]">
        <path d="M78 45 L88 40 L84 50 Z" fill="#C4B5FD" />
      </g>
      <path d="M78 45 Q82 45 84 48" stroke="#C4B5FD" strokeWidth="2" fill="none" />
      <circle cx="78" cy="45" r="1.5" fill="#C4B5FD" />
    </g>
    
    {/* Central Vertical Core */}
    <path d="M50 15 Q55 50 50 85" stroke="#7C3AED" strokeWidth="3" fill="none" />
  </svg>
);

export const BreathWaveLogo = HealerLogo;

export const HealedPot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const IconMenu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const IconTwitter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
);

export const IconLinkedIn: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

export const IconGitHub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

export const IconSend: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 23.85 23.85 0 0 0 21.42-11.832a.75.75 0 0 0 0-.84A23.85 23.85 0 0 0 3.478 2.404Z" />
    </svg>
);

export const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
);

export const IconBot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 3.75A.75.75 0 0 1 5.25 3h13.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-5.463l-2.53 2.53a.75.75 0 0 1-1.06 0l-2.53-2.53H5.25a.75.75 0 0 1-.75-.75V3.75Zm2.016 5.03a.75.75 0 0 0-1.06 1.06L6.939 11.3l-1.483 1.484a.75.75 0 0 0 1.06 1.06L8 12.36l1.484 1.483a.75.75 0 0 0 1.06-1.06L9.061 11.3l1.483-1.484a.75.75 0 0 0-1.06-1.06L8 10.24l-1.484-1.483Zm9-1.483a.75.75 0 0 0-1.06 1.06L16.939 10l-1.483 1.484a.75.75 0 1 0 1.06 1.06L18 11.06l1.484 1.483a.75.75 0 1 0 1.06-1.06L19.061 10l1.483-1.484a.75.75 0 0 0-1.06-1.06L18 8.94l-1.484-1.483Z" clipRule="evenodd" />
    </svg>
);

export const EmergencyButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse-slow hover:animate-none hover:bg-red-500 transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-400/50"
                aria-label="Emergency Contacts"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V9Zm-.75 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-dark-neutral rounded-xl shadow-2xl max-w-lg w-full p-8 border border-red-500/50" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-red-400">Immediate Crisis Support</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-light-text/70 hover:text-light-text">
                                <IconX className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-light-text/90 mb-6">If you are in crisis or any other person may be in danger, please use these resources to get help immediately. Your safety is the priority.</p>
                        <div className="space-y-4">
                            <a href="tel:18005990019" className="block text-left p-4 bg-dark-bg hover:bg-light-neutral rounded-lg transition-colors border border-light-neutral/50">
                                <h3 className="font-bold text-lg text-light-text">KIRAN Mental Health Helpline</h3>
                                <p className="text-red-400 text-2xl font-bold">Call 1800-599-0019</p>
                                <p className="text-light-text/70 text-sm">24/7, Govt. of India support.</p>
                            </a>
                             <a href="tel:9999666555" className="block text-left p-4 bg-dark-bg hover:bg-light-neutral rounded-lg transition-colors border border-light-neutral/50">
                                <h3 className="font-bold text-lg text-light-text">Vandrevala Foundation</h3>
                                <p className="text-red-400 text-2xl font-bold">Call 9999666555</p>
                                <p className="text-light-text/70 text-sm">Free, 24/7 crisis support via phone call.</p>
                            </a>
                        </div>
                        <p className="text-xs text-light-text/50 mt-6 text-center">In an emergency, please call 112.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export const IconJournal: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);
export const IconMindfulness: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25c-1.5 0-2.25.75-2.25 1.5s.75 1.5 2.25 1.5S14.25 11.25 14.25 10.5 13.5 8.25 12 8.25Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a8.25 8.25 0 0 0 8.25-8.25H3.75A8.25 8.25 0 0 0 12 15Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 0 0 8.25-8.25H3.75A8.25 8.25 0 0 0 12 21Z" />
    </svg>
);
export const IconRipple: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-.965 0-1.89.153-2.75.42L5.6 1.57A13.5 13.5 0 0 0 1.5 12c0 2.828 1.13 5.432 2.99 7.39l2.1-2.625A8.25 8.25 0 0 1 3.75 12c0-2.828 1.13-5.432 2.99-7.39L9.25 1.98A8.25 8.25 0 0 1 12 3.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c.965 0 1.89-.153 2.75-.42l3.65 2.58a13.5 13.5 0 0 0 4.1-10.43c0-2.828-1.13-5.432-2.99-7.39l-2.1 2.625A8.25 8.25 0 0 1 20.25 12c0 2.828-1.13-5.432-2.99 7.39l-2.5-2.64A8.25 8.25 0 0 1 12 20.25Z" />
    </svg>
);
export const IconSound: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M11.25 4.5v15m0 0a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5m0 15a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5m-3.75 4.5v6m-3-3h6" />
    </svg>
);
export const IconQuote: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12.75m-2.625 3.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm0 0H9.75m-2.625 3.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm0 0H7.125m10.125-9.75a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm0 0H17.25m-2.625 3.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm0 0H14.625" />
    </svg>
);

export const IconHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

export const IconCloud: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-5.056-2.28a4.5 4.5 0 0 0-9.232 2.635 3.75 3.75 0 0 0-1.332 7.257Z" />
    </svg>
);

export const IconLeaf: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3.962.058 8.252 8.252 0 0 1 3.4-4.444Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 0 0 6.038-13.953A8.25 8.25 0 0 0 12 3a8.25 8.25 0 0 0-6.038 13.953" />
    </svg>
);

export const IconSun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

export const IconMoon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
);

export const IconStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

export const IconPuzzle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V6.75a3 3 0 0 0-3-3H13.5a.75.75 0 0 1-.75-.75V3a.75.75 0 0 1 .75-.75h.75a3 3 0 0 1 3 3v.75A.75.75 0 0 1 18 4.5h.75a.75.75 0 0 1 .75.75v2.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v.75c0 1.657 1.343 3 3 3h.75a3 3 0 0 0 3-3v-.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V12a3 3 0 0 1 3-3h.75a3 3 0 0 1 3 3v.75" />
  </svg>
);

export const IconStudyBreak: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.25v.01" />
    </svg>
);