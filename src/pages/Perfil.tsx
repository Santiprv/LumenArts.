import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShortFilmCard from "@/components/ShortFilmCard";
import EditProfileModal from "@/components/EditProfileModal";
import MyShortFilmDetailModal from "@/components/MyShortFilmDetailModal";
import { Film, Heart, Eye, Settings, Users, UserPlus, TrendingUp, Mail, Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";

const Perfil = () => {
  const { user, profile } = useAuth();
  const { 
    totalFilms, 
    totalViews, 
    totalLikes, 
    followersCount, 
    followingCount, 
    userFilms, 
    loading 
  } = useUserStats();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<any | null>(null);
  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>('newest');

  const handleFilmClick = (film: any) => {
    setSelectedFilm(film);
    setFilmModalOpen(true);
  };

  // Ordenar cortometrajes según la opción seleccionada
  const sortedUserFilms = [...userFilms].sort((a, b) => {
    switch (sortOrder) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'popular':
        return (b.views_count || 0) - (a.views_count || 0);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header del perfil */}
        <Card className="bg-card border-border mb-12 animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-3xl">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">
                        {profile?.full_name || "Usuario"}
                      </h1>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Mi Perfil
                      </Badge>
                    </div>
                    
                    {/* Email del usuario */}
                    {user?.email && (
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    )}
                    
                    <p className="text-muted-foreground mb-4">
                      {profile?.bio || "¡Comparte tu creatividad con la comunidad!"}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        Creador
                      </Badge>
                      {totalFilms > 0 && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Activo
                        </Badge>
                      )}
                      {totalViews > 1000 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-border"
                    onClick={() => setEditModalOpen(true)}
                  >
                    <Settings className="h-4 w-4" />
                    Editar Perfil
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                      <Film className="h-6 w-6 text-primary" />
                      {loading ? "..." : totalFilms}
                    </div>
                    <p className="text-sm text-muted-foreground">Cortometrajes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                      <Eye className="h-6 w-6 text-primary" />
                      {loading ? "..." : formatNumber(totalViews)}
                    </div>
                    <p className="text-sm text-muted-foreground">Vistas</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                      <Heart className="h-6 w-6 text-primary" />
                      {loading ? "..." : formatNumber(totalLikes)}
                    </div>
                    <p className="text-sm text-muted-foreground">Me Gusta</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                      <Users className="h-6 w-6 text-primary" />
                      {loading ? "..." : formatNumber(followersCount)}
                    </div>
                    <p className="text-sm text-muted-foreground">Seguidores</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                      <UserPlus className="h-6 w-6 text-primary" />
                      {loading ? "..." : formatNumber(followingCount)}
                    </div>
                    <p className="text-sm text-muted-foreground">Siguiendo</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cortometrajes del usuario */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Mis Cortometrajes
            </h2>
            <div className="flex items-center gap-4">
              {totalFilms > 0 && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{totalFilms} {totalFilms === 1 ? 'cortometraje' : 'cortometrajes'}</span>
                  </div>
                  <select 
                    value={sortOrder} 
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'popular')}
                    className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="popular">Más populares</option>
                  </select>
                </>
              )}
            </div>
          </div>
          
          {loading && userFilms.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-secondary rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-secondary rounded mb-2" />
                    <div className="h-3 bg-secondary rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userFilms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedUserFilms.map((film) => (
                <Card 
                  key={film.id} 
                  className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleFilmClick(film)}
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img 
                      src={film.thumbnail_url || '/placeholder.svg'} 
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                          size="icon" 
                          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow animate-pulse-glow"
                        >
                          <Play className="h-8 w-8 fill-current" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-medium">
                        {formatDuration(film.duration)}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {film.title}
                    </h3>
                    
                    {film.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {film.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{formatNumber(film.views_count)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{formatNumber(film.likes_count)}</span>
                        </div>
                      </div>
                      {film.category && (
                        <Badge className="text-xs bg-primary/10 text-primary">
                          {film.category.charAt(0).toUpperCase() + film.category.slice(1).replace('-', ' ')}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  ¡Comienza tu viaje creativo!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Aún no has subido ningún cortometraje. ¡Comparte tu creatividad con la comunidad!
                </p>
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  Subir Mi Primer Cortometraje
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de edición de perfil */}
      <EditProfileModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
      />

      {/* Modal de detalles del cortometraje */}
      <MyShortFilmDetailModal 
        isOpen={filmModalOpen} 
        onClose={() => setFilmModalOpen(false)} 
        film={selectedFilm}
      />
    </div>
  );
};

export default Perfil;
