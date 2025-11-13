import React from 'react';
import { ArtistProfile } from '../types';

interface ArtistCardProps {
  artist: ArtistProfile;
  onSelect: (artist: ArtistProfile) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onSelect }) => {
  return (
    <div onClick={() => onSelect(artist)} className="cursor-pointer group text-center">
        <div className="aspect-square rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-indigo-300">
            <img src={artist.profilePicture} alt={artist.name} className="w-full h-full object-cover"/>
        </div>
        <h3 className="mt-2 font-semibold text-gray-800 truncate group-hover:text-indigo-500">{artist.name}</h3>
            <p className="text-sm text-gray-500 truncate">{artist.genre}</p>
    </div>
  );
};

export default ArtistCard;