import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Star, Users } from '@/lib/icon-imports';

const TIPS_DATA = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Usa luz natural",
    description: "Aprovecha la luz del día para dar un toque profesional a tus cortos sin equipo costoso."
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: "Planifica tu guion",
    description: "Un buen guion es la base de cualquier cortometraje memorable. Dedica tiempo a pulirlo."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Storyboarding",
    description: "Dibuja tus escenas clave antes de grabar. Te ayudará a visualizar mejor tu historia."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Networking",
    description: "Conecta con otros creadores. La colaboración puede elevar la calidad de tu proyecto."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Cuida el audio",
    description: "Un buen sonido es tan importante como la imagen. Invierte en un micrófono decente."
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: "Composición",
    description: "Aplica la regla de tercios para crear tomas más atractivas visualmente."
  }
];

const TipsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % TIPS_DATA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div 
      className="relative overflow-hidden bg-card rounded-xl shadow-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        {TIPS_DATA.map((tip, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 absolute inset-0 p-6 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="flex items-center gap-3 mb-3 text-accent">
              {tip.icon}
              <h4 className="font-semibold text-foreground">{tip.title}</h4>
            </div>
            <p className="text-muted-foreground">{tip.description}</p>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {TIPS_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-accent' : 'bg-muted'
            }`}
            aria-label={`Ver tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TipsSlider;