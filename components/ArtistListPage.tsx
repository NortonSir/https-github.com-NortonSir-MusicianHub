import React from 'react';
import { ArtistProfile, TranslationKey } from '../types';
import ArtistCard from './ArtistCard';

interface ArtistListPageProps {
  artists: ArtistProfile[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectArtist: (artist: ArtistProfile) => void;
  t: (key: TranslationKey) => string;
}

const ArtistListPage: React.FC<ArtistListPageProps> = ({ artists, searchQuery, onSearchChange, onSelectArtist, t }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">MusicianHub</h1>
        <p className="text-lg text-gray-600 mb-8">{t('discoverArtists')}</p>
        <div className="mb-8">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {artists.map(artist => (
            <ArtistCard key={artist.name} artist={artist} onSelect={onSelectArtist} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtistListPage;