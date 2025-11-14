import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
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
  onEventClick: () => void;
}

const EventCard = ({ 
  title, 
  description, 
  image, 
  startDate, 
  participants, 
  prize,
  category,
  onEventClick
}: EventCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    onEventClick();
  };

  return (
    <Card className="overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-secondary">
        {!imageError ? (
          <img 
            src={image} 
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
            <Trophy className="h-12 w-12 text-primary/50" />
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-secondary animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
        {prize && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-black">
            <Trophy className="h-4 w-4" />
            {prize}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{participants} participantes</span>
          </div>
        </div>
        
        <Button 
          onClick={handleClick}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Ver Detalles del Evento
        </Button>
      </div>
    </Card>
  );
};

export default EventCard;
