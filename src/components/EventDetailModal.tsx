import React, { useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Clock, MapPin, MessageCircle, ExternalLink } from "@/lib/icon-imports";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    description: string;
    image: string;
    startDate: string;
    endDate?: string;
    participants: number;
    prize?: string;
    category: string;
    location?: string;
    duration?: string;
    requirements?: string[];
    rules?: string[];
    whatsappNumber?: string;
  } | null;
}

const EventDetailModal = React.memo(({ isOpen, onClose, event }: EventDetailModalProps) => {
  const handleWhatsAppClick = useCallback(() => {
    if (!event) return;
    
    const phoneNumber = event.whatsappNumber || "584122085584"; // Número de WhatsApp: 04122085584
    const message = `¡Hola! Me interesa participar en el evento "${event.title}" de LumenArts. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [event]);

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Imagen del evento */}
          <div className="relative h-48 overflow-hidden rounded-lg bg-secondary">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 backdrop-blur-sm">
                {event.category}
              </Badge>
            </div>
            {event.prize && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-black">
                <Trophy className="h-4 w-4" />
                {event.prize}
              </div>
            )}
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {event.startDate} {event.endDate && `- ${event.endDate}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">{event.participants} participantes</span>
            </div>
            {event.duration && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{event.duration}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{event.location}</span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Descripción</h4>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Requisitos */}
          {event.requirements && event.requirements.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Requisitos</h4>
              <ul className="space-y-1">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reglas */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Reglas del Evento</h4>
              <ul className="space-y-1">
                {event.rules.map((rule, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button 
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Unirse a través de WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

EventDetailModal.displayName = 'EventDetailModal';

export default EventDetailModal;
