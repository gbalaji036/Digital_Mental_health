
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBot, IconUser } from '../components/IconComponents';
import BackgroundVideo from '../components/BackgroundVideo';

const ADMIN_ACCOUNTS = [
    { username: 'aditya', password: 'aditya' },
    { username: 'ankit', password: 'ankit' },
    { username: 'balaji', password: 'balaji' },
    { username: 'bartika', password: 'bartika' }
];

const AdminLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        const validAdmin = ADMIN_ACCOUNTS.find(
            acc => acc.username.toLowerCase() === username.toLowerCase() && acc.password === password
        );

        if (validAdmin) {
            sessionStorage.setItem('healer_admin_session', 'active');
            sessionStorage.setItem('healer_admin_name', validAdmin.username);
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Access denied.');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <BackgroundVideo src="https://videos.pexels.com/video-files/5472209/5472209-hd_1920_1080_25fps.mp4" />
            <div className="bg-dark-neutral/90 backdrop-blur-3xl p-8 rounded-3xl border border-light-neutral/50 w-full max-w-md shadow-2xl relative z-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <IconBot className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-light-text">Command Entry</h1>
                    <p className="text-light-text/40 text-xs font-mono tracking-widest mt-2 uppercase">Healer Administration Module</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconUser className="h-5 w-5 text-light-text/30" />
                        </div>
                        <input 
                            type="text" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="ADMIN_USER"
                            autoComplete="username"
                            className="w-full bg-dark-bg border border-light-neutral/50 rounded-lg py-4 pl-10 pr-4 text-light-text font-mono focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-text/20"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-light-text/30">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="ADMIN_TOKEN"
                            autoComplete="current-password"
                            className="w-full bg-dark-bg border border-light-neutral/50 rounded-lg py-4 pl-10 pr-4 text-light-text font-mono focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-text/20"
                        />
                    </div>
                    {error && <p className="text-red-400 text-xs font-mono text-center animate-shake">{error}</p>}
                    <button type="submit" className="w-full bg-primary text-dark-bg font-bold py-4 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 uppercase tracking-widest text-sm mt-2">
                        Authenticate Access
                    </button>
                </form>
                <div className="mt-8 flex justify-between items-center text-[10px] text-light-text/20 font-mono uppercase tracking-[0.2em]">
                    <span>Secure Layer v2.6</span>
                    <span>Role-Based Access Control</span>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
