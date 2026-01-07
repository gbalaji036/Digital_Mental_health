
import React from 'react';
import { Link } from 'react-router-dom';
import { BreathWaveLogo } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-neutral border-t border-light-neutral/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand and Info */}
          <div className="md:col-span-1">
             <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-light-text hover:text-primary transition-colors mb-2">
                <BreathWaveLogo className="w-8 h-8 text-primary" />
                <span>Healer</span>
            </Link>
            <p className="text-light-text/60 text-sm">Your space for mental clarity and support in higher education.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-light-text/80 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
                <li><Link to="/quiz" className="text-light-text/60 hover:text-primary transition-colors">Wellness Test</Link></li>
                <li><Link to="/chatbot" className="text-light-text/60 hover:text-primary transition-colors">AI Companion</Link></li>
                <li><Link to="/resources" className="text-light-text/60 hover:text-primary transition-colors">Resources</Link></li>
                <li><Link to="/faq" className="text-light-text/60 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
           <div>
            <h3 className="text-sm font-semibold text-light-text/80 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
                <li><a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="text-light-text/60 hover:text-primary transition-colors">MoHFW, India</a></li>
                <li><a href="https://nimhans.ac.in/" target="_blank" rel="noopener noreferrer" className="text-light-text/60 hover:text-primary transition-colors">NIMHANS</a></li>
                <li><a href="https://www.thelivelovelaughfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-light-text/60 hover:text-primary transition-colors">The Live Love Laugh Foundation</a></li>
                <li><Link to="/contact" className="text-light-text/60 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-light-neutral/50 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm text-light-text/50 gap-4">
          <div>
            <p>&copy; {new Date().getFullYear()} Healer. All rights reserved.</p>
            <p className="mt-1 max-w-2xl text-xs">This is a conceptual platform for informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
          </div>
          <Link 
            to="/admin/login" 
            className="text-primary/60 hover:text-primary transition-all text-[10px] uppercase tracking-[0.2em] font-mono border border-primary/20 hover:border-primary/50 px-4 py-2 rounded-lg bg-primary/5"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
