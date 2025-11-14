import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, TrendingUp, Clock, Search, Filter, Play, Heart, Eye, ExternalLink, Info } from "lucide-react";
import ShortFilmCard from "@/components/ShortFilmCard";
import ShortFilmDetailModal from "@/components/ShortFilmDetailModal";
import { shortFilmsSample } from '@/data/shortFilmsSample';
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ShortFilm = Tables<'short_films'>;

const Cortometrajes = () => {
  const [shortFilms, setShortFilms] = useState<ShortFilm[]>([]);
  const [featuredFilms, setFeaturedFilms] = useState<ShortFilm[]>([]);
  const [trendingFilms, setTrendingFilms] = useState<ShortFilm[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    "all",
    "drama",
    "comedia",
    "terror",
    "ciencia-ficcion",
    "documental",
    "animacion",
    "experimental"
  ];

  const sortOptions = [
    { value: "newest", label: "Más recientes" },
    { value: "popular", label: "Más populares" },
    { value: "liked", label: "Más gustados" },
    { value: "viewed", label: "Más vistos" }
  ];

  useEffect(() => {
    // fetchShortFilms(); // Comentado para mostrar solo ejemplos
  }, [sortBy, selectedCategory]);

  const fetchShortFilms = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('short_films')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq('category', selectedCategory);
      }

      switch (sortBy) {
        case "popular":
          query = query.order('views_count', { ascending: false });
          break;
        case "liked":
          query = query.order('likes_count', { ascending: false });
          break;
        case "viewed":
          query = query.order('views_count', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching short films:', error);
        // Continue with empty data instead of returning
      }

      setShortFilms(data || []);

      // Fetch featured films
      const { data: featuredData } = await supabase
        .from('short_films')
        .select('*')
        .eq('is_featured', true)
        .order('likes_count', { ascending: false })
        .limit(6);

      setFeaturedFilms(featuredData || []);

      // Fetch trending films (most liked in last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: trendingData } = await supabase
        .from('short_films')
        .select('*')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('likes_count', { ascending: false })
        .limit(6);

      setTrendingFilms(trendingData || []);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const mergedFilms = [...shortFilmsSample.map(s => ({
    id: s.id,
    title: s.title,
    description: s.description,
    thumbnail_url: s.thumbnail_url,
    youtube_url: s.youtube_url,
    creator_name: s.creator_name,
    duration: s.duration,
    views_count: s.views_count || 0,
    likes_count: s.likes_count || 0,
    category: s.category,
    is_featured: s.is_featured || false
  })), ...shortFilms];



  const filteredFilms = mergedFilms.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || film.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });



  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      drama: "bg-red-100 text-red-800",
      comedia: "bg-yellow-100 text-yellow-800",
      terror: "bg-purple-100 text-purple-800",
      "ciencia-ficcion": "bg-blue-100 text-blue-800",
      documental: "bg-green-100 text-green-800",
      animacion: "bg-pink-100 text-pink-800",
      experimental: "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Helper to resolve an external video URL (handles sample objects and backend objects)
  const getFilmSource = (film: any) => {
    return film?.youtube_url || film?.video_url || film?.url || null;
  };

  // Helper to check if a film is a sample
  const isSampleFilm = (film: any) => {
    return !!film.youtube_url;
  };

  return (
    <div className="min-h-screen bg-gradient-hero mobile-nav-padding">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Cinematic Header */}
        <motion.div 
          className="mb-12 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-cinema opacity-10 blur-3xl animate-spotlight"></div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-cinema bg-clip-text text-transparent mb-6 animate-gradient-shift"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Cortometrajes
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre historias extraordinarias contadas en formato corto. 
            <span className="text-primary font-medium"> Una experiencia cinematográfica única.</span>
          </motion.p>
        </motion.div>

        {/* Cinematic Search and Filters */}
        <motion.div 
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary transition-colors" />
              <Input
                placeholder="Buscar cortometrajes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 hover:bg-card/70"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-56 h-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                <Filter className="h-4 w-4 mr-2 text-primary" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category} className="hover:bg-primary/10">
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-56 h-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="hover:bg-primary/10">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Tabs defaultValue="explore" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-card/30 backdrop-blur-sm border border-border/50 h-14">
              <TabsTrigger 
                value="explore" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 text-base font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                Explorar
              </TabsTrigger>
              <TabsTrigger 
                value="featured" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 text-base font-medium"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Destacados
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 text-base font-medium"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Tendencia
              </TabsTrigger>
            </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <Card className="animate-pulse bg-card/30 border-border/50">
                        <div className="aspect-video bg-muted/30 rounded-t-lg" />
                        <CardContent className="p-6">
                          <div className="h-4 bg-muted/30 rounded mb-3" />
                          <div className="h-3 bg-muted/20 rounded w-2/3" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {filteredFilms.map((film, index) => (
                    <motion.div
                      key={film.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => { setSelectedFilm(film); setModalOpen(true); }}
                    >
                      <Card className="overflow-hidden bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-cinema">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={film.thumbnail_url || '/placeholder.svg'} 
                            alt={film.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button 
                                  size="icon" 
                                  className="h-20 w-20 rounded-full bg-primary hover:bg-primary/90 shadow-cinema animate-cinema-glow"
                                >
                                  <Play className="h-10 w-10 fill-current ml-1" />
                                </Button>
                              </motion.div>
                            </div>
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                              {formatDuration(film.duration)}
                            </div>
                          </div>
                          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {film.is_featured && (
                              <Badge className="bg-primary text-primary-foreground shadow-glow">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Destacado
                              </Badge>
                            )}
                          </div>
                        </div>
                    
                        <CardContent className="p-6 bg-gradient-to-b from-card/80 to-card">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                                {film.title}
                              </h3>
                              
                              {film.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                  {film.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-cinema flex items-center justify-center shadow-glow">
                                <span className="text-xs font-bold text-white">
                                  {film.creator_name?.charAt(0) || "U"}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">{film.creator_name || "Usuario"}</span>
                                <span className="text-xs text-muted-foreground">Creador</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-border/30">
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                  <Eye className="h-4 w-4" />
                                  <span className="font-medium">{film.views_count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                                  <Heart className="h-4 w-4" />
                                  <span className="font-medium">{film.likes_count.toLocaleString()}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {getFilmSource(film) && (
                                  <motion.a
                                    href={getFilmSource(film)}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </motion.a>
                                )}
                                {isSampleFilm(film) && (
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                    <Info className="h-3 w-3 mr-1" /> Ejemplo
                                  </Badge>
                                )}
                                {film.category && (
                                  <Badge className={`text-xs border-0 ${getCategoryColor(film.category)}`}>
                                    {film.category.charAt(0).toUpperCase() + film.category.slice(1).replace('-', ' ')}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Modal for short film details (sample + backend) */}
          <ShortFilmDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} film={selectedFilm} />

          {/* Featured Tab */}
          <TabsContent value="featured" className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Cortometrajes Destacados</h2>
            </div>
            
            {featuredFilms.length === 0 ? (
              <Card className="p-8 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay cortometrajes destacados</h3>
                <p className="text-muted-foreground">Los cortometrajes destacados aparecerán aquí</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredFilms.map((film, index) => (
                  <Card key={film.id} className="group overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-yellow-500 text-white font-bold">
                          #{index + 1}
                        </Badge>
                      </div>
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
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {film.creator_name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{film.creator_name || "Usuario"}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{film.views_count.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{film.likes_count.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getFilmSource(film) && (
                            <a
                              href={getFilmSource(film)}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="Abrir enlace"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold">Tendencia</h2>
            </div>
            
            {trendingFilms.length === 0 ? (
              <Card className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay tendencias recientes</h3>
                <p className="text-muted-foreground">Los cortometrajes en tendencia aparecerán aquí</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingFilms.map((film, index) => (
                  <Card key={film.id} className="group overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-green-500 text-white font-bold">
                          #{index + 1}
                        </Badge>
                      </div>
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
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {film.creator_name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{film.creator_name || "Usuario"}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{film.views_count.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{film.likes_count.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getFilmSource(film) && (
                            <a
                              href={getFilmSource(film)}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="Abrir enlace"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Cortometrajes;
