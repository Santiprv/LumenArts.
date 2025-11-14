import React, { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import EventDetailModal from "@/components/EventDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy } from "lucide-react";
import { activeEvents, upcomingEvents } from "@/data/eventsData";

const Eventos = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Eventos y Retos
          </h1>
          <p className="text-muted-foreground text-lg">
            Participa en retos creativos, compite y gana premios increíbles
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-secondary mb-8">
            <TabsTrigger value="active" className="gap-2">
              <Calendar className="h-4 w-4" />
              Eventos Activos
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="gap-2">
              <Trophy className="h-4 w-4" />
              Próximamente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  {...event} 
                  onEventClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  {...event} 
                  onEventClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <EventDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default Eventos;
