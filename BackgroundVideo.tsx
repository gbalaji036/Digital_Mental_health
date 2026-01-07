
import React from 'react';

interface BackgroundVideoProps {
  src: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src={src}
        // Add a poster image for faster initial load or if video fails
        poster="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"></div>
    </div>
  );
};

export default BackgroundVideo;
