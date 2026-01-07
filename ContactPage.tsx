
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API endpoint.
        // For this demo, we'll just simulate it.
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-12 md:py-20 text-center">
                <div className="bg-dark-neutral border border-light-neutral/50 p-12 rounded-xl max-w-lg mx-auto shadow-lg">
                    <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
                    <p className="text-light-text/90">Your message has been sent. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Contact Us</h1>
                <p className="max-w-2xl mx-auto text-light-text/70 mt-4">Have questions or suggestions? We'd love to hear from you.</p>
            </div>

            <div className="max-w-xl mx-auto bg-dark-neutral p-8 rounded-xl shadow-lg border border-light-neutral/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-light-text/80">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-light-text/80">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-light-text/80">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary"
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-4 rounded-md transition-colors duration-300">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
