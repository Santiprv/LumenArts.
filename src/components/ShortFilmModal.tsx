import React from 'react';
import { X, Play, Calendar, Clock, User } from 'lucide-react';

interface ShortFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  film: {
    title: string;
    director: string;
    duration: string;
    year: string;
    description: string;
    genre: string;
    thumbnail: string;
  };
}

const ShortFilmModal: React.FC<ShortFilmModalProps> = ({ isOpen, onClose, film }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-card rounded-2xl shadow-cinema max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-scale border border-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all hover-lift"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-gray-800 overflow-hidden">
          <img
            src={film.thumbnail}
            alt={film.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow hover-scale cursor-pointer">
              <Play className="h-10 w-10 text-white ml-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-2">
            {film.title}
          </h2>

          {/* Genre Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            {film.genre}
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 mb-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{film.director}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{film.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{film.year}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">Sinopsis</h3>
            <p className="text-gray-300 leading-relaxed">
              {film.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all hover-lift shadow-glow">
              <Play className="inline h-5 w-5 mr-2" />
              Ver Ahora
            </button>
            <button className="px-6 py-3 border border-primary/50 hover:border-primary hover:bg-primary/10 text-white rounded-lg font-medium transition-all hover-lift">
              Más Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortFilmModal;
