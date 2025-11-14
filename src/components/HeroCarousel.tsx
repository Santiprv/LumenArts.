import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Film, Users, Trophy, Sparkles } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Comparte tu Arte",
      subtitle: "Sube tus cortometrajes y muestra tu talento al mundo",
      icon: <Film className="h-20 w-20" />,
      gradient: "from-primary via-red-600 to-red-800",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80"
    },
    {
      title: "Comunidad Global",
      subtitle: "Conecta con más de 10,000 cineastas de todo el mundo",
      icon: <Users className="h-20 w-20" />,
      gradient: "from-gray-700 via-gray-600 to-gray-800",
      image: "https://images.unsplash.com/photo-1574267432644-f610f5b7e2e5?w=1200&q=80"
    },
    {
      title: "Compite y Gana",
      subtitle: "Participa en eventos mensuales con premios reales",
      icon: <Trophy className="h-20 w-20" />,
      gradient: "from-red-700 via-primary to-red-900",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80"
    },
    {
      title: "Crece tu Carrera",
      subtitle: "Recibe feedback profesional y mejora tus habilidades",
      icon: <Sparkles className="h-20 w-20" />,
      gradient: "from-gray-800 via-gray-700 to-primary",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-cinema">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 md:px-20">
            <div className="text-white mb-6 animate-fade-in-scale">
              {slide.icon}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in drop-shadow-2xl">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}



      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-primary'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
