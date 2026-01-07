
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { UserInputs, Counselor, Suggestion } from '../types';
import { findLocalCounselors } from '../services/apiService';
import { IconJournal, IconMindfulness, IconSound, IconBot, IconQuote } from './IconComponents';

const useTypewriter = (text: string, speed = 25) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
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
        }, 500);
       
        return () => clearTimeout(timer);
    }, [text, speed]);
    return displayText;
};

const parseCounselorMarkdown = (markdown: string): Counselor[] => {
    if (!markdown) return [];
    const counselors: Counselor[] = [];
    // Split by list items that start with '*' or '-'
    const entries = markdown.trim().split(/\n\s*[\*\-]\s*/);

    for (let entry of entries) {
        entry = entry.replace(/^[\*\-]\s*/, '').trim();
        if (!entry) continue;

        const lines = entry.split('\n').map(line => line.trim());
        if (lines.length < 1) continue;

        const firstLine = lines.shift()!; // First line is always the name/title line
        
        let name = firstLine.replace(/\*\*/g, ''); // Remove bold markdown for cleaner name
        let specialty: string | undefined = undefined;

        // Try to find a specialty if one is provided with a separator
        const specialtySeparators = [':', '-', '–', '|'];
        for (const sep of specialtySeparators) {
            const sepIndex = name.indexOf(sep);
            if (sepIndex > -1) {
                specialty = name.substring(sepIndex + 1).trim();
                name = name.substring(0, sepIndex).trim();
                break;
            }
        }
        
        let phone = 'Phone not available';
        let addressLines: string[] = [];

        for (const line of lines) {
            // A simple but effective check for a phone number
            if (/\d{7,}/.test(line.replace(/\D/g, ''))) {
                phone = line;
            } else if (line) { // Avoid adding empty lines to address
                addressLines.push(line);
            }
        }

        const address = addressLines.length > 0 ? addressLines.join(', ') : 'Address not available';

        counselors.push({ name, specialty, address, phone });
    }
    // Filter out any entries where a name could not be parsed.
    return counselors.filter(c => c.name && c.name !== 'Name not available');
};

const CounselorCard: React.FC<{ counselor: Counselor }> = ({ counselor }) => (
    <div className="bg-dark-bg p-4 rounded-lg border border-light-neutral animate-fade-in-up">
        <h4 className="text-lg font-bold text-accent">{counselor.name}</h4>
        {counselor.specialty && <p className="text-sm text-light-text/80 italic mb-2">{counselor.specialty}</p>}
        <p className="text-light-text/70 text-sm mt-1">{counselor.address}</p>
        <a href={`tel:${counselor.phone.replace(/\D/g, '')}`} className="text-primary font-semibold mt-2 inline-block hover:underline">{counselor.phone}</a>
    </div>
);


const HighRiskPlan: React.FC = () => {
    const typedText = useTypewriter("Based on your answers, it seems like you're going through a very difficult time. Please know that your safety is the most important thing right now. Reaching out for professional help is a sign of incredible strength.");
    const [counselors, setCounselors] = useState<Counselor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFindCounselors = () => {
        setIsLoading(true);
        setError('');
        setCounselors([]);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const results = await findLocalCounselors(position.coords.latitude, position.coords.longitude);
                    const parsedCounselors = parseCounselorMarkdown(results);
                    if (parsedCounselors.length > 0) {
                       setCounselors(parsedCounselors);
                    } else {
                       setError("Could not find specific local counselors at this moment, but please use online directories like Psychology Today or contact the helplines below.")
                    }
                } catch (apiError: any) {
                    setError(apiError.message || 'An error occurred while fetching data. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                setError('Could not access your location. Please enable location services in your browser settings and try again.');
                setIsLoading(false);
            }
        );
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 text-left">
            <p className="text-light-text/90 mb-6 min-h-[6rem]">{typedText}</p>
            <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-red-400">Immediate Priority: Talk to Someone Now</h3>
                    <p className="text-red-400/90 mt-2">If you are in crisis, please use these 24/7 resources immediately.</p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-3">
                        <a href="tel:1800-599-0019" className="font-bold text-center flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition-colors duration-300">Call KIRAN Helpline (1800-599-0019)</a>
                        <a href="tel:9999666555" className="font-bold text-center flex-1 bg-light-neutral hover:bg-light-neutral/80 text-light-text py-2 px-4 rounded-lg transition-colors duration-300">Call Vandrevala Foundation (9999666555)</a>
                    </div>
                </div>

                <div className="bg-dark-neutral p-4 rounded-lg border border-light-neutral/50">
                    <h3 className="text-lg font-bold text-accent">Find Local Professional Help</h3>
                    <p className="text-light-text/70 mt-2 mb-4">With your permission, we can find top-rated, confidential counselors in your area.</p>
                    <button onClick={handleFindCounselors} disabled={isLoading} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:bg-light-neutral">
                        {isLoading ? 'Searching...' : 'Find Local Counselors'}
                    </button>
                    {error && <p className="text-yellow-500 mt-3 text-sm">{error}</p>}
                    {counselors.length > 0 && (
                        <div className="mt-4 space-y-3">
                           {counselors.map((counselor, index) => <CounselorCard key={index} counselor={counselor} />)}
                        </div>
                    )}
                </div>

                <div className="bg-dark-neutral p-4 rounded-lg border border-light-neutral/50">
                    <h3 className="text-lg font-bold text-primary">A Calming Moment, Right Now</h3>
                    <p className="text-light-text/70 mt-2 mb-4">While you consider the next steps, this simple exercise can help ground you in the present moment.</p>
                    <Link to="/activities/mindfulness" className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300 inline-block">
                        Try a 1-Minute Breathing Exercise
                    </Link>
                </div>
            </div>
        </div>
    );
};


const ModerateRiskPlan: React.FC<{ answers: UserInputs }> = ({ answers }) => {
    const typedText = useTypewriter("It sounds like you're carrying a heavy weight right now, and it's completely valid to feel this way. Let's look at a few small, gentle steps you can take to find some relief. Here are some suggestions based on what you've shared:");

    const getSuggestions = (): Suggestion[] => {
        const suggestions: Suggestion[] = [];
        if (answers.sleepQuality === 'Poor' || answers.sleepQuality === 'Very Poor') {
            suggestions.push({ title: 'For Restless Nights', text: 'When sleep feels out of reach, a calming immersive scene can help quiet the mind.', link: '/activities/mindfulness/immersive', linkText: 'Try an Immersive Escape', Icon: IconSound });
        }
        if (answers.workload === 'Overwhelming' || answers.academicPressure.includes('High')) {
             suggestions.push({ title: 'For Academic Pressure', text: 'When your workload feels overwhelming, a short, focused break can make all the difference.', link: '/activities/mindfulness', linkText: 'Try a Mindful Exercise', Icon: IconMindfulness });
        }
        if (answers.socialSatisfaction.includes('Dissatisfied') || answers.supportSystem.includes('No')) {
             suggestions.push({ title: 'For When You Feel Alone', text: 'Sometimes, just writing things down can make them feel more manageable. Our AI Companion offers a private space to talk.', link: '/chatbot', linkText: 'Talk with AI Companion', Icon: IconBot });
        }
        if (answers.interestLoss.includes('days') || answers.feelingDown.includes('days')) {
             suggestions.push({ title: 'To Find a Spark', text: 'When it\'s hard to feel joy, sometimes a small, positive story or an uplifting quote can offer a glimmer of light.', link: '/activities/inspiration', linkText: 'Find Inspiration', Icon: IconQuote });
        }
        // Fallback suggestion
        if(suggestions.length < 2) {
            suggestions.push({ title: 'A Space to Reflect', text: 'Journaling can be a powerful tool to untangle your thoughts. Consider spending a few minutes with our private journal.', link: '/activities/check-in', linkText: 'Open Your Journal', Icon: IconJournal });
        }
        return suggestions.slice(0, 3);
    }
    
    return (
        <div className="w-full max-w-3xl mx-auto mt-8 text-left">
            <p className="text-light-text/90 mb-6 text-center min-h-[6rem]">{typedText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSuggestions().map((s, i) => (
                     <div key={s.title} className="bg-dark-neutral p-6 rounded-lg border border-light-neutral/50 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms`}}>
                        <div className="flex items-center mb-3">
                            <s.Icon className="w-6 h-6 text-accent mr-3" />
                            <h3 className="text-lg font-bold text-accent">{s.title}</h3>
                        </div>
                        <p className="text-light-text/70 mb-4 text-sm">{s.text}</p>
                        <Link to={s.link} state={{ fromQuiz: true }} className="font-bold text-primary hover:text-primary/80 transition-colors duration-300">
                            {s.linkText} &rarr;
                        </Link>
                    </div>
                ))}
                 <div className="bg-dark-neutral p-6 rounded-lg border border-light-neutral/50 animate-fade-in-up md:col-span-2" style={{ animationDelay: '450ms'}}>
                    <h3 className="text-lg font-bold text-primary">Consider Professional Support</h3>
                    <p className="text-light-text/70 mb-4 mt-2 text-sm">These tools are a great starting point. Speaking with a counselor can provide you with personalized strategies for long-term well-being.</p>
                    <Link to="/resources" className="font-bold text-primary hover:text-primary/80 transition-colors duration-300">
                        Explore Help Resources &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};


const LowRiskPlan: React.FC = () => {
    const typedText = useTypewriter("It's great to see that you're in a good place with your mental well-being. Proactively maintaining it is just as important as addressing challenges. Here are a few ideas to help you continue to thrive and build resilience.");
    const chatInitialMessage = `I just took the wellness test and got a "Low Risk" result, which is great! I'd like to chat about ways to maintain good mental health and build resilience for the future.`;

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 text-left">
            <p className="text-light-text/90 mb-6 text-center min-h-[6rem]">{typedText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-dark-neutral p-6 rounded-lg border border-light-neutral/50 animate-fade-in-up" style={{ animationDelay: '100ms'}}>
                    <IconBot className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-bold text-accent">Explore Your Thoughts</h3>
                    <p className="text-light-text/70 my-2 text-sm">Sometimes just talking things out can lead to new insights. Our AI is here to be a sounding board.</p>
                    <Link to="/chatbot" state={{ initialMessage: chatInitialMessage }} className="font-bold text-primary hover:text-primary/80 transition-colors duration-300">
                        Chat with AI Companion &rarr;
                    </Link>
                </div>
                 <div className="bg-dark-neutral p-6 rounded-lg border border-light-neutral/50 animate-fade-in-up" style={{ animationDelay: '250ms'}}>
                     <IconMindfulness className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-bold text-primary">Build Your Wellbeing Toolkit</h3>
                    <p className="text-light-text/70 my-2 text-sm">Discover new mindfulness practices and positive activities to add to your mental health toolkit.</p>
                    <Link to="/activities" className="font-bold text-primary hover:text-primary/80 transition-colors duration-300">
                        Visit the Wellbeing Hub &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

interface WellnessPlanDisplayProps {
    riskLevel: string;
    answers: UserInputs;
}

const WellnessPlanDisplay: React.FC<WellnessPlanDisplayProps> = ({ riskLevel, answers }) => {
    switch (riskLevel) {
        case 'High Risk':
            return <HighRiskPlan />;
        case 'Moderate Risk':
            return <ModerateRiskPlan answers={answers} />;
        case 'Low Risk':
            return <LowRiskPlan />;
        default:
            return null;
    }
};

export default WellnessPlanDisplay;
