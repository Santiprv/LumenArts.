import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoId: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoId, opacity = 0.6 }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Intentar forzar el autoplay después de que el iframe cargue
    const timer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        } catch (e) {
          console.log('Could not autoplay video');
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Container para ocultar bordes de YouTube */}
      <div className="absolute inset-0 scale-[1.02] overflow-hidden">
        {/* YouTube Video */}
        <iframe
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-[102%] min-w-[102%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&color=white&origin=${window.location.origin}`}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{
            border: 'none',
            outline: 'none',
          }}
        />
      </div>
      
      {/* Dark Overlay with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10"
        style={{ opacity }}
      />
      
      {/* Additional vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
      
      {/* Ocultar logo de YouTube en las esquinas */}
      <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-l from-black/80 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-20" />
    </div>
  );
};

export default VideoBackground;
