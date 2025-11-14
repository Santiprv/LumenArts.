import React, { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  thumbnail: string;
  creator?: string;
  duration?: string;
};

const AutoSlider: React.FC<{ slides: Slide[]; interval?: number }> = ({ slides, interval = 4500 }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const start = () => {
    stop();
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
  };

  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = (i: number) => {
    setIndex(i);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={stop}
      onMouseLeave={start}
      className="relative w-full overflow-hidden rounded-xl shadow-card mb-8"
      aria-roledescription="carousel"
    >
      <div className="relative h-64 md:h-96">
        {slides.map((s, i) => (
          <figure
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={i !== index}
          >
            <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover" />
            <figcaption className="absolute left-6 bottom-6 text-left text-white z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-medium">{s.creator ?? 'Creador'}</span>
                {s.duration && <span className="text-xs opacity-80">• {s.duration}</span>}
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight bg-gradient-primary bg-clip-text text-transparent">{s.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* controls */}
      <div className="absolute left-4 bottom-4 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
