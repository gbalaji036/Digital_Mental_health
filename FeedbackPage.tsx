
import React, { useState } from 'react';
import { dbService } from '../services/dbService';

const FeedbackPage: React.FC = () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dbService.saveFeedback(feedback);
        setSubmitted(true);
    };

    if (submitted) {
        return (
             <div className="container mx-auto px-6 py-12 md:py-20 text-center">
                <div className="bg-dark-neutral border border-light-neutral/50 p-12 rounded-xl max-w-lg mx-auto shadow-lg">
                    <h1 className="text-3xl font-bold text-primary mb-4">Thank you for your feedback!</h1>
                    <p className="text-light-text/90">Your input is invaluable in helping us improve Healer for everyone.</p>
                     <button onClick={() => { setSubmitted(false); setFeedback(''); }} className="mt-8 bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                        Submit More Feedback
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Share Your Feedback</h1>
                <p className="max-w-2xl mx-auto text-light-text/70 mt-4">Help us make this platform better. All feedback is anonymous and greatly appreciated.</p>
            </div>

            <div className="max-w-xl mx-auto bg-dark-neutral p-8 rounded-xl shadow-lg border border-light-neutral/50">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-light-text/80 mb-2">Your Feedback</label>
                        <textarea
                            id="feedback"
                            rows={8}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                            placeholder="What's on your mind? What can we improve?"
                            className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary"
                        ></textarea>
                    </div>
                    <div className="mt-6">
                         <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-4 rounded-md transition-colors duration-300">
                            Submit Anonymously
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
