import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import type { Contribution } from '../types';
import { IconStar, HealedPot, IconX } from '../components/IconComponents';
import BackgroundVideo from '../components/BackgroundVideo';

const PositivityWallPage: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', content: '', type: 'quote' as const });

  useEffect(() => {
    setContributions(dbService.getPublished());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content) return;
    dbService.submitContribution(formData.name, formData.content, formData.type);
    setFormData({ name: '', content: '', type: 'quote' });
    setShowForm(false);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundVideo src="https://videos.pexels.com/video-files/4125881/4125881-uhd_2160_4096_25fps.mp4" />
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-primary mb-4">Positivity Wall</h1>
            <p className="text-light-text/80 mb-8">Hope and resilience shared by students.</p>
            <button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-10 rounded-full shadow-2xl">Share Your Light ✨</button>
        </div>
        {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="bg-dark-neutral border border-light-neutral/50 p-8 rounded-2xl w-full max-w-lg space-y-4">
                    <h2 className="text-2xl font-bold text-primary">Contribute</h2>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="w-full bg-dark-bg p-3 rounded" />
                    <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} placeholder="Your Message" className="w-full bg-dark-bg p-3 rounded" />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-grow bg-primary text-dark-bg font-bold py-3 rounded">Submit</button>
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 bg-light-neutral rounded">Cancel</button>
                    </div>
                </form>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((item) => (
                <div key={item.id} className="p-6 rounded-2xl bg-dark-neutral/80 backdrop-blur-xl border border-primary/20 shadow-xl">
                    <p className="text-light-text/90 text-lg italic mb-6">"{item.content}"</p>
                    <p className="text-sm font-bold text-primary">- {item.name}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PositivityWallPage;