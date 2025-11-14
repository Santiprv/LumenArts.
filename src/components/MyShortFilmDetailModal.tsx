import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, Eye, Clock, Calendar, ExternalLink } from '@/lib/icon-imports';

interface MyShortFilmDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  film: any | null;
}

const getYouTubeEmbed = (url: string | undefined) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    const v = u.searchParams.get('v');
    if (v) return `https://www.youtube.com/embed/${v}`;
    // handle short youtu.be links
    if (u.hostname === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}`;
  } catch (e) {
    return null;
  }
  return null;
};

const MyShortFilmDetailModal: React.FC<MyShortFilmDetailModalProps> = ({ isOpen, onClose, film }) => {
  if (!film) return null;

  const embed = getYouTubeEmbed(film.video_url || film.youtube_url);
  const externalUrl = film.video_url || film.youtube_url;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      drama: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      comedia: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      terror: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "ciencia-ficcion": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      documental: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      animacion: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      experimental: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground pr-8">{film.title}</DialogTitle>
            <Badge className="bg-primary/10 text-primary">
              Mi Cortometraje
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden animate-fade-in">
            {embed ? (
              <iframe
                title={film.title}
                src={embed}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={film.thumbnail_url || '/placeholder.svg'} 
                  alt={film.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-2 opacity-80" />
                    <p className="text-sm">Vista previa no disponible</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Film Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{film.duration ? formatDuration(film.duration) : 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Duración</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Eye className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{(film.views_count || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Vistas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{(film.likes_count || 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Me gusta</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{film.created_at ? formatDate(film.created_at) : 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Publicado</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {film.description || "No hay descripción disponible para este cortometraje."}
            </p>
          </div>

          {/* Category */}
          {film.category && (
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Categoría:</h3>
              <Badge className={getCategoryColor(film.category)}>
                {film.category.charAt(0).toUpperCase() + film.category.slice(1).replace('-', ' ')}
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {externalUrl && (
              <Button asChild className="flex-1">
                <a href={externalUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" /> Ver Cortometraje
                </a>
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyShortFilmDetailModal;