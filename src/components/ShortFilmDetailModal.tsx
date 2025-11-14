import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Play, Heart, Eye, Clock, User, Calendar, ExternalLink, Trophy } from '@/lib/icon-imports';
import { Info } from 'lucide-react';

interface Props {
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

const ShortFilmDetailModal: React.FC<Props> = ({ isOpen, onClose, film }) => {
  if (!film) return null;

  const embed = getYouTubeEmbed(film.youtube_url || film.video_url || film.url);
  const externalUrl = film.youtube_url || film.video_url || film.url;
  const isSample = !!film.youtube_url;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-card border-border/50 shadow-cinema">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DialogHeader className="space-y-4 pb-6">
                <div className="flex items-start justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <DialogTitle className="text-3xl font-bold bg-gradient-cinema bg-clip-text text-transparent pr-8 leading-tight">
                      {film.title}
                    </DialogTitle>
                  </motion.div>
                  {film.is_featured && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Badge className="bg-gradient-cinema text-white font-bold shadow-glow">
                        <Trophy className="h-3 w-3 mr-1" />
                        Destacado
                      </Badge>
                    </motion.div>
                  )}
                </div>
                
                {/* Creator Info */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Avatar className="h-12 w-12 border-2 border-primary/30 shadow-glow">
                    <AvatarImage src={film.creator_avatar} alt={film.creator_name} />
                    <AvatarFallback className="bg-gradient-cinema text-white font-bold">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg text-foreground">{film.creator_name || "Usuario Anónimo"}</p>
                    <p className="text-sm text-primary font-medium">Creador</p>
                  </div>
                </motion.div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Video Player */}
                <motion.div 
                  className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-cinema border border-border/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {embed ? (
                    <iframe
                      title={film.title}
                      src={embed}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full group">
                      <img 
                        src={film.cover || film.thumbnail_url || '/placeholder.svg'} 
                        alt={film.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <motion.div 
                          className="text-center text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="h-20 w-20 mx-auto mb-4 text-primary animate-cinema-glow" />
                          <p className="text-lg font-medium">Vista previa no disponible</p>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Film Stats */}
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {[
                    { icon: Clock, value: film.duration ? formatDuration(film.duration) : 'N/A', label: 'Duración', color: 'text-blue-400' },
                    { icon: Eye, value: (film.views_count || 0).toLocaleString(), label: 'Vistas', color: 'text-green-400' },
                    { icon: Heart, value: (film.likes_count || 0).toLocaleString(), label: 'Me gusta', color: 'text-red-400' },
                    { icon: Calendar, value: film.year || '2024', label: 'Año', color: 'text-purple-400' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      <div>
                        <p className="text-lg font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/30"
                >
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Descripción
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {film.description || "No hay descripción disponible para este cortometraje."}
                  </p>
                </motion.div>

          <Separator />

          {/* Awards */}
          {film.awards && film.awards.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Premios y Reconocimientos</h3>
              <div className="space-y-2">
                {film.awards.map((award: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories and Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categoría y Etiquetas</h3>
            <div className="flex flex-wrap items-center gap-2">
              {film.category && (
                <Badge className={getCategoryColor(film.category)}>
                  {film.category.charAt(0).toUpperCase() + film.category.slice(1).replace('-', ' ')}
                </Badge>
              )}
              {film.tags && film.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {isSample && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1">
                  <Info className="h-3 w-3" /> Ejemplo
                </Badge>
              )}
            </div>
          </div>

          {/* Related Films */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cortometrajes Relacionados</h3>
            <div className="text-sm text-muted-foreground">
              Descubre más cortometrajes de la misma categoría en la sección principal.
            </div>
          </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {externalUrl && (
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button asChild className="w-full bg-gradient-cinema hover:shadow-cinema transition-all duration-300 text-white font-bold h-12">
                        <a href={externalUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3">
                          <Play className="h-5 w-5" /> Ver Cortometraje
                        </a>
                      </Button>
                    </motion.div>
                  )}
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      onClick={onClose} 
                      className="w-full border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 h-12 font-medium"
                    >
                      Cerrar
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ShortFilmDetailModal;
