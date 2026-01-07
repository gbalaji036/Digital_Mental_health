import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { INSPIRATIONAL_QUOTES, MINDFUL_EXERCISES, POSITIVE_STORIES, MOOD_DATA, JOURNAL_PROMPTS, YOGA_ASANAS } from '../constants';
import { getMoodInsight, getJournalReflection } from '../services/apiService';
import type { VideoResource, Quote, YogaAsana } from '../types';
// FIX: Added IconStar to the import list to resolve the "Cannot find name 'IconStar'" error on line 640.
import { IconJournal, IconMindfulness, IconPuzzle, IconQuote, IconX, IconHeart, IconStudyBreak, HealedPot, IconStar } from '../components/IconComponents';
import MemoryGame from '../components/MemoryGame';
import JigsawPuzzle from '../components/JigsawPuzzle';
import BackgroundVideo from '../components/BackgroundVideo';

// --- Shared Helper Hooks & Components ---
const useTypewriter = (text: string, speed = 25) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        if (!text) return;
        setDisplayText('');
        let i = 0;
        const timer = setTimeout(() => {
             const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
             return () => clearInterval(typingInterval);
        }, 200);
        return () => clearTimeout(timer);
    }, [text, speed]);
    return displayText;
};

const PageHeader: React.FC<{ title: string; subtitle: string; backLink?: string; backText?: string; className?: string; }> = ({ title, subtitle, backLink, backText = "Back to Wellbeing Hub", className = 'text-primary' }) => (
    <div className="text-center mb-12 animate-fade-in-up">
        {backLink && <Link to={backLink} className="text-primary hover:text-primary/80 transition-colors duration-300 mb-4 inline-block">&larr; {backText}</Link>}
        <h1 className={`text-4xl md:text-5xl font-bold ${className}`}>{title}</h1>
        <p className="max-w-3xl mx-auto text-light-text/70 mt-4">{subtitle}</p>
    </div>
);

const colorStyles = {
    primary: { text: 'text-primary', border: 'border-primary/50', hoverBorder: 'hover:border-primary', iconBg: 'bg-primary/10' },
    gold: { text: 'text-accent', border: 'border-accent/50', hoverBorder: 'hover:border-accent', iconBg: 'bg-accent/10' },
    warm: { text: 'text-red-500', border: 'border-red-500/50', hoverBorder: 'hover:border-red-500', iconBg: 'bg-red-500/10' },
};

const ActivityCard: React.FC<{ title: string, description: string, path: string, Icon: React.FC<any>, color: 'primary' | 'gold' | 'warm'}> = ({ title, description, path, Icon, color }) => {
    const styles = colorStyles[color];
    return (
        <Link to={path} className={`group block bg-dark-neutral/80 backdrop-blur-sm p-8 rounded-xl border ${styles.border} ${styles.hoverBorder} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:bg-light-neutral animate-fade-in-up`}>
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${styles.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <Icon className={`w-8 h-8 ${styles.text}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${styles.text}`}>{title}</h2>
            <p className="text-light-text/70">{description}</p>
        </Link>
    );
};


// --- Mood Check-In Components ---
const MoodTracker: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<{ emoji: string, name: string } | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showTags, setShowTags] = useState(false);
    const [aiInsight, setAiInsight] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleMoodSelect = (mood: { emoji: string, name: string }) => {
        setSelectedMood(mood);
        setShowTags(true);
        setSelectedTags([]);
        setAiInsight('');
    };

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleGetInsight = async () => {
        if (!selectedMood) return;
        setIsLoading(true);
        setAiInsight('');
        const insight = await getMoodInsight(selectedMood.name, selectedTags);
        setAiInsight(insight);
        setIsLoading(false);
    };

    const typedInsight = useTypewriter(aiInsight);

    return (
        <div className="p-8 bg-dark-neutral rounded-lg shadow-lg max-w-2xl mx-auto border border-light-neutral/50 animate-fade-in-up">
            <h3 className="text-xl font-semibold text-light-text mb-4 text-center">How are you feeling right now?</h3>
            <div className="space-y-4 mb-6">
                {MOOD_DATA.categories.map(cat => (
                    <div key={cat.name}>
                        <h4 className={`font-semibold ${cat.color} mb-2`}>{cat.name}</h4>
                        <div className="flex flex-wrap gap-2">
                            {cat.moods.map(mood => (
                                <button key={mood.name} onClick={() => handleMoodSelect(mood)} className={`px-3 py-2 rounded-full text-lg transition-all duration-200 flex items-center gap-2 border-2 text-light-text ${selectedMood?.name === mood.name ? `${cat.bgColor} ${cat.color.replace('text-', 'border-')} font-semibold` : 'bg-dark-bg border-transparent hover:bg-light-neutral'}`}>
                                    <span className="text-2xl">{mood.emoji}</span> {mood.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showTags && (
                <div className="animate-fade-in-up border-t border-light-neutral pt-6 mt-6">
                    <h4 className="text-lg font-semibold text-light-text/80 mb-3 text-center">What's the context? (Optional)</h4>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {MOOD_DATA.tags.map(tag => (
                            <button key={tag} onClick={() => handleTagToggle(tag)} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${selectedTags.includes(tag) ? 'bg-primary text-dark-bg' : 'bg-light-neutral/80 hover:bg-light-neutral text-light-text'}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                    <div className="text-center">
                        <button onClick={handleGetInsight} disabled={isLoading} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:bg-light-neutral">
                            {isLoading ? 'Thinking...' : 'Get a Quick Insight'}
                        </button>
                    </div>
                </div>
            )}
            
            {typedInsight && (
                 <div className="mt-6 p-4 bg-dark-bg/50 rounded-lg border border-light-neutral animate-fade-in-up">
                    <p className="text-light-text/80 italic text-center">{typedInsight}</p>
                 </div>
            )}
        </div>
    );
};

// --- Journaling Components ---
const VoiceRecorder: React.FC<{ onRecordingComplete: (blob: Blob) => void }> = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleToggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];
                mediaRecorderRef.current.ondataavailable = event => {
                    audioChunksRef.current.push(event.data);
                };
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    onRecordingComplete(audioBlob);
                    stream.getTracks().forEach(track => track.stop()); // Stop mic access
                };
                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Microphone access denied:", err);
                alert("Microphone access is required for voice notes. Please enable it in your browser settings.");
            }
        }
    };

    return (
        <button onClick={handleToggleRecording} className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 font-semibold flex items-center gap-2 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-dark-bg hover:bg-light-neutral text-light-text'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" /><path d="M5.5 8.5a.5.5 0 0 1 .5.5v1a.5.5 A0 0 1-1 0v-1a.5.5 0 0 1 .5-.5Z" /><path d="M14.5 8.5a.5.5 0 0 1 .5.5v1a.5.5 A0 0 1-1 0v-1a.5.5 0 0 1 .5-.5Z" /><path d="M10 18a.5.5 0 0 0 .5-.5v-1.372c3.024-.954 5-3.834 5-7.128a.5.5 0 0 0-1 0c0 3.06-1.89 5.67-4.5 6.4v-1.03a.5.5 0 0 0-.5-.5h-.372a.5.5 0 0 0-.5.5v1.03c-2.61-.73-4.5-3.34-4.5-6.4a.5.5 0 0 0-1 0c0 3.294 1.976 6.174 5 7.128V17.5a.5.5 0 0 0 .5.5Z" /></svg>
            {isRecording ? 'Stop Recording' : 'Add Voice Note'}
        </button>
    );
};

const GuidedJournal: React.FC = () => {
    const [journalText, setJournalText] = useState('');
    const [mood, setMood] = useState('General');
    const [prompt, setPrompt] = useState('Click below for a new prompt, or write freely!');
    const [reflection, setReflection] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [audio, setAudio] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const getNewPrompt = () => {
        const promptsForMood = JOURNAL_PROMPTS[mood as keyof typeof JOURNAL_PROMPTS] || JOURNAL_PROMPTS.General;
        const randomIndex = Math.floor(Math.random() * promptsForMood.length);
        setPrompt(promptsForMood[randomIndex]);
    };

    const handleGetReflection = async () => {
        if (!journalText.trim()) return;
        setIsLoading(true);
        setReflection('');
        const result = await getJournalReflection(journalText);
        setReflection(result);
        setIsLoading(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleAudioUpload = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setAudio(url);
    };

    const typedReflection = useTypewriter(reflection);

    return (
        <div className="bg-dark-neutral rounded-lg p-8 shadow-lg border border-light-neutral/50 animate-fade-in-up">
            <h3 className="text-xl font-semibold text-light-text mb-2">Guided Journal</h3>
            <p className="text-light-text/70 mb-4">A private space for your thoughts. Nothing is saved or stored.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-light-text/80 self-center">Focus on:</span>
                {Object.keys(JOURNAL_PROMPTS).map(moodKey => (
                     <button key={moodKey} onClick={() => setMood(moodKey)} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${mood === moodKey ? 'bg-primary text-dark-bg' : 'bg-dark-bg text-light-text hover:bg-light-neutral'}`}>{moodKey}</button>
                ))}
            </div>
            
            <div className="bg-dark-bg p-4 rounded-lg mb-4 min-h-[6rem] flex flex-col justify-center">
                <p className="text-primary italic text-center">"{prompt}"</p>
            </div>
            
            <button onClick={getNewPrompt} className="w-full mb-4 bg-dark-bg hover:bg-light-neutral text-light-text font-bold py-2 px-4 rounded-full text-sm transition-colors duration-300">
                Get a New Prompt
            </button>
            
            <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Let your thoughts flow freely..."
                className="w-full h-60 bg-dark-bg p-4 rounded-lg text-light-text resize-none focus:outline-none focus:ring-2 focus:ring-primary border border-light-neutral"
            />

            <div className="flex flex-wrap gap-4 my-4">
                <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} className="hidden" />
                <button onClick={() => imageInputRef.current?.click()} className="px-4 py-2 text-sm rounded-full transition-colors duration-300 font-semibold bg-dark-bg hover:bg-light-neutral text-light-text flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909a.75.75 0 0 1-1.06 0l-2.09-2.09a.75.75 0 0 0-1.06 0l-3.59 3.591ZM.75 9.499a.75.75 0 0 0 0 1.06l3.59 3.59a.75.75 0 0 0 1.06 0l2.09-2.09a.75.75 0 0 1 1.06 0l1.91 1.909a.75.75 0 0 0 1.06 0l2.22-2.219a.75.75 0 0 0 0-1.06l-3.59-3.59a.75.75 0 0 0-1.06 0l-2.09 2.09a.75.75 0 0 1-1.06 0L4.31 8.44a.75.75 0 0 0-1.06 0l-2.5 2.5Z" clipRule="evenodd" /></svg>
                    Add Photo
                </button>
                <VoiceRecorder onRecordingComplete={handleAudioUpload} />
                <button onClick={handleGetReflection} disabled={isLoading || !journalText.trim()} className="px-4 py-2 text-sm rounded-full transition-colors duration-300 font-semibold bg-primary hover:bg-primary-dark text-dark-bg disabled:bg-light-neutral flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.422 2.22a.75.75 0 0 1 1.156 0l1.155 2.338a.75.75 0 0 0 .445.445l2.338 1.155a.75.75 0 0 1 0 1.156l-2.338 1.155a.75.75 0 0 0-.445.445l-1.155 2.338a.75.75 0 0 1-1.156 0l-1.155-2.338a.75.75 0 0 0-.445-.445L2.22 9.422a.75.75 0 0 1 0-1.156l2.338-1.155a.75.75 0 0 0 .445-.445L9.422 2.22ZM15.5 13.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5ZM13.5 15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5ZM15.5 17.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5ZM17.5 15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5Z" clipRule="evenodd" /></svg>
                   Get Reflection
                </button>
            </div>

            {(image || audio) && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {image && (
                        <div className="relative group">
                            <img src={image} alt="Journal entry" className="rounded-lg w-full h-auto" />
                            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <IconX className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    {audio && (
                         <div className="relative group flex items-center bg-dark-bg p-3 rounded-lg">
                            <audio controls src={audio} className="w-full"></audio>
                             <button onClick={() => setAudio(null)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <IconX className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {typedReflection && (
                 <div className="mt-6 p-4 rounded-lg bg-dark-bg/50 border border-light-neutral animate-fade-in-up">
                    <p className="text-light-text/80 italic text-center">{typedReflection}</p>
                 </div>
            )}
        </div>
    );
};

// --- Mindfulness Components ---

const BreathingExercise: React.FC = () => {
    const [text, setText] = useState('Get Ready...');
    const [animation, setAnimation] = useState('animate-none');

    useEffect(() => {
        const cycle = () => {
            setText('Breathe In...');
            setAnimation('animate-[pulse_4s_ease-in-out_infinite]');
            setTimeout(() => {
                setText('Hold...');
            }, 4000);
            setTimeout(() => {
                setText('Breathe Out...');
            }, 6000);
        };

        const timer = setTimeout(() => {
            cycle();
            const interval = setInterval(cycle, 8000);
            return () => clearInterval(interval);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-dark-neutral p-8 rounded-lg shadow-lg border border-light-neutral/50 h-96 animate-fade-in-up">
            <div className={`w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center ${animation}`}>
                <div className="w-32 h-32 bg-primary/40 rounded-full flex items-center justify-center">
                     <div className="w-24 h-24 bg-primary/60 rounded-full"></div>
                </div>
            </div>
            <p className="mt-8 text-2xl font-semibold text-light-text">{text}</p>
        </div>
    );
};

// --- NEW IMMERSIVE EXPERIENCE ---
interface ImmersiveScene {
  id: string;
  title: string;
  videoSrc: string;
  audioSrc: string;
}

const IMMERSIVE_SCENES: ImmersiveScene[] = [
  {
    id: 'ocean',
    title: 'Ocean Waves',
    videoSrc: 'https://videos.pexels.com/video-files/3254003/3254003-hd_1920_1080_25fps.mp4',
    audioSrc: 'https://cdn.pixabay.com/audio/2022/03/15/audio_783307590d.mp3'
  },
  {
    id: 'forest',
    title: 'Night Forest',
    videoSrc: 'https://videos.pexels.com/video-files/5472209/5472209-hd_1920_1080_25fps.mp4',
    audioSrc: 'https://cdn.pixabay.com/audio/2021/08/09/audio_884ca9776d.mp3'
  },
  {
    id: 'mountains',
    title: 'Mountain Breeze',
    videoSrc: 'https://videos.pexels.com/video-files/5492119/5492119-hd_1920_1080_25fps.mp4',
    audioSrc: 'https://cdn.pixabay.com/audio/2022/02/07/audio_64b3864013.mp3'
  }
];

const ImmersiveExperience: React.FC = () => {
    const [currentScene, setCurrentScene] = useState<ImmersiveScene>(IMMERSIVE_SCENES[0]);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);
    
    useEffect(() => {
        const playMedia = async () => {
            if (isPlaying && audioRef.current) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.error("Audio autoplay was blocked by the browser.", error);
                    setIsPlaying(false);
                }
            } else if (!isPlaying && audioRef.current) {
                audioRef.current.pause();
            }
        };
        playMedia();
    }, [currentScene, isPlaying]);


    const handleSceneChange = (scene: ImmersiveScene) => {
        if (scene.id !== currentScene.id) {
           setCurrentScene(scene);
           // After scene change, if it was playing, ensure it continues with new src
           if (isPlaying) {
             // The key on audio element ensures a fresh element, effect above handles playback
           }
        }
    };
    
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }
    
    return (
        <div className="bg-dark-neutral p-4 sm:p-6 rounded-lg shadow-lg border border-light-neutral/50 relative overflow-hidden animate-fade-in-up">
            <div className="aspect-video w-full relative bg-black rounded-lg overflow-hidden group">
                <video
                    key={currentScene.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src={currentScene.videoSrc}
                />
                
                <audio
                    ref={audioRef}
                    key={currentScene.audioSrc}
                    src={currentScene.audioSrc}
                    loop
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                     <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-primary/70 backdrop-blur-sm text-dark-bg flex items-center justify-center transform hover:scale-110 transition-transform" aria-label={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? (
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.538 0 3.286L7.279 20.99c-1.25.722-2.779-.216-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex flex-wrap gap-2 justify-center">
                    {IMMERSIVE_SCENES.map(scene => (
                        <button key={scene.id} onClick={() => handleSceneChange(scene)} className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${currentScene.id === scene.id ? 'bg-primary text-dark-bg' : 'bg-dark-bg text-light-text hover:bg-light-neutral'}`}>
                            {scene.title}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-light-text/70"><path d="M10.75 5.038a.75.75 0 0 0-1.5 0v9.924a.75.75 0 0 0 1.5 0V5.038Z" /><path d="M4.75 8.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z" /><path d="M16.25 6.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z" /></svg>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={e => setVolume(parseFloat(e.target.value))}
                        className="w-24 accent-primary"
                        aria-label="Volume"
                    />
                </div>
            </div>
        </div>
    );
};


const ArtTherapyCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#A78BFA');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.scale(2, 2);
        context.lineCap = 'round';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);
    
    useEffect(() => {
        if(contextRef.current) contextRef.current.strokeStyle = color;
    }, [color]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    const colors = ['#A78BFA', '#8B5CF6', '#C4B5FD', '#7C3AED', '#3B82F6', '#F5F3FF'];

    return (
        <div className="bg-dark-neutral p-6 rounded-lg shadow-lg border border-light-neutral/50 animate-fade-in-up">
            <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} onMouseLeave={finishDrawing} className="w-full h-96 bg-dark-bg rounded-lg cursor-crosshair" />
            <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                 <div className="flex gap-2">
                    {colors.map(c => (
                        <button key={c} style={{ backgroundColor: c }} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 ring-offset-dark-neutral ring-white' : ''}`} />
                    ))}
                </div>
                <button onClick={clearCanvas} className="px-4 py-2 text-sm rounded-full transition-colors duration-300 font-semibold bg-dark-bg hover:bg-light-neutral text-light-text">Clear</button>
            </div>
        </div>
    )
};

// --- Yoga Components ---
const YogaPoseCard: React.FC<{ asana: YogaAsana; onSelect: (asana: any) => void }> = ({ asana, onSelect }) => (
    <div 
        onClick={() => onSelect(asana)}
        className="group relative bg-dark-neutral/60 backdrop-blur-md rounded-[2rem] overflow-hidden border border-light-neutral/50 hover:border-primary transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-primary/20 flex flex-col h-full animate-fade-in-up"
    >
        <div className="h-56 relative overflow-hidden">
            <img 
              src={asana.image} 
              alt={asana.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6">
                <span className="text-[10px] uppercase font-black text-primary tracking-[0.4em] mb-1 block"> therapeutic asana </span>
                <h3 className="text-xl font-black text-white leading-tight">{asana.name}</h3>
            </div>
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
            <p className="text-light-text/50 text-xs line-clamp-2 mb-4 italic leading-relaxed">"{asana.benefits.substring(0, 85)}..."</p>
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                 <span className="text-[9px] font-mono text-primary/70 uppercase"> Focus: {asana.focus?.split(',')[0]} </span>
                 <button className="text-primary font-black text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1"> DETAILS <span className="text-lg">→</span></button>
            </div>
        </div>
    </div>
);

export const WellbeingYogaPage: React.FC = () => {
    const [selectedAsana, setSelectedAsana] = useState<YogaAsana | null>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false);
    }, [selectedAsana]);

    return (
        <div className="container mx-auto px-6 py-12 md:py-20 relative min-h-screen">
            <PageHeader 
                title="Neuro-Biological Reset: Asana Therapy" 
                subtitle="Curated restorative sequences designed to stimulate the vagus nerve and restore somatic equilibrium. Select a modality to view the clinical profile." 
                backLink="/activities" 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {YOGA_ASANAS.map(asana => (
                    <YogaPoseCard key={asana.id} asana={asana} onSelect={setSelectedAsana} />
                ))}
            </div>

            {/* Redesigned Modal Detail View - FIX: High reliability image rendering + Split screen */}
            {selectedAsana && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-black/95 backdrop-blur-3xl transition-all duration-500" onClick={() => setSelectedAsana(null)}>
                    <div 
                        className="bg-dark-neutral border border-primary/30 rounded-[3rem] w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-4xl relative animate-fade-in-up flex flex-col lg:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Section - Left (Desktop) / Top (Mobile) */}
                        <div className="w-full lg:w-1/2 h-72 lg:h-auto relative overflow-hidden shrink-0 z-10 bg-dark-bg flex items-center justify-center">
                            {!imageError ? (
                                <img 
                                    src={selectedAsana.image} 
                                    alt={selectedAsana.name} 
                                    className="w-full h-full object-cover" 
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="text-center p-12">
                                    <HealedPot className="w-20 h-20 text-primary/20 mx-auto mb-4" />
                                    <p className="text-primary/40 font-mono text-xs uppercase tracking-widest italic">Visual sync pending...</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-dark-neutral via-transparent to-transparent pointer-events-none"></div>
                            
                            {/* Close button Desktop */}
                            <button 
                                onClick={() => setSelectedAsana(null)}
                                className="hidden lg:flex absolute top-8 left-8 bg-black/50 backdrop-blur-xl text-white p-4 rounded-full hover:bg-primary hover:text-dark-bg transition-all shadow-2xl z-50 border border-white/10"
                            >
                                <IconX className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content Section - Right (Desktop) / Bottom (Mobile) - Independently Scrollable */}
                        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-dark-neutral relative z-20">
                            {/* Static Top Info */}
                            <div className="p-8 lg:p-12 pb-4 relative border-b border-white/5">
                                {/* Mobile Close */}
                                <button onClick={() => setSelectedAsana(null)} className="lg:hidden absolute top-8 right-8 text-white/60 hover:text-primary transition-colors"><IconX className="w-8 h-8"/></button>
                                
                                <span className="text-[10px] uppercase font-black text-primary tracking-[0.5em] mb-3 block"> somatic protocol </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-white leading-none tracking-tight mb-2">{selectedAsana.name}</h2>
                                <p className="text-primary-light font-mono italic text-sm opacity-60">{selectedAsana.sanskritName}</p>
                            </div>

                            {/* Scrollable Data Area */}
                            <div className="flex-grow overflow-y-auto p-8 lg:p-12 pt-6 space-y-12 custom-scrollbar">
                                <div>
                                    <h3 className="text-[10px] uppercase font-black text-accent tracking-[0.3em] mb-4"> clinical indication </h3>
                                    <p className="text-light-text/80 leading-relaxed text-lg italic border-l-4 border-accent pl-6"> {selectedAsana.benefits} </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
                                        <h4 className="text-[9px] uppercase font-black text-primary/40 tracking-widest mb-3"> Targeted System </h4>
                                        <p className="text-light-text font-bold text-sm"> {selectedAsana.focus} </p>
                                    </div>
                                    <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 shadow-inner">
                                        <h4 className="text-[9px] uppercase font-black text-red-400/40 tracking-widest mb-3"> Clinical Contraindication </h4>
                                        <p className="text-red-400/80 text-xs italic"> {selectedAsana.cautions} </p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-dark-bg text-xs font-black"> 01 </span>
                                        Instructional Alignment
                                    </h3>
                                    <ol className="space-y-6">
                                        {selectedAsana.steps.map((step, idx) => (
                                            <li key={idx} className="flex gap-6 group/step">
                                                <span className="flex-none w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-[10px] font-mono font-black text-primary group-hover/step:bg-primary group-hover/step:text-dark-bg transition-all"> {idx + 1} </span>
                                                <span className="text-light-text/70 group-hover/step:text-light-text text-base leading-relaxed pt-1 transition-colors"> {step} </span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* ENHANCED METADATA SECTION */}
                                <div className="space-y-6 pt-10 border-t border-white/5">
                                    <div className="p-8 bg-yellow-500/5 rounded-[2.5rem] border border-yellow-500/10 hover:border-yellow-500/30 transition-colors group/fact">
                                        <div className="flex items-center gap-3 mb-4">
                                            <IconStar className="w-5 h-5 text-yellow-500/50 group-hover/fact:scale-125 transition-transform" />
                                            <h3 className="text-[10px] uppercase font-black text-yellow-500 tracking-[0.4em]"> did you know? </h3>
                                        </div>
                                        <p className="text-light-text/70 text-sm italic leading-relaxed group-hover/fact:text-light-text transition-colors"> {selectedAsana.didYouKnow} </p>
                                    </div>
                                    <div className="p-8 bg-blue-400/5 rounded-[2.5rem] border border-blue-400/10 hover:border-blue-400/30 transition-colors group/impact">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                            <h3 className="text-[10px] uppercase font-black text-blue-400 tracking-[0.4em]"> neuro-physiological effect </h3>
                                        </div>
                                        <p className="text-light-text/70 text-sm italic leading-relaxed group-hover/impact:text-light-text transition-colors"> {selectedAsana.physiologicalEffect} </p>
                                    </div>
                                </div>

                                <div className="pt-8 pb-12">
                                     <button 
                                        onClick={() => setSelectedAsana(null)}
                                        className="w-full bg-primary text-dark-bg font-black py-6 rounded-[2rem] text-xl shadow-2xl hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-95 shadow-primary/20 uppercase tracking-widest"
                                     >
                                         INITIALIZE SESSION
                                     </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-24 text-center max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                <div className="p-12 bg-primary/5 border border-primary/10 rounded-[4rem] shadow-inner relative overflow-hidden group">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[120px] rounded-full transition-transform group-hover:scale-150 duration-1000"></div>
                    <IconQuote className="w-16 h-16 text-primary/10 mb-8 mx-auto" />
                    <p className="text-3xl md:text-5xl text-primary font-black italic tracking-tighter leading-[1.1] mb-8"> "Tension is who you think you should be. Relaxation is who you are." </p>
                    <p className="text-light-text/30 text-[10px] font-mono tracking-[0.6em] uppercase"> ancient somatic intelligence </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-12 opacity-30">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black hover:text-primary transition-colors cursor-default"> neuro-biological reset </span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black hover:text-accent transition-colors cursor-default"> parasympathetic dominance </span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black hover:text-red-400 transition-colors cursor-default"> biological equilibrium </span>
                </div>
            </div>
        </div>
    );
};

// --- Inspiration Components ---
const Inspiration: React.FC = () => {
    const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const [quote, setQuote] = useState<Quote>(getRandomItem(INSPIRATIONAL_QUOTES));
    const [exercise, setExercise] = useState(getRandomItem(MINDFUL_EXERCISES));
    const [story, setStory] = useState(getRandomItem(POSITIVE_STORIES));
    
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-dark-neutral p-8 rounded-lg shadow-lg border border-light-neutral/50 text-center">
                <h3 className="text-2xl font-semibold text-light-text mb-4">A Moment of Wisdom</h3>
                 <blockquote className="text-xl text-primary italic">"{quote.quote}"</blockquote>
                <p className="mt-2 text-light-text/70">- {quote.author}</p>
                <button onClick={() => setQuote(getRandomItem(INSPIRATIONAL_QUOTES))} className="mt-4 text-sm text-primary hover:underline">Show me another</button>
            </div>
             <div className="bg-dark-neutral p-8 rounded-lg shadow-lg border border-light-neutral/50">
                <h3 className="text-2xl font-semibold text-light-text mb-4 text-center">A Simple Mindful Exercise</h3>
                <h4 className="font-bold text-accent text-center text-lg">{exercise.title}</h4>
                <p className="text-light-text/80 mt-2 text-center max-w-xl mx-auto">{exercise.description}</p>
                 <div className="text-center">
                    <button onClick={() => setExercise(getRandomItem(MINDFUL_EXERCISES))} className="mt-4 text-sm text-primary hover:underline">Show me another</button>
                </div>
            </div>
            <div className="bg-dark-neutral p-8 rounded-lg shadow-lg border border-light-neutral/50">
                <h3 className="text-2xl font-semibold text-light-text mb-4 text-center">A Short, Positive Story</h3>
                <h4 className="font-bold text-accent text-center text-lg">{story.title}</h4>
                <p className="text-light-text/80 mt-2 text-center max-w-xl mx-auto">{story.content}</p>
                 <div className="text-center">
                    <button onClick={() => setStory(getRandomItem(POSITIVE_STORIES))} className="mt-4 text-sm text-primary hover:underline">Show me another</button>
                </div>
            </div>
        </div>
    )
};


// --- EXPORTED PAGES ---

// Main Hub
const ActivitiesPage: React.FC = () => (
    <div className="relative">
        <BackgroundVideo src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" />
        <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
            <PageHeader title="Wellbeing Hub" subtitle="A multi-modal toolkit engineered to restore cognitive balance and somatic equilibrium through scientifically-informed interactions." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActivityCard title="Mood Matrix" description="A granular real-time affective check-in utilized to provide instant neurological normalization." path="/activities/check-in" Icon={IconHeart} color="primary" />
                <ActivityCard title="Neural Journal" description="Secure cognitive offloading via private guided semantic exploration." path="/activities/journaling" Icon={IconJournal} color="gold" />
                <ActivityCard title="Sensory Grounding" description="Proprioceptive and auditory exercises optimized for acute stress modulation." path="/activities/mindfulness" Icon={IconMindfulness} color="warm" />
                <ActivityCard title="Asana Therapy" description="Biologically-targeted physical sequences designed to lower cortisol and induce parasympathetic dominance." path="/activities/yoga" Icon={HealedPot} color="primary" />
                <ActivityCard title="Rapid Refresh" description="A 5-minute tactical reset for intellectual burnout mitigation." path="/activities/study-break" Icon={IconStudyBreak} color="gold" />
                <ActivityCard title="Focus Puzzles" description="Calming cognitive tasks engineered to improve attention span and mindfulness." path="/activities/games" Icon={IconPuzzle} color="primary" />
                <ActivityCard title="Semantic Light" description="Curated motivational data structures for optimism reinforcement." path="/activities/inspiration" Icon={IconQuote} color="warm" />
            </div>
        </div>
    </div>
);
export default ActivitiesPage;


export const WellbeingCheckInPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Mood Matrix" subtitle="Data-driven validation of your current emotional state. Acknowledgment is the catalyst for neurological regulation." backLink="/activities" />
        <MoodTracker />
    </div>
);
export const WellbeingJournalingPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Neural Journal" subtitle="Execute a cognitive dump into a private, secure buffer. Utilize AI-reflection to gain objective perspective." backLink="/activities" />
        <GuidedJournal />
    </div>
);
export const WellbeingMindfulnessHubPage: React.FC = () => (
     <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Sensory Grounding Hub" subtitle="Select a sensory modality to recalibrate your present-moment awareness." backLink="/activities" />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link to="/activities/mindfulness/breathing" className="group block bg-dark-neutral p-6 rounded-lg border border-primary/50 text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-primary">Autonomic Reset</h3>
                <p className="text-light-text/70 mt-2">Box breathing to override the sympathetic nervous system.</p>
            </Link>
             <Link to="/activities/mindfulness/immersive" className="group block bg-dark-neutral p-6 rounded-lg border border-primary/50 text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-primary">Virtual Sanctuary</h3>
                <p className="text-light-text/70 mt-2">Immersive audiovisual environments for immediate escapism.</p>
            </Link>
             <Link to="/activities/mindfulness/art" className="group block bg-dark-neutral p-6 rounded-lg border border-primary/50 text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-primary">Freeform Canvas</h3>
                <p className="text-light-text/70 mt-2">Unstructured creative expression to bypass analytical stress.</p>
            </Link>
        </div>
    </div>
);
export const WellbeingMindfulnessBreathingPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Autonomic Reset" subtitle="Synchronize your respiratory cycle with the visual anchor to stabilize your heart rate variability." backLink="/activities/mindfulness" backText="Back to Grounding Hub" />
        <BreathingExercise />
    </div>
);
export const WellbeingMindfulnessImmersivePage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Virtual Sanctuary" subtitle="Trigger multisensory immersion. High-fidelity nature loops for parasympathetic activation." backLink="/activities/mindfulness" backText="Back to Grounding Hub" />
        <ImmersiveExperience />
    </div>
);
export const WellbeingMindfulnessArtPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Freeform Canvas" subtitle="Non-judgmental artistic projection. Focus exclusively on the haptic interaction and visual flow." backLink="/activities/mindfulness" backText="Back to Grounding Hub" />
        <ArtTherapyCanvas />
    </div>
);
export const WellbeingGamesHubPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Focus Engine" subtitle="Low-arousal cognitive engagement tasks designed to anchor attention without performance anxiety." backLink="/activities" />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ActivityCard title="Pattern Recall" description="Sharpen short-term memory through non-linear pattern identification." path="/activities/games/memory" Icon={IconPuzzle} color="primary" />
            <ActivityCard title="Mindful Assembly" description="Assemble fragmented visual data to cultivate sustained attention." path="/activities/games/jigsaw" Icon={IconPuzzle} color="gold" />
        </div>
    </div>
);
export const WellbeingGameMemoryPage: React.FC = () => (
     <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Pattern Recall" subtitle="Execute visual scanning and matching. Focus on the spatial relationship between nodes." backLink="/activities/games" backText="Back to Focus Engine" />
        <div className="max-w-xl mx-auto">
            <MemoryGame />
        </div>
    </div>
);
export const WellbeingGameJigsawPage: React.FC = () => {
    const [gameStarted, setGameStarted] = useState(false);

    if (!gameStarted) {
        return (
            <div className="container mx-auto px-6 py-12 md:py-20 text-center animate-fade-in-up">
                <PageHeader 
                    title="Mindful Assembly" 
                    subtitle="Initiate structural focus protocol." 
                    backLink="/activities/games" 
                    backText="Back to Focus Engine"
                    className="text-accent"
                />
                <div className="max-w-2xl mx-auto bg-dark-neutral p-10 rounded-[2rem] border border-light-neutral/50 shadow-2xl">
                    <p className="text-light-text/80 mb-8 leading-relaxed">
                        This environment is optimized for singular focus. Dissociate from completion speed; prioritize the tactile process of alignment and spatial awareness.
                    </p>
                    <button 
                        onClick={() => setGameStarted(true)}
                        className="bg-accent hover:bg-accent/80 text-dark-bg font-black py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        Initialize Assembly
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <PageHeader title="Mindful Assembly" subtitle="Anchor your focus to the emerging structure. Breathe with every successful connection." backLink="/activities/games" backText="Back to Focus Engine" className="text-accent" />
            <div className="max-w-3xl mx-auto">
                <JigsawPuzzle />
            </div>
        </div>
    );
};
export const WellbeingSoundscapesPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Calming Soundscapes" subtitle="Auditory environments engineered for various neurological requirements: focus, rest, or stabilization." backLink="/activities" />
    </div>
);
export const WellbeingInspirationPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Semantic Light" subtitle="Targeted optimistic data points to counteract cognitive biases and reinforce resilience." backLink="/activities" />
        <Inspiration />
    </div>
);

// --- 5-Minute Study Break Toolkit ---

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const FocusAudio: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            audioRef.current?.pause();
        }
    }, [isRunning, timeLeft]);

    const handleToggle = () => {
        if (isRunning) {
            audioRef.current?.pause();
        } else {
            if (timeLeft === 0) setTimeLeft(300);
            audioRef.current?.play();
        }
        setIsRunning(!isRunning);
    };

    return (
        <div className="bg-dark-neutral p-6 rounded-xl border border-light-neutral/50 flex flex-col items-center text-center h-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-accent mb-2">Alpha-Wave Audio</h3>
            <p className="text-light-text/70 text-sm mb-4 flex-grow italic">Atmospheric rain loops to neutralize external noise and facilitate cognitive reset.</p>
            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/10/18/audio_845c48692a.mp3" loop />
            <div className="text-5xl font-mono font-bold text-light-text my-4 bg-dark-bg/50 px-6 py-3 rounded-2xl border border-white/5">{formatTime(timeLeft)}</div>
            <button onClick={handleToggle} className={`w-full font-black py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl ${isRunning ? 'bg-red-500/80 hover:bg-red-500 text-white' : 'bg-accent hover:bg-accent/80 text-dark-bg'}`}>
                {isRunning ? 'Pause Loop' : timeLeft === 0 ? 'Restart' : 'Initialize Audio'}
            </button>
        </div>
    );
};

const DeskStretches: React.FC = () => {
    const stretches = [
        { name: 'Occipital Release', desc: 'Gently tilt and roll to relieve cervical tension.' },
        { name: 'Trapezius Shrugs', desc: 'Isolate and release major tension nodes in shoulders.' },
        { name: 'Spinal Decompression', desc: 'Torso rotation to restore lumbar fluid circulation.' },
        { name: 'Carpal Flexion', desc: 'Mitigate repetitive strain from keyboard interaction.' },
    ];
    
    return (
        <div className="bg-dark-neutral p-6 rounded-xl border border-light-neutral/50 flex flex-col text-center h-full animate-fade-in-up" style={{animationDelay: '100ms'}}>
            <h3 className="text-xl font-bold text-primary mb-2">Kinetic Reset</h3>
            <p className="text-light-text/70 text-sm mb-4 flex-grow italic">Targeted chair-based biomechanical release sequences.</p>
             <div className="space-y-3 my-4 text-left">
                {stretches.map(s => (
                    <div key={s.name} className="bg-dark-bg/50 p-3 rounded-xl border border-white/5 transition-colors hover:bg-primary/5">
                        <p className="font-bold text-primary text-sm uppercase tracking-wider">{s.name}</p>
                        <p className="text-[10px] text-light-text/60 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
            <div className="text-5xl font-mono font-bold text-light-text my-4">05:00</div>
            <Link to="/activities/mindfulness/breathing" className="w-full text-center bg-primary hover:bg-primary-dark text-dark-bg font-black py-4 px-8 rounded-2xl text-lg transition-all shadow-xl">
                Timed Respiratory Sync
            </Link>
        </div>
    );
};

const RapidVisualization: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [isRunning, timeLeft]);

    const handleToggle = () => {
        if (!isRunning && timeLeft === 0) setTimeLeft(300);
        setIsRunning(!isRunning);
    };

    return (
        <div className="bg-dark-neutral p-6 rounded-xl border border-light-neutral/50 flex flex-col items-center text-center h-full animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <h3 className="text-xl font-bold text-red-400 mb-2">Dissociative Escape</h3>
            <div className="text-light-text/70 text-sm mb-4 flex-grow border-l-2 border-red-400/20 pl-4 py-2">
                <p className="font-bold italic mb-3 text-red-400">"Visualize a sanctuary of absolute safety. Execute internal sensory mapping of this space."</p>
                <p className="text-xs">Bypass physical desk environment through 5 minutes of focused visual synthesis.</p>
            </div>
            <div className="text-5xl font-mono font-bold text-light-text my-4 bg-dark-bg/50 px-6 py-3 rounded-2xl border border-white/5">{formatTime(timeLeft)}</div>
            <button onClick={handleToggle} className={`w-full font-black py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl ${isRunning ? 'bg-red-500/80 hover:bg-red-500 text-white' : 'bg-red-400 hover:bg-red-500 text-dark-bg'}`}>
                {isRunning ? 'Interrupt Session' : timeLeft === 0 ? 'Restart' : 'Initialize Timer'}
            </button>
        </div>
    );
};


export const WellbeingStudyBreakPage: React.FC = () => (
    <div className="container mx-auto px-6 py-12 md:py-20">
        <PageHeader title="Tactical Burnout Mitigation" subtitle="Immediate high-impact interventions for intellectual fatigue and cognitive saturation." backLink="/activities" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FocusAudio />
            <DeskStretches />
            <RapidVisualization />
        </div>
    </div>
);
