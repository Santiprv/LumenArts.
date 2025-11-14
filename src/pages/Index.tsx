import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutoSlider from "@/components/AutoSlider";
import ShortFilmCard from "@/components/ShortFilmCard";
import EventCard from "@/components/EventCard";
import EventDetailModal from "@/components/EventDetailModal";
import { activeEvents, upcomingEvents } from "@/data/eventsData";
import TipsSlider from "@/components/TipsSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Star, Newspaper, Calendar, Award, Sparkles } from "@/lib/icon-imports";

// Mock data - será reemplazado con datos reales de la BD
// Movido fuera del componente para evitar recreación en cada render
const FEATURED_FILMS = [
  {
    title: "La Última Llamada",
    thumbnail: "/assets/optimized/U_k43e7da_1200x0__1_jpg-800.webp",
    creator: "María Rodríguez",
    views: 12500,
    likes: 892,
    duration: "8:45"
  },
  {
    title: "Ecos del Silencio",
    thumbnail: "/assets/optimized/fotografia-rastro-estrellas_149301-11800_jpg-800.webp",
    creator: "Carlos Méndez",
    views: 8300,
    likes: 654,
    duration: "12:30"
  },
  {
    title: "Reflejos",
    thumbnail: "/assets/optimized/12_jpg-800.webp",
    creator: "Ana Martínez",
    views: 15200,
    likes: 1203,
    duration: "6:15"
  },
  {
    title: "Entre Sombras",
    thumbnail: "/assets/optimized/1326281712335_jpg-800.webp",
    creator: "Diego Fernández",
    views: 9800,
    likes: 743,
    duration: "10:00"
  },
  {
    title: "Caminos Cruzados",
    thumbnail: "/assets/optimized/photo-1524985069026-dd778a71c7b4-800.webp",
    creator: "Laura Gómez",
    views: 11400,
    likes: 892,
    duration: "7:20"
  },
  {
    title: "El Último Acto",
    thumbnail: "/assets/optimized/photo-1594908900066-3f47337549d8-800.webp",
    creator: "Pablo Ruiz",
    views: 13600,
    likes: 1045,
    duration: "9:30"
  }
];

// Use the canonical events from data so home and /eventos stay in sync
const EVENTS = activeEvents.slice(0, 2);


const Index = React.memo(() => {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <AutoSlider slides={FEATURED_FILMS.slice(0,4)} />
      </div>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">

        {/* Sección: Eventos Destacados */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Eventos Destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.map((event, idx) => (
              <EventCard key={idx} {...event} onEventClick={() => handleEventClick(event)} />
            ))}
          </div>
        </section>


        {/* Sección: Comunidad */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Comunidad</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h4 className="text-lg font-semibold mb-2">Únete a la comunidad</h4>
              <p className="text-muted-foreground mb-4">Conecta con otros creadores, comparte ideas y participa en foros y grupos temáticos.</p>
              <a href="/comunidad" className="inline-block px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition">Ir a Comunidad</a>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h4 className="text-lg font-semibold mb-2">Testimonios</h4>
              <blockquote className="italic text-muted-foreground mb-2">“LumenArts me ayudó a lanzar mi primer corto y conocer grandes amigos.”</blockquote>
              <blockquote className="italic text-muted-foreground">“La comunidad es súper activa y siempre hay retos nuevos.”</blockquote>
            </div>
          </div>
        </section>


        {/* Sección: Noticias */}
        <section className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4"
              >
                <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Últimas Noticias
                </h3>
              </motion.div>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Mantente al día con las últimas novedades del mundo cinematográfico
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Noticia Principal */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-4 sm:p-6 lg:p-8 border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    🔥 DESTACADO
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    25 Oct 2024
                  </span>
                </div>
                
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                  Festival de Cortos 2025
                </h4>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  🎬 <strong className="text-primary">Convocatoria abierta</strong> para el Festival Internacional de Cortometrajes 2025. 
                  Inscríbete antes del <strong className="text-primary">30 de noviembre</strong> y participa por premios exclusivos de hasta 
                  <strong className="text-primary"> $50,000</strong>.
                </p>
                
                <div className="flex items-center justify-between">
                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors">
                    Inscribirse Ahora
                  </button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>+2.5K interesados</span>
                  </div>
                </div>
              </motion.div>

              {/* Noticias Secundarias */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                          NUEVO
                        </span>
                        <span className="text-xs text-muted-foreground">22 Oct 2024</span>
                      </div>
                      <h5 className="font-bold text-foreground mb-2">
                        Foro de Animación Lanzado
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        🎨 Comparte técnicas y aprende de otros animadores en nuestra nueva sección especializada.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded">
                          ACTUALIZACIÓN
                        </span>
                        <span className="text-xs text-muted-foreground">20 Oct 2024</span>
                      </div>
                      <h5 className="font-bold text-foreground mb-2">
                        Nuevas Herramientas de Edición
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        ⚡ Editor mejorado con efectos cinematográficos y transiciones profesionales.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                          TRENDING
                        </span>
                        <span className="text-xs text-muted-foreground">18 Oct 2024</span>
                      </div>
                      <h5 className="font-bold text-foreground mb-2">
                        Récord de Participación
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        🚀 +10,000 creadores se unieron este mes. ¡La comunidad sigue creciendo!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-secondary text-white font-bold rounded-xl shadow-cinema hover:shadow-glow transition-all duration-300"
              >
                Ver Todas las Noticias
              </motion.button>
            </motion.div>
          </motion.div>
        </section>


        {/* Sección: Tips para creadores */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Tips para Creadores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TipsSlider />
            <div className="bg-card rounded-xl p-6 shadow-card flex items-center justify-center">
              <div className="text-center">
                <h4 className="font-semibold mb-2">¿Tienes un tip para compartir?</h4>
                <p className="text-muted-foreground mb-4">Ayuda a otros creadores compartiendo tu experiencia</p>
                <a href="/comunidad/tips" className="inline-block px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition">
                  Compartir Tip
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer visual */}
        <footer className="mt-16 py-8 border-t border-border text-center text-muted-foreground text-sm">
          <div className="mb-2">LumenArts &copy; 2025 — Plataforma de cortometrajes</div>
          <div className="flex justify-center gap-4">
            <a href="/cortometrajes" className="hover:underline">Cortometrajes</a>
            <a href="/eventos" className="hover:underline">Eventos</a>
            <a href="/comunidad" className="hover:underline">Comunidad</a>
          </div>
        </footer>
      </div>
      <EventDetailModal isOpen={isModalOpen} onClose={handleCloseModal} event={selectedEvent} />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
