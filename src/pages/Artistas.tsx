import Navbar from "@/components/Navbar";
import ArtistModal from "@/components/ArtistModal";
import { useArtistModal } from "@/hooks/useArtistModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Users } from "lucide-react";

const Artistas = () => {
  const artists = [
    {
      name: "María Rodríguez",
      avatar: "/assets/optimized/all-the-one-piece-icons-ive-made-to-date-v0-5z849rri9kfc1_jpg-800.webp",
      films: 12,
      followers: 3420,
      specialty: "Drama"
    },
    {
      name: "Carlos Méndez",
      avatar: "/assets/optimized/NGS6RP5CZJBIJGJ33PKHCSVIHA_jpg-800.webp",
      films: 8,
      followers: 2150,
      specialty: "Thriller"
    },
    {
      name: "Ana Martínez",
      avatar: "/assets/optimized/images-800.webp",
      films: 15,
      followers: 5680,
      specialty: "Animación"
    },
    {
      name: "Diego Fernández",
      avatar: "/assets/optimized/b5d3ba35d5addbe4cd0671f258d49c96_jpg-800.webp",
      films: 10,
      followers: 4230,
      specialty: "Ciencia Ficción"
    },
    {
      name: "Laura Gómez",
      avatar: "data:image/jpeg;base64,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",
      films: 18,
      followers: 6540,
      specialty: "Comedia"
    },
    {
      name: "Sofía Navarro",
      avatar: "/assets/optimized/5e38a989f2045502449dbf81877cddcc_jpg-800.webp",
      films: 6,
      followers: 1280,
      specialty: "Documental"
    },
    {
      name: "Miguel Torres",
      avatar: "/assets/optimized/89edaaa2e05502ebebf7a37555c3e1c77ba773c9_jpg-800.webp",
      films: 9,
      followers: 2040,
      specialty: "Experimental"
    },
    {
      name: "Isabella Cruz",
      avatar: "/assets/optimized/89edaaa2e05502ebebf7a37555c3e1c77ba773c9_jpg-800.webp",
      films: 4,
      followers: 860,
      specialty: "Animación"
    },
    {
      name: "Pablo Ruiz",
      avatar: "/assets/optimized/17b1d0768b1029b94aed982bb9577aab3aedffa2_pnj-800.webp",
      films: 14,
      followers: 4890,
      specialty: "Terror"
    }
  ];



  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Artistas de LumenArts
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubre creadores talentosos y sus increíbles cortometrajes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {artist.name}
                    </h3>
                    <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                      {artist.specialty}
                    </Badge>
                    
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Film className="h-4 w-4" />
                        <span>{artist.films} films</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{artist.followers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistas;
