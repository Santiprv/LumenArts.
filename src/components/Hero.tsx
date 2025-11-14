import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "@/lib/icon-imports";
import { useAuth } from "@/contexts/AuthContext";

const Hero = React.memo(() => {
  const { user, profile, loading } = useAuth();

  // Mensaje personalizado si hay sesión activa - memoizado para evitar re-renders
  const welcomeMessage = useMemo(() => {
    // Si está cargando por más de 3 segundos, mostrar mensaje genérico
    if (loading) {
      return {
        title: "Descubre y comparte",
        subtitle: "cortometrajes únicos",
        description: "Únete a una comunidad de creadores apasionados. Explora, comparte y participa en retos cinematográficos."
      };
    }
    
    if (user && profile?.full_name) {
      return {
        title: `👋 ¡Hola, ${profile.full_name}!`,
        subtitle: "Bienvenido de nuevo a LumenArts 🎥",
        description: "Continúa explorando, creando y compartiendo cortometrajes únicos con nuestra comunidad."
      };
    }
    
    // Mensaje genérico para usuarios no autenticados
    return {
      title: "Descubre y comparte",
      subtitle: "cortometrajes únicos",
      description: "Únete a una comunidad de creadores apasionados. Explora, comparte y participa en retos cinematográficos."
    };
  }, [loading, user, profile?.full_name]);

  return (
    <section className="min-h-[600px] flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="h-6 w-6 text-primary mx-auto mb-4" />
            <span className="text-sm font-medium text-muted-foreground">
              {user ? "Tu plataforma personalizada" : "Plataforma de cortometrajes"}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-foreground">{welcomeMessage.title}</span>
            <span className="block text-primary">
              {welcomeMessage.subtitle}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            {welcomeMessage.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Explorar Cortometrajes
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:border-primary hover:bg-card text-lg px-8 py-4 font-medium">
              Ver Eventos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
