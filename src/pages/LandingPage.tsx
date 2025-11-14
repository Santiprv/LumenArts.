import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Film, Users, UploadCloud, Star, Trophy, Sparkles, Play, Award, TrendingUp, Heart, Eye, MessageCircle, Calendar } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import CustomCursor from "@/components/CustomCursor";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import VideoBackground from "@/components/VideoBackground";
import ShortFilmModal from "@/components/ShortFilmModal";
import CinematicElements from "@/components/CinematicElements";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <UploadCloud className="h-12 w-12" />,
      title: "Sube tus Cortometrajes",
      description: "Comparte tu arte con el mundo. Sube, organiza y presenta tus obras maestras.",
      color: "from-red-500 to-red-700"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Comunidad Activa",
      description: "Conecta con cineastas de todo el mundo. Colabora, aprende y crece juntos.",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Eventos y Competencias",
      description: "Participa en festivales, retos mensuales y gana reconocimiento internacional.",
      color: "from-red-600 to-red-800"
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: "Rankings y Premios",
      description: "Destaca en los rankings. Recibe premios y reconocimiento por tu talento.",
      color: "from-gray-600 to-gray-800"
    }
  ];

  const stats = [
    { value: 100, suffix: "%", label: "Gratis para Empezar", icon: <Sparkles className="h-6 w-6" /> },
    { value: 24, suffix: "/7", label: "Soporte Disponible", icon: <Users className="h-6 w-6" /> },
    { value: 4, suffix: "K", label: "Calidad de Video", icon: <Film className="h-6 w-6" /> },
    { value: 0, suffix: "", label: "Límite de Subidas", icon: <UploadCloud className="h-6 w-6" /> }
  ];

  const shortFilms = [
    {
      id: 1,
      title: "El Último Suspiro",
      director: "María González",
      duration: "8:45",
      year: "2024",
      genre: "Drama",
      description: "Una conmovedora historia sobre la despedida de un padre y su hija en los últimos momentos de vida. A través de flashbacks, exploramos los recuerdos compartidos y las palabras no dichas que finalmente encuentran su voz.",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
      views: 1234,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      title: "Sombras Urbanas",
      director: "Carlos Ruiz",
      duration: "12:30",
      year: "2024",
      genre: "Thriller",
      description: "En las calles nocturnas de la ciudad, un detective persigue a un misterioso asesino que deja pistas en forma de arte callejero. Una carrera contra el tiempo donde la realidad y la ficción se entrelazan.",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
      views: 2468,
      likes: 178,
      comments: 46
    },
    {
      id: 3,
      title: "Ecos del Silencio",
      director: "Ana Martínez",
      duration: "10:15",
      year: "2024",
      genre: "Ciencia Ficción",
      description: "En un futuro donde el sonido ha desaparecido del mundo, una joven científica descubre una forma de recuperarlo. Pero al hacerlo, desata consecuencias que cambiarán la humanidad para siempre.",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
      views: 3702,
      likes: 267,
      comments: 69
    }
  ];

  const handleFilmClick = (film: any) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden cursor-none">
      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section con Parallax */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Video Background */}
        <VideoBackground videoId="JVk3vqDq0BE" opacity={0.65} />

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ParticlesBackground />
          <div className="bg-blob blob-1" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
          <div className="bg-blob blob-2" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="bg-blob blob-3" style={{ transform: `translateY(${scrollY * 0.4}px)` }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,62,62,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,62,62,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Logo animado */}
          <div className="mb-8 animate-fade-in-scale">
            <div className="inline-block relative">
              <Film className="h-24 w-24 text-primary mx-auto animate-float-cinema drop-shadow-[0_0_30px_rgba(229,62,62,0.6)]" />
              <div className="absolute inset-0 animate-spotlight">
                <Film className="h-24 w-24 text-primary/30 blur-xl" />
              </div>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Lumen
            </span>
            <span className="bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent animate-gradient-shift">
              Arts
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 mb-4 animate-fade-in max-w-3xl mx-auto" style={{ animationDelay: "0.2s" }}>
            La Plataforma del <span className="text-primary font-bold">Cine Independiente</span>
          </p>

          <p className="text-lg md:text-xl text-gray-400 mb-12 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
            Donde los creadores se convierten en leyendas
          </p>

          {/* Hero Carousel */}
          <div className="mb-12 animate-fade-in w-full max-w-6xl" style={{ animationDelay: "0.6s" }}>
            <HeroCarousel />
          </div>

          {/* Features Highlights */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all hover-lift">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-white font-medium">100% Gratis</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all hover-lift">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-white font-medium">Calidad 4K</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-all hover-lift">
              <UploadCloud className="h-6 w-6 text-primary" />
              <span className="text-white font-medium">Subidas Ilimitadas</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-20 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-card hover-lift animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <CinematicElements />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-red-400 to-primary bg-clip-text text-transparent">
                Todo lo que Necesitas
              </span>
            </h2>
            <p className="text-xl text-gray-400 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Una plataforma completa para cineastas independientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-gradient-card border border-primary/20 hover:border-primary/50 transition-all duration-500 hover-lift animate-fade-in ${
                  activeFeature === index ? "shadow-cinema scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="text-primary mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section - Cortometrajes Destacados */}
      <section id="showcase" className="relative py-32 bg-gradient-to-b from-background to-card/30 overflow-hidden">
        <CinematicElements />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Cortometrajes </span>
              <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Descubre las obras maestras de nuestra comunidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {shortFilms.map((film, index) => (
              <div
                key={film.id}
                className="group relative rounded-2xl overflow-hidden bg-card hover-lift animate-fade-in-scale shadow-card cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFilmClick(film)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-gray-800 overflow-hidden">
                  <img 
                    src={film.thumbnail} 
                    alt={film.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow animate-pulse">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 rounded-full text-sm text-white">
                    {film.duration}
                  </div>

                  {/* Genre Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 rounded-full text-xs text-white font-medium">
                    {film.genre}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {film.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Por {film.director}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{film.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>{film.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{film.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-gradient-shift" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Únete a la </span>
                <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                  Comunidad
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Conecta con cineastas independientes de todo el mundo. Crea, comparte y crece en una comunidad apasionada por el cine.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Users className="h-6 w-6" />, text: "Conecta con creadores de todo el mundo" },
                  { icon: <MessageCircle className="h-6 w-6" />, text: "Recibe feedback constructivo y profesional" },
                  { icon: <TrendingUp className="h-6 w-6" />, text: "Crece tu audiencia y reconocimiento" },
                  { icon: <Award className="h-6 w-6" />, text: "Participa en eventos exclusivos" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors hover-lift"
                  >
                    <div className="text-primary">
                      {item.icon}
                    </div>
                    <span className="text-gray-300 text-lg">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-slide-in-right">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-cinema">
                {/* Imagen de comunidad cinematográfica */}
                <img 
                  src="https://www.businessempresarial.com.pe/wp-content/uploads/2024/05/version-2018-8.jpg" 
                  alt="Comunidad de cineastas"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-gray-900/70" />
                
                {/* Floating Cards - Sin referencias a usuarios */}
                <div className="absolute top-10 right-10 p-4 bg-card/90 backdrop-blur-sm rounded-xl shadow-glow animate-float-cinema">
                  <div className="flex items-center gap-2">
                    <Film className="h-5 w-5 text-primary" />
                    <span className="text-white font-bold">Crea</span>
                  </div>
                  <p className="text-gray-400 text-sm">Tu contenido</p>
                </div>

                <div className="absolute bottom-10 left-10 p-4 bg-card/90 backdrop-blur-sm rounded-xl shadow-glow animate-float-cinema" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-white font-bold">Comparte</span>
                  </div>
                  <p className="text-gray-400 text-sm">Con el mundo</p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-card/90 backdrop-blur-sm rounded-xl shadow-glow animate-float-cinema" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-white font-bold">Crece</span>
                  </div>
                  <p className="text-gray-400 text-sm">Como artista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Competitions Section */}
      <section id="events" className="relative py-32 bg-gradient-to-b from-card/30 to-background overflow-hidden">
        <CinematicElements />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Eventos y </span>
              <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                Competencias
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Participa, compite y gana reconocimiento internacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Card 1 */}
            <div className="relative p-8 rounded-2xl bg-gradient-card border border-primary/30 hover:border-primary/60 hover-lift animate-fade-in overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Festival Mensual</h3>
                    <p className="text-gray-400">Próximo evento: 15 días</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  Compite con los mejores cineastas. Premios en efectivo y reconocimiento internacional.
                </p>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Inscripciones Abiertas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="relative p-8 rounded-2xl bg-gradient-card border border-primary/30 hover:border-primary/60 hover-lift animate-fade-in overflow-hidden group" style={{ animationDelay: "0.2s" }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Reto Creativo</h3>
                    <p className="text-gray-400">Tema: Ciencia Ficción</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  Desafía tu creatividad con temas únicos. Gana exposición y feedback de expertos.
                </p>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Participa Ahora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Lo que Dicen </span>
              <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                los Creadores
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Directora Independiente",
                text: "LumenArts cambió mi carrera. Pasé de ser desconocida a ganar mi primer festival internacional.",
                rating: 5
              },
              {
                name: "Carlos Ruiz",
                role: "Cinematógrafo",
                text: "La comunidad es increíble. He aprendido más aquí que en años de universidad.",
                rating: 5
              },
              {
                name: "Ana Martínez",
                role: "Productora",
                text: "Encontré colaboradores talentosos y proyectos que nunca imaginé. Una plataforma esencial.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-card border border-primary/20 hover:border-primary/40 hover-lift animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-gray-300 text-lg mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-red-700" />
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-blob blob-1" />
          <div className="bg-blob blob-2" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-card border border-primary/30 shadow-cinema animate-fade-in-scale">
            <div className="mb-8">
              <Film className="h-20 w-20 text-primary mx-auto mb-6 animate-float-cinema" />
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Comienza tu </span>
                <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                  Viaje Cinematográfico
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Sé parte de la nueva generación de cineastas independientes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-glow hover-lift group"
                onClick={() => window.open('https://lumenarts.vercel.app/', '_blank')}
              >
                <Play className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                Crear Cuenta Gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 border-primary/50 hover:border-primary hover:bg-primary/10 hover-lift"
                onClick={() => window.open('https://lumenarts.vercel.app/', '_blank')}
              >
                Explorar Plataforma
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 border-t border-primary/20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <div className="md:col-span-1">
              <button 
                className="flex items-center gap-2 mb-4 hover-scale transition-transform"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Film className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-white">LumenArts</span>
              </button>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                La plataforma definitiva para descubrir, compartir y disfrutar de cortometrajes de todo el mundo. Conectamos creadores con audiencias apasionadas por el cine independiente.
              </p>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li 
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Inicio
                </li>
                <li 
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Cortometrajes
                </li>
                <li 
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => window.open('https://lumenarts.vercel.app/', '_blank')}
                >
                  Artistas
                </li>
                <li 
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Eventos
                </li>
                <li 
                  className="hover:text-primary cursor-pointer transition-colors"
                  onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Comunidad
                </li>
              </ul>
            </div>

            {/* Soporte */}
            <div>
              <h4 className="text-white font-bold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">Centro de Ayuda</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Términos de Servicio</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Política de Privacidad</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Directrices de la Comunidad</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Reportar Problema</li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="mailto:contacto@lumenarts.com" className="hover:text-primary transition-colors">
                    contacto@lumenarts.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="tel:+584122085584" className="hover:text-primary transition-colors">
                    0412-2085584
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Los Dos Caminos, Caracas<br />Venezuela</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                LumenArts © 2025 — Plataforma de cortometrajes
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-primary/20 hover:border-primary/50 flex items-center justify-center cursor-pointer hover-lift transition-all"
                  aria-label="Twitter"
                >
                  <span className="text-gray-400 hover:text-primary text-sm font-bold">𝕏</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-primary/20 hover:border-primary/50 flex items-center justify-center cursor-pointer hover-lift transition-all"
                  aria-label="Instagram"
                >
                  <span className="text-gray-400 hover:text-primary text-sm font-bold">IG</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-primary/20 hover:border-primary/50 flex items-center justify-center cursor-pointer hover-lift transition-all"
                  aria-label="YouTube"
                >
                  <span className="text-gray-400 hover:text-primary text-sm font-bold">YT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Cortometraje */}
      {selectedFilm && (
        <ShortFilmModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFilm(null);
          }}
          film={selectedFilm}
        />
      )}
    </div>
  );
};

export default LandingPage;
