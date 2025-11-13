import React, { useState, useCallback, useMemo } from 'react';
import { ArtistProfile, Language, TranslationKey } from './types';
import { ARTIST_LIST, MOCK_ANALYTICS_DATA } from './constants';
import { translations } from './i18n';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import SocialLinks from './components/SocialLinks';
import MusicSection from './components/MusicSection';
import VideoSection from './components/VideoSection';
import EventSection from './components/EventSection';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import EditProfileModal from './components/EditProfileModal';
import Sidebar from './components/Sidebar';
import ArtistListPage from './components/ArtistListPage';

const App: React.FC = () => {
  const [artists, setArtists] = useState<ArtistProfile[]>(ARTIST_LIST);
  const [selectedProfile, setSelectedProfile] = useState<ArtistProfile | null>(null);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'analytics'>('profile');
  const [language, setLanguage] = useState<Language>('ko');

  const t = useCallback((key: TranslationKey) => {
    return translations[language][key] || key;
  }, [language]);

  const handleSave = (updatedProfile: ArtistProfile) => {
    // In a real app, this would be an API call. Here we update the local state.
    setArtists(prevArtists => prevArtists.map(artist => artist.name === updatedProfile.name ? updatedProfile : artist));
    setSelectedProfile(updatedProfile);
    setIsEditing(false);
  };
  
  const handleSelectArtist = (artist: ArtistProfile) => {
    setSelectedProfile(artist);
    setView('detail');
    setActiveTab('profile'); // Reset tab to profile when viewing a new artist
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
    setView('list');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(t('linkCopied'));
  };
    
  const handleDownloadEPK = () => {
    alert(t('epkDownloadStarted'));
  };
  
  const filteredArtists = useMemo(() =>
    artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [artists, searchQuery]);

  const upcomingEventDate = useMemo(() => {
      if (!selectedProfile || !selectedProfile.events || selectedProfile.events.length === 0) {
          return undefined;
      }
      // Sort events by date to find the earliest one
      const sortedEvents = [...selectedProfile.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const firstEventDate = new Date(sortedEvents[0].date);
      const year = firstEventDate.getFullYear();
      const month = (firstEventDate.getMonth() + 1).toString().padStart(2, '0');
      return `${year}/${month}`;
  }, [selectedProfile]);


  if (view === 'list') {
    return (
      <ArtistListPage
        artists={filteredArtists}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSelectArtist={handleSelectArtist}
        t={t}
      />
    );
  }

  if (view === 'detail' && selectedProfile) {
    return (
      <div className="flex min-h-screen bg-gray-100 font-sans">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEdit={() => setIsEditing(true)}
          onShare={handleShare}
          onDownloadEPK={handleDownloadEPK}
          onBackToList={handleBackToList}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
        
        <div className="flex-1 lg:pl-64">
          <Header profile={selectedProfile} t={t} onBackToList={handleBackToList} />
          
          <main className="p-4 md:p-8">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <ProfileSection title={t('about')}>
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-600">{selectedProfile.bio}</p>
                  </ProfileSection>

                  <MusicSection music={selectedProfile.music} t={t} />
                  
                  <VideoSection videos={selectedProfile.videos} t={t} />

                </div>

                <div className="lg:col-span-1 space-y-8">
                   <ProfileSection title={t('upcomingShows')} meta={upcomingEventDate}>
                    <EventSection events={selectedProfile.events} t={t} />
                  </ProfileSection>
                  
                  <ProfileSection title={t('social')}>
                    <SocialLinks socials={selectedProfile.socials} t={t} />
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-500">{t('bookingContact')}</h4>
                      <a href={`mailto:${selectedProfile.contactEmail}`} className="text-indigo-600 hover:text-indigo-500 transition-colors">{selectedProfile.contactEmail}</a>
                    </div>
                  </ProfileSection>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
                <AnalyticsDashboard data={MOCK_ANALYTICS_DATA} t={t} />
            )}
          </main>
        </div>

        {isEditing && (
          <EditProfileModal
            profile={selectedProfile}
            onSave={handleSave}
            onClose={() => setIsEditing(false)}
            t={t}
          />
        )}
      </div>
    );
  }

  return null; // Should not happen
};

export default App;