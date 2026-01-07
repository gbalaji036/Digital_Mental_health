
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEARN_TOPICS } from '../constants/learnContent';
import { findLocalCounselors } from '../services/apiService';
import type { Counselor, LearnTopic } from '../types';

// Helper function to parse counselor data from markdown
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


// Card component to display counselor information
const CounselorCard: React.FC<{ counselor: Counselor }> = ({ counselor }) => (
    <div className="bg-dark-bg p-4 rounded-lg border border-light-neutral animate-fade-in-up">
        <h4 className="text-lg font-bold text-accent">{counselor.name}</h4>
        {counselor.specialty && <p className="text-sm text-light-text/80 italic mb-2">{counselor.specialty}</p>}
        <p className="text-light-text/70 text-sm mt-1">{counselor.address}</p>
        <a href={`tel:${counselor.phone.replace(/\D/g, '')}`} className="text-primary font-semibold mt-2 inline-block hover:underline">{counselor.phone}</a>
    </div>
);

const LearnCard: React.FC<{ topic: LearnTopic }> = ({ topic }) => (
    <Link to={`/diseases/${topic.slug}`} className="group relative block bg-dark-neutral rounded-xl overflow-hidden shadow-lg border border-light-neutral/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
        <div className="h-48">
            <img src={topic.cardImage} alt={topic.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-light-text group-hover:text-primary transition-colors duration-300">{topic.title}</h3>
            <p className="text-light-text/70 mt-1">{topic.cardDescription}</p>
        </div>
    </Link>
);


const DiseasesPage: React.FC = () => {
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
                       setError("Could not find specific local counselors at this moment, but please use online directories or contact the helplines provided.")
                    }
                } catch (apiError: any) {
                    setError(apiError.message || 'An error occurred while fetching data. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                setError('Could not access your location. Please enable location services and ensure you are accessing this site from a secure context (like localhost or https).');
                setIsLoading(false);
            }
        );
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Learn & Understand</h1>
                <p className="max-w-3xl mx-auto text-light-text/70 mt-4">Knowledge is the first step towards understanding and healing. Explore these common mental health topics to learn more for yourself or a friend.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {LEARN_TOPICS.map(topic => (
                    <LearnCard key={topic.slug} topic={topic} />
                ))}
            </div>

            <div className="mt-16 text-center bg-dark-neutral p-8 rounded-xl border border-light-neutral/50">
                <h2 className="text-3xl font-bold text-light-text">Ready to Take the Next Step?</h2>
                <p className="text-light-text/70 mt-3 mb-6 max-w-xl mx-auto">Speaking with a professional can provide personalized strategies and support for your journey. Click below to find counselors near you.</p>
                <button 
                    onClick={handleFindCounselors} 
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-light-neutral disabled:cursor-not-allowed flex items-center justify-center min-w-[280px]"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                        </>
                    ) : 'Find a Counselor Near Me'}
                </button>

                {isLoading && <p className="text-light-text/70 mt-4 text-sm animate-pulse">Finding the best local resources for you, this may take a moment...</p>}
                {error && <p className="text-yellow-500 mt-4 text-sm">{error}</p>}

                {counselors.length > 0 && (
                    <div className="mt-8 space-y-4 text-left max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-accent mb-4 text-center">Local Counselors & Professionals</h3>
                        {counselors.map((counselor, index) => <CounselorCard key={index} counselor={counselor} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseasesPage;