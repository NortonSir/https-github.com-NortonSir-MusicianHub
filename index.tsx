import { ArtistProfile, Language, TranslationKey } from './types';
import { ARTIST_LIST, MOCK_ANALYTICS_DATA } from './constants';
import { translations } from './i18n';
import { renderArtistListPage, attachArtistListListeners } from './view/ArtistListPage';
import { renderArtistDetailPage, attachArtistDetailListeners } from './view/ArtistDetailPage';

interface AppState {
  artists: ArtistProfile[];
  selectedProfile: ArtistProfile | null;
  view: 'list' | 'detail';
  searchQuery: string;
  isEditing: boolean;
  activeTab: 'profile' | 'analytics';
  language: Language;
}

// 1. 상태 관리
const state: AppState = {
  artists: ARTIST_LIST,
  selectedProfile: null,
  view: 'list',
  searchQuery: '',
  isEditing: false,
  activeTab: 'profile',
  language: 'ko',
};

function setState(newState: Partial<AppState>) {
  Object.assign(state, newState);
  renderApp();
}

// 2. 번역 헬퍼
function t(key: TranslationKey): string {
  return translations[state.language][key] || key;
}

// 3. 이벤트 핸들러
const handlers = {
  handleSelectArtist: (artistName: string) => {
    const artist = state.artists.find(a => a.name === artistName);
    if (artist) {
      setState({ selectedProfile: artist, view: 'detail', activeTab: 'profile' });
    }
  },
  handleBackToList: () => {
    setState({ selectedProfile: null, view: 'list', searchQuery: '' });
  },
  handleSearchChange: (query: string) => {
    // Re-rendering on every keystroke can be inefficient.
    // In a real app, you might debounce this.
    state.searchQuery = query; // Update state without re-rendering immediately
    renderApp(); // Manually trigger re-render
  },
  handleSaveProfile: (updatedProfile: ArtistProfile) => {
    const newArtists = state.artists.map(artist =>
      artist.name === updatedProfile.name ? updatedProfile : artist
    );
    setState({
      artists: newArtists,
      selectedProfile: updatedProfile,
      isEditing: false,
    });
  },
  handleShare: () => {
    navigator.clipboard.writeText(window.location.href);
    alert(t('linkCopied'));
  },
  handleDownloadEPK: () => {
    alert(t('epkDownloadStarted'));
  },
  setActiveTab: (tab: 'profile' | 'analytics') => {
    setState({ activeTab: tab });
  },
  setIsEditing: (isEditing: boolean) => {
    setState({ isEditing });
  },
  setLanguage: (lang: Language) => {
    setState({ language: lang });
    document.documentElement.lang = lang;
  },
};

// 4. 렌더링 로직
function renderApp() {
  const appContainer = document.getElementById('app-container');
  if (!appContainer) return;

  if (state.view === 'list') {
    const filteredArtists = state.artists.filter(artist =>
      artist.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    appContainer.innerHTML = renderArtistListPage(filteredArtists, state.searchQuery, t);
    attachArtistListListeners(handlers.handleSelectArtist, handlers.handleSearchChange);
  } else if (state.view === 'detail' && state.selectedProfile) {
    appContainer.innerHTML = renderArtistDetailPage({
      profile: state.selectedProfile,
      activeTab: state.activeTab,
      isEditing: state.isEditing,
      language: state.language,
      analyticsData: MOCK_ANALYTICS_DATA,
      t: t,
    });
    attachArtistDetailListeners({
        ...handlers,
        onEdit: () => handlers.setIsEditing(true),
        onCloseModal: () => handlers.setIsEditing(false),
    });
  }
}

// 5. 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = state.language;
  renderApp();
});
