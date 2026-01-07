
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEARN_TOPICS } from '../constants/learnContent';

const ArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const topic = LEARN_TOPICS.find(t => t.slug === slug);

    useEffect(() => {
        if (!topic) {
            // If topic is not found, redirect back to the main learn page
            navigate('/diseases');
        }
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, [topic, navigate]);

    if (!topic) {
        // Render nothing while redirecting
        return null; 
    }

    const { title, introduction, sections, conclusion } = topic.article;

    return (
        <div className="bg-dark-bg py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <Link to="/diseases" className="text-primary hover:text-primary-dark transition-colors duration-300 mb-8 inline-block animate-fade-in-up">
                        &larr; Back to Learn Hub
                    </Link>

                    <article className="bg-dark-neutral rounded-xl shadow-lg border border-light-neutral/50 p-8 md:p-12">
                        <header className="text-center border-b border-light-neutral/50 pb-8 mb-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-light-text tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                {title}
                            </h1>
                        </header>
                        
                        <div className="prose prose-invert prose-lg max-w-none prose-p:text-light-text/80 prose-headings:text-primary prose-headings:font-bold prose-strong:text-light-text/90 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <p className="lead text-xl text-light-text/90 italic">{introduction}</p>
                            
                            {sections.map((section, index) => (
                                <section key={index} className="mt-10">
                                    <h2 className="text-3xl text-accent">{section.heading}</h2>
                                    {section.content.split('\n').map((paragraph, pIndex) => (
                                        <p key={pIndex}>{paragraph}</p>
                                    ))}
                                    {section.image && (
                                        <figure className="my-8">
                                            <img src={section.image} alt={section.heading} className="rounded-lg shadow-md w-full" />
                                        </figure>
                                    )}
                                </section>
                            ))}

                            <section className="mt-12 border-t border-light-neutral/50 pt-8">
                                <p className="text-xl text-light-text/90">{conclusion}</p>
                            </section>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
