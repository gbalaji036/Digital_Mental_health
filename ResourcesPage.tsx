
import React, { useState } from 'react';
import { RESOURCES, VIDEO_RESOURCES } from '../constants';
import type { Resource, VideoResource } from '../types';
import { Link } from 'react-router-dom';

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const cardColors = {
        helpline: 'border-red-500/50 hover:bg-red-500/10',
        guide: 'border-primary/50 hover:bg-primary/10',
        counselor: 'border-accent/50 hover:bg-accent/10',
    };
    
    const isInternalLink = resource.link.startsWith('#/');

    if (isInternalLink) {
        return (
             <Link to={resource.link.substring(1)} className={`block bg-dark-neutral p-6 rounded-lg border-2 transition-colors duration-300 ${cardColors[resource.type]}`}>
                <h3 className="text-xl font-semibold text-light-text mb-2">{resource.title}</h3>
                <p className="text-light-text/70">{resource.description}</p>
            </Link>
        )
    }

    return (
        <a href={resource.link} target="_blank" rel="noopener noreferrer" className={`block bg-dark-neutral p-6 rounded-lg border-2 transition-colors duration-300 ${cardColors[resource.type]}`}>
            <h3 className="text-xl font-semibold text-light-text mb-2">{resource.title}</h3>
            <p className="text-light-text/70">{resource.description}</p>
        </a>
    );
};

const VideoCard: React.FC<{ video: VideoResource }> = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

    return (
        <div className="bg-dark-neutral rounded-lg overflow-hidden border-2 border-light-neutral/50 flex flex-col shadow-sm">
            <div className="w-full aspect-video relative group bg-dark-bg">
                {!isPlaying ? (
                    <>
                        <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <button onClick={() => setIsPlaying(true)} className="w-20 h-20 rounded-full bg-primary/70 backdrop-blur-sm text-dark-bg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" aria-label={`Play video: ${video.title}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.538 0 3.286L7.279 20.99c-1.25.722-2.779-.216-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-light-text mb-1">{video.title}</h3>
                <p className="text-light-text/70 text-sm">{video.description}</p>
            </div>
        </div>
    );
};


const ResourcesPage: React.FC = () => {
    const helplines = RESOURCES.filter(r => r.type === 'helpline');
    const guides = RESOURCES.filter(r => r.type === 'guide');

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Help & Resources</h1>
                <p className="max-w-2xl mx-auto text-light-text/70 mt-4">A curated list of tools and support systems. You are not alone.</p>
            </div>
            
            <div className="space-y-12">
                {/* Crisis Helplines */}
                <div>
                    <h2 className="text-3xl font-bold text-red-500 mb-6 border-b-2 border-red-500/30 pb-2">Immediate Crisis Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helplines.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
                    </div>
                </div>

                {/* Educational Videos */}
                <div>
                    <h2 className="text-3xl font-bold text-accent mb-6 border-b-2 border-accent/30 pb-2">Educational Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {VIDEO_RESOURCES.map(video => <VideoCard key={video.videoId} video={video} />)}
                    </div>
                </div>

                {/* Self-Help Guides */}
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-primary/30 pb-2">Self-Help Guides & Tools</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.map(resource => <ResourceCard key={resource.title} resource={resource} />)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResourcesPage;
