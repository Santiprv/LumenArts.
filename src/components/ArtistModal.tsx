import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film, Users, ExternalLink, Instagram, Twitter, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ShortFilm {
  id: string;
  title: string;
  thumbnail_url: string;
  description?: string;
  duration?: string;
  views?: number;
}

interface Artist {
  id?: string;
  name: string;
  avatar: string;
  films: number;
  followers: number;
  specialty: string;
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  shortfilms?: ShortFilm[];
}

interface ArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ isOpen, onClose, artist }) => {
  if (!artist) return null;

  // Mock data para cortometrajes del artista (en una app real vendría del backend)
  const mockShortFilms: ShortFilm[] = [
    {
      id: "1",
      title: "Reflexiones",
      thumbnail_url: "/assets/optimized/12_jpg-800.webp",
      description: "Un viaje introspectivo",
      duration: "8:30",
      views: 1200
    },
    {
      id: "2",
      title: "Luces de Ciudad",
      thumbnail_url: "/assets/optimized/fotografia-rastro-estrellas_149301-11800_jpg-800.webp",
      description: "Drama urbano nocturno",
      duration: "12:15",
      views: 2400
    },
    {
      id: "3",
      title: "Memorias",
      thumbnail_url: "/assets/optimized/U_k43e7da_1200x0__1_jpg-800.webp",
      description: "Historia familiar",
      duration: "6:45",
      views: 890
    }
  ];

  const artistShortFilms = artist.shortfilms || mockShortFilms.slice(0, Math.min(artist.films, 6));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 rounded-t-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 border-2 border-primary/30 shadow-lg">
                  <AvatarImage src={artist.avatar} alt={artist.name} />
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {artist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {artist.name}
                  </h2>

                  <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                    {artist.specialty}
                  </Badge>

                  <div className="flex gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-primary" />
                      <span className="font-medium">{artist.films} cortometrajes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{artist.followers.toLocaleString()} seguidores</span>
                    </div>
                  </div>

                  {/* Biografía */}
                  {artist.bio && (
                    <p className="text-muted-foreground leading-relaxed">
                      {artist.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Redes sociales */}
              <div className="flex gap-3 mt-4">
                {artist.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={artist.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Sitio Web
                    </a>
                  </Button>
                )}
                {artist.instagram && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </a>
                  </Button>
                )}
                {artist.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={artist.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              {/* Cortometrajes */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Film className="h-5 w-5 text-primary" />
                  Cortometrajes
                </h3>

                {artistShortFilms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artistShortFilms.map((film) => (
                      <motion.div
                        key={film.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-muted/50 rounded-lg overflow-hidden hover:bg-muted/70 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={film.thumbnail_url}
                            alt={film.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>

                        <div className="p-3">
                          <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                            {film.title}
                          </h4>
                          {film.description && (
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {film.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            {film.duration && <span>{film.duration}</span>}
                            {film.views && <span>{film.views.toLocaleString()} vistas</span>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Film className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Este artista aún no ha subido cortometrajes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtistModal;