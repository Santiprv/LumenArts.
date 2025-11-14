import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Eye, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShortFilmCardProps {
  title: string;
  thumbnail: string;
  creator: string;
  creatorAvatar?: string;
  views: number;
  likes: number;
  duration: string;
}

const ShortFilmCard = ({ 
  title, 
  thumbnail, 
  creator, 
  creatorAvatar, 
  views, 
  likes,
  duration 
}: ShortFilmCardProps) => {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="icon" 
              className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow"
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-medium">
            {duration}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6 border border-border">
            <AvatarImage src={creatorAvatar} />
            <AvatarFallback className="text-xs bg-primary/20">
              {creator.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{creator}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ShortFilmCard;
