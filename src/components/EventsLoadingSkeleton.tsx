import React from "react";
import { Card } from "@/components/ui/card";

const EventCardSkeleton = React.memo(() => (
  <Card className="overflow-hidden border-border bg-card">
    <div className="relative h-48 overflow-hidden bg-secondary">
      <div className="w-full h-full bg-muted animate-pulse rounded-md" />
    </div>
    
    <div className="p-6">
      <div className="h-6 w-3/4 mb-2 bg-muted animate-pulse rounded-md" />
      <div className="h-4 w-full mb-1 bg-muted animate-pulse rounded-md" />
      <div className="h-4 w-2/3 mb-4 bg-muted animate-pulse rounded-md" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="h-4 w-20 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
      </div>
      
      <div className="h-10 w-full bg-muted animate-pulse rounded-md" />
    </div>
  </Card>
));

EventCardSkeleton.displayName = 'EventCardSkeleton';

const EventsLoadingSkeleton = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <EventCardSkeleton key={index} />
    ))}
  </div>
));

EventsLoadingSkeleton.displayName = 'EventsLoadingSkeleton';

export default EventsLoadingSkeleton;
