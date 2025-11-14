import { useState } from "react";

interface Artist {
  id?: string;
  name: string;
  avatar: string;
  films: number;
  followers: number;
  specialty: string;
  bio?: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  shortfilms?: any[];
}

export const useArtistModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const openModal = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedArtist(null);
  };

  return {
    isOpen,
    selectedArtist,
    openModal,
    closeModal
  };
};