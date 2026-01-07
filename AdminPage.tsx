
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import type { Contribution } from '../types';
import { IconX, IconUser, IconBot } from '../components/IconComponents';
import BackgroundVideo from '../components/BackgroundVideo';

const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [pending, setPending] = useState<Contribution[]>([]);
    const [published, setPublished] = useState<Contribution[]>([]);
    const [error, setError] = useState('');

    const loadData = () => {
        setPending(dbService.getPending());
        setPublished(dbService.getPublished());
    };

    useEffect(() => {
        // Check if session is already authenticated
        const session = sessionStorage.getItem('healer_admin_session');
        if (session === 'active') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) loadData();
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // The requested password is "password"
        if (passwordInput === 'password') {
            setIsAuthenticated(true);
            sessionStorage.setItem('healer_admin_session', 'active');
            setError('');
        } else {
            setError('Unauthorized. Please enter the correct moderator credential.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('healer_admin_session');
    };

    const handleApprove = (id: string) => {
        dbService.approveContribution(id);
        loadData();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to PERMANENTLY delete this contribution?')) {
            dbService.deleteContribution(id);
            loadData();
        }
    };

    const handleClearPending = () => {
        if (window.confirm('Clear all pending submissions? This cannot be undone.')) {
            pending.forEach(p => dbService.deleteContribution(p.id));
            loadData();
        }
    };

    const handleClearPublished = () => {
        if (window.confirm('Wipe the entire Positivity Wall? This will remove all public stories and quotes.')) {
            published.forEach(p => dbService.deleteContribution(p.id));
            loadData();
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <BackgroundVideo src="https://videos.pexels.com/video-files/5472209/5472209-hd_1920_1080_25fps.mp4" />
                <div className="bg-dark-neutral p-8 rounded-3xl border border-light-neutral/50 w-full max-w-md shadow-2xl relative z-10 animate-fade-in-up">
                    <div className="text-center mb-8">
                        <IconBot className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-light-text">Moderator Entry</h1>
                        <p className="text-light-text/50 text-sm italic">Accessing Community Database</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
                            placeholder="Enter Moderator Password"
                            className="w-full bg-dark-bg border border-light-neutral/50 rounded-lg p-3 text-light-text focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                        <button type="submit" className="w-full bg-primary text-dark-bg font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors">
                            Verify & Authenticate
                        </button>
                    </form>
                    <p className="mt-6 text-[10px] text-center text-light-text/30 uppercase tracking-widest">Default credential: 'password'</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-light-neutral/50 pb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-primary">Moderation Dashboard</h1>
                    <p className="text-light-text/50 mt-2 italic">Manage community contributions and maintain the safety of the positivity wall.</p>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest">Logout</button>
            </div>

            <div className="grid grid-cols-1 gap-16">
                {/* Pending Queue */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                            Incoming Submissions ({pending.length})
                        </h2>
                        {pending.length > 0 && (
                            <button onClick={handleClearPending} className="text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest font-bold transition-colors">Clear All Pending</button>
                        )}
                    </div>
                    
                    {pending.length === 0 ? (
                        <div className="p-12 text-center bg-dark-neutral/30 rounded-2xl border border-dashed border-light-neutral/50">
                            <p className="text-light-text/30 italic">No new submissions found in the queue.</p>
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-dark-neutral border border-light-neutral/50 rounded-2xl shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-light-neutral/30 text-[10px] uppercase tracking-[0.2em] text-light-text/50">
                                    <tr>
                                        <th className="p-4">Contributor</th>
                                        <th className="p-4">Classification</th>
                                        <th className="p-4 w-1/2">Submission Message</th>
                                        <th className="p-4 text-right">Moderation Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-light-neutral/30">
                                    {pending.map(item => (
                                        <tr key={item.id} className="hover:bg-primary/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-light-text">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold ${item.type === 'quote' ? 'border-primary/40 text-primary' : 'border-accent/40 text-accent'}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-light-text/80 leading-relaxed italic">
                                                "{item.content}"
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => handleApprove(item.id)} 
                                                        className="bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-dark-bg px-4 py-2 rounded-lg transition-all text-[10px] font-bold uppercase tracking-wider shadow-lg"
                                                    >
                                                        Publish
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)} 
                                                        className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-dark-bg px-4 py-2 rounded-lg transition-all text-[10px] font-bold uppercase tracking-wider shadow-lg"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* Published Content */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            Live Wall Content ({published.length})
                        </h2>
                        {published.length > 0 && (
                            <button onClick={handleClearPublished} className="text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest font-bold transition-colors">Wipe Wall</button>
                        )}
                    </div>
                    
                    {published.length === 0 ? (
                        <div className="p-12 text-center bg-dark-neutral/30 rounded-2xl border border-dashed border-light-neutral/50">
                            <p className="text-light-text/30 italic">The positivity wall is currently empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {published.map(item => (
                                <div key={item.id} className="p-5 bg-dark-neutral border border-primary/20 rounded-2xl relative group hover:border-red-500/50 transition-all duration-300 shadow-lg flex flex-col">
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 z-20"
                                        title="Delete from Wall"
                                    >
                                        <IconX className="w-4 h-4" />
                                    </button>
                                    
                                    <div className="mb-3">
                                        <span className={`text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border ${item.type === 'quote' ? 'border-primary/30 text-primary' : 'border-accent/30 text-accent'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    
                                    <p className="text-xs italic text-light-text/80 line-clamp-4 mb-4 leading-relaxed flex-grow">"{item.content}"</p>
                                    
                                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-light-neutral/50">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                                            {item.name.charAt(0)}
                                        </div>
                                        <span className="text-[10px] font-bold text-light-text/60 truncate">By {item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <div className="mt-24 pt-8 border-t border-light-neutral/30 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-light-text/10">Healer Admin Protocol v1.3 // Management Session active</p>
            </div>
        </div>
    );
};

export default AdminPage;
