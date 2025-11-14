import React from 'react';
import { Film, Camera, Clapperboard, Video, Aperture, Zap } from 'lucide-react';

const CinematicElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {/* Film Strip Top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-primary/20 to-transparent">
        <div className="flex justify-around h-full items-center">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-primary/30 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Film Strip Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-primary/20 to-transparent">
        <div className="flex justify-around h-full items-center">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-primary/30 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Floating Cinema Icons */}
      <div className="absolute top-20 left-10 animate-float-cinema">
        <Film className="h-16 w-16 text-primary/20" />
      </div>

      <div className="absolute top-40 right-20 animate-float-cinema" style={{ animationDelay: '1s' }}>
        <Camera className="h-20 w-20 text-primary/15" />
      </div>

      <div className="absolute bottom-40 left-20 animate-float-cinema" style={{ animationDelay: '2s' }}>
        <Clapperboard className="h-24 w-24 text-primary/10" />
      </div>

      <div className="absolute top-1/3 right-10 animate-float-cinema" style={{ animationDelay: '1.5s' }}>
        <Video className="h-18 w-18 text-primary/20" />
      </div>

      <div className="absolute bottom-1/4 right-1/3 animate-float-cinema" style={{ animationDelay: '0.5s' }}>
        <Aperture className="h-16 w-16 text-primary/15" />
      </div>

      <div className="absolute top-1/2 left-1/4 animate-float-cinema" style={{ animationDelay: '2.5s' }}>
        <Zap className="h-14 w-14 text-primary/20" />
      </div>

      {/* Film Reels */}
      <div className="absolute top-1/4 left-1/2 animate-spin-slow">
        <div className="w-32 h-32 rounded-full border-8 border-primary/10 relative">
          <div className="absolute inset-4 rounded-full border-4 border-primary/15" />
          <div className="absolute inset-8 rounded-full border-2 border-primary/20" />
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/4 animate-spin-slow" style={{ animationDelay: '3s' }}>
        <div className="w-24 h-24 rounded-full border-6 border-primary/10 relative">
          <div className="absolute inset-3 rounded-full border-3 border-primary/15" />
        </div>
      </div>

      {/* Spotlight Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default CinematicElements;
