import { ArtistProfile, TranslationKey } from '../types';

function renderArtistCard(artist: ArtistProfile): string {
  return `
    <div data-artist-name="${artist.name}" class="cursor-pointer group text-center artist-card">
        <div class="aspect-square rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-indigo-300">
            <img src="${artist.profilePicture}" alt="${artist.name}" class="w-full h-full object-cover"/>
        </div>
        <h3 class="mt-2 font-semibold text-gray-800 truncate group-hover:text-indigo-500">${artist.name}</h3>
        <p class="text-sm text-gray-500 truncate">${artist.genre}</p>
    </div>
  `;
}

export function renderArtistListPage(
  artists: ArtistProfile[],
  searchQuery: string,
  t: (key: TranslationKey) => string
): string {
  return `
    <div class="min-h-screen bg-gray-100 font-sans">
      <main class="container mx-auto p-4 md:p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">MusicianHub</h1>
        <p class="text-lg text-gray-600 mb-8">${t('discoverArtists')}</p>
        <div class="mb-8">
          <input
            type="text"
            id="search-input"
            placeholder="${t('searchPlaceholder')}"
            value="${searchQuery}"
            class="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="${t('searchPlaceholder')}"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
          ${artists.map(artist => `<div role="listitem">${renderArtistCard(artist)}</div>`).join('')}
        </div>
      </main>
    </div>
  `;
}

export function attachArtistListListeners(
  onSelectArtist: (artistName: string) => void,
  onSearchChange: (query: string) => void
) {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      onSearchChange((e.target as HTMLInputElement).value);
    });
  }

  const artistCards = document.querySelectorAll('.artist-card');
  artistCards.forEach(card => {
    card.addEventListener('click', () => {
      const artistName = card.getAttribute('data-artist-name');
      if (artistName) {
        onSelectArtist(artistName);
      }
    });
  });
}
