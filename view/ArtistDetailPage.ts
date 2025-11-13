import { ArtistProfile, SocialLinks, MusicRelease, Video, Event, AnalyticsData, Language, TranslationKey } from '../types';
import { renderProfileSection, ICONS } from './common';

// Types for props and handlers to improve readability
type DetailPageProps = {
  profile: ArtistProfile;
  activeTab: 'profile' | 'analytics';
  isEditing: boolean;
  language: Language;
  analyticsData: AnalyticsData;
  t: (key: TranslationKey) => string;
  isGeneratingImage: boolean;
  isImageLoading: boolean;
  generatedImageUrl: string;
};

type DetailPageHandlers = {
  handleBackToList: () => void;
  setActiveTab: (tab: 'profile' | 'analytics') => void;
  onEdit: () => void;
  onCloseModal: () => void;
  handleSaveProfile: (profile: ArtistProfile) => void;
  handleShare: () => void;
  handleDownloadEPK: () => void;
  setLanguage: (lang: Language) => void;
  profile: ArtistProfile;
  handleOpenImageGenerator: () => void;
  handleCloseImageGenerator: () => void;
  handleGenerateImage: (prompt: string, style: string) => void;
  handleUseGeneratedImage: () => void;
};


// --- SECTION RENDERERS ---

function renderSidebar(activeTab: 'profile' | 'analytics', language: Language, t: (key: TranslationKey) => string): string {
  const navItem = (id: string, icon: string, label: string, isActive: boolean) => `
    <button id="${id}" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}">
      ${icon}<span>${label}</span>
    </button>`;
  const actionButton = (id: string, icon: string, label: string) => `
    <button id="${id}" class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm">
      ${icon}<span>${label}</span>
    </button>`;

  return `
    <aside class="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div class="flex items-center space-x-2 mb-6">
        <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
        <h1 class="text-xl font-bold text-gray-800">MusicianHub</h1>
      </div>
      <nav class="flex-grow">
        <div class="mb-4">${actionButton('btn-back', ICONS.backArrow, t('backToList'))}</div>
        <div class="space-y-2">
          <h2 class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</h2>
          ${navItem('btn-tab-profile', ICONS.profile, t('profile'), activeTab === 'profile')}
          ${navItem('btn-tab-analytics', ICONS.analytics, t('analytics'), activeTab === 'analytics')}
          <div class="pt-4">
            <h2 class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</h2>
            ${actionButton('btn-edit', ICONS.edit, t('editProfile'))}
            ${actionButton('btn-share', ICONS.share, t('shareProfile'))}
            ${actionButton('btn-download', ICONS.download, t('downloadEPK'))}
          </div>
        </div>
      </nav>
      <div class="mt-auto">
        <div class="flex items-center justify-center p-2 bg-gray-100 rounded-lg">
          <button id="btn-lang-ko" class="px-4 py-1 text-sm rounded-md transition-colors ${language === 'ko' ? 'bg-white shadow' : 'text-gray-500'}">KO</button>
          <button id="btn-lang-en" class="px-4 py-1 text-sm rounded-md transition-colors ${language === 'en' ? 'bg-white shadow' : 'text-gray-500'}">EN</button>
        </div>
      </div>
    </aside>`;
}

function renderHeader(profile: ArtistProfile, t: (key: TranslationKey) => string): string {
    return `
    <header class="relative h-64 md:h-80 w-full bg-white">
      <button id="btn-back-mobile" class="lg:hidden absolute top-4 left-4 z-10 p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors shadow-lg" aria-label="${t('backToList')}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
      </button>
      <img src="${profile.coverImage}" alt="Cover" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-white/20"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex items-end space-x-4 md:space-x-6">
        <div class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white bg-gray-200 shadow-lg flex-shrink-0 -mb-8 md:-mb-12">
          <img src="${profile.profilePicture}" alt="${profile.name}" class="w-full h-full object-cover" />
        </div>
        <div class="pb-8 md:pb-12">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight drop-shadow-sm">${profile.name}</h1>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-gray-600 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md">
            <span>${profile.genre}</span>
            <span class="hidden md:inline">•</span>
            <span>${profile.location}</span>
            ${profile.members && profile.members.length > 0 ? `
              <span class="hidden md:inline">•</span>
              <span>${t('members')}: ${profile.members.join(', ')}</span>` : ''}
          </div>
        </div>
      </div>
    </header>`;
}

function renderSocialLinks(socials: SocialLinks, t: (key: TranslationKey) => string): string {
    const platforms: { key: keyof SocialLinks, icon: string, nameKey: TranslationKey }[] = [
        { key: 'youtube', icon: ICONS.youtube, nameKey: 'youtube' }, { key: 'instagram', icon: ICONS.instagram, nameKey: 'instagram' },
        { key: 'twitter', icon: ICONS.twitter, nameKey: 'twitter' }, { key: 'facebook', icon: ICONS.facebook, nameKey: 'facebook' },
    ];
    return `<div class="flex flex-wrap gap-3">
        ${platforms.map(({ key, icon, nameKey }) => socials[key] ? `
            <a href="${socials[key]}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-500 hover:bg-indigo-600 hover:text-white transition-all duration-300" aria-label="${t(nameKey)}">
                ${icon}
            </a>` : '').join('')}
    </div>`;
}

function renderMusicSection(music: MusicRelease[]): string {
    return `<div class="space-y-4">
    ${music.map(item => `
      <div class="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
        <img src="${item.coverArt}" alt="${item.title}" class="w-24 h-24 object-cover rounded-md flex-shrink-0" />
        <div class="flex-grow text-center sm:text-left">
          <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
          <p class="text-sm text-gray-500">${item.type} • ${item.releaseDate}</p>
          <div class="flex justify-center sm:justify-start items-center gap-4 mt-2">
            ${item.links.youtubeMusic ? `<a href="${item.links.youtubeMusic}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-red-500">${ICONS.youtubeSmall}</a>` : ''}
          </div>
        </div>
      </div>`).join('')}
    </div>`;
}

function renderVideoSection(videos: Video[]): string {
    return `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    ${videos.map(item => `
      <div>
        <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-gray-200">
          <iframe src="https://www.youtube.com/embed/${item.youtubeVideoId}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
        </div>
        <h3 class="mt-2 text-md font-medium text-gray-800">${item.title}</h3>
      </div>`).join('')}
    </div>`;
}

function renderEventSection(events: Event[], t: (key: TranslationKey) => string): string {
    return `<div class="space-y-1">
    ${events.map(item => {
        const date = new Date(item.date);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        return `
        <div class="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0">
            <div class="text-center w-12 flex-shrink-0">
                <p class="text-xs text-indigo-600 font-semibold">${month}</p>
                <p class="text-2xl font-bold text-gray-800">${day}</p>
            </div>
            <div class="flex-grow">
                <h3 class="font-semibold text-gray-900">${item.eventName}</h3>
                <p class="text-sm text-gray-500">${item.venue}, ${item.city}</p>
            </div>
            ${item.ticketLink ? `<a href="${item.ticketLink}" target="_blank" rel="noopener noreferrer" class="ml-auto px-3 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors whitespace-nowrap">${t('buyTickets')}</a>` : ''}
        </div>`;
    }).join('')}
    </div>`;
}

function renderAnalyticsDashboard(data: AnalyticsData, t: (key: TranslationKey) => string): string {
    const demographicColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
    const maxPercentage = Math.max(...data.fanDemographics.map(d => d.percentage), 0);
    
    const fanDemographicsChart = `<div class="space-y-2">
        ${data.fanDemographics.map((entry, index) => `
            <div class="flex items-center">
                <span class="text-sm text-gray-600 w-20">${entry.city}</span>
                <div class="flex-1 bg-gray-200 rounded-full h-5">
                    <div class="h-5 rounded-full text-white text-xs flex items-center justify-end pr-2" style="width: ${entry.percentage / maxPercentage * 100}%; background-color: ${demographicColors[index % demographicColors.length]};">
                        ${entry.percentage}%
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`;

    const topSongsList = `<div class="space-y-3">
        ${data.topSongs.map((song, index) => `
            <div key="${song.title}" class="flex justify-between items-center text-sm">
                <span class="text-gray-700">${index + 1}. ${song.title}</span>
                <span class="font-semibold text-gray-900">${song.streams.toLocaleString()}</span>
            </div>
        `).join('')}
    </div>`;

    return `<div class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white border border-gray-200 p-6 rounded-lg text-center"><h3 class="text-gray-500 text-sm font-medium uppercase">${t('totalProfileViews')}</h3><p class="text-4xl font-bold text-gray-900 mt-2">${data.profileViews.toLocaleString()}</p></div>
            <div class="bg-white border border-gray-200 p-6 rounded-lg text-center"><h3 class="text-gray-500 text-sm font-medium uppercase">${t('topSong')}</h3><p class="text-2xl font-bold text-indigo-600 mt-2 truncate">${data.topSongs[0].title}</p><p class="text-gray-600">${data.topSongs[0].streams.toLocaleString()} ${t('streams')}</p></div>
            <div class="bg-white border border-gray-200 p-6 rounded-lg text-center"><h3 class="text-gray-500 text-sm font-medium uppercase">${t('topFanCity')}</h3><p class="text-3xl font-bold text-gray-900 mt-2">${data.fanDemographics[0].city}</p></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            ${renderProfileSection(t('fanDemographicsByCity'), fanDemographicsChart)}
            ${renderProfileSection(t('topSongsByStream'), topSongsList)}
        </div>
    </div>`;
}

function renderEditModal(profile: ArtistProfile, t: (key: TranslationKey) => string): string {
    const inputField = (label: string, name: string, value: string) => `
        <div>
            <label for="${name}" class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
            <input type="text" id="${name}" name="${name}" value="${value}" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>`;
    
    const profilePicField = `
        <div>
            <label for="profilePicture" class="block text-sm font-medium text-gray-700 mb-1">${t('profilePicURL')}</label>
            <div class="flex items-center gap-2">
                <input type="text" id="profilePicture" name="profilePicture" value="${profile.profilePicture}" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"/>
                <button type="button" id="btn-open-image-generator" class="px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-md hover:bg-indigo-200 transition-colors whitespace-nowrap">${t('generateWithAI')}</button>
            </div>
        </div>
    `;

    return `
    <div id="edit-modal-backdrop" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">${t('editProfileTitle')}</h2>
            <button id="btn-modal-close" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form id="edit-profile-form">
          <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               ${inputField(t('artistName'), 'name', profile.name)}
               ${inputField(t('genre'), 'genre', profile.genre)}
               ${inputField(t('location'), 'location', profile.location)}
               ${inputField(t('membersInputLabel'), 'members', profile.members?.join(', ') || '')}
            </div>
            <div>
                <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">${t('bio')}</label>
                <textarea id="bio" name="bio" rows="5" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">${profile.bio}</textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${profilePicField}
              ${inputField(t('coverImageURL'), 'coverImage', profile.coverImage)}
            </div>
            <h3 class="text-lg font-semibold text-gray-900 border-t border-gray-200 pt-6">${t('socialLinks')}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               ${inputField(t('youtubeURL'), 'youtube', profile.socials.youtube || '')}
               ${inputField(t('instagramURL'), 'instagram', profile.socials.instagram || '')}
               ${inputField(t('twitterURL'), 'twitter', profile.socials.twitter || '')}
               ${inputField(t('facebookURL'), 'facebook', profile.socials.facebook || '')}
            </div>
            ${inputField(t('contactEmail'), 'contactEmail', profile.contactEmail)}
          </div>
          <div class="p-6 bg-gray-50 border-t border-gray-200 flex justify-end items-center space-x-4 rounded-b-lg">
            <button type="button" id="btn-modal-cancel" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">${t('cancel')}</button>
            <button type="submit" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">${t('saveChanges')}</button>
          </div>
        </form>
      </div>
    </div>`;
}

function renderImageGeneratorModal(props: { t: (key: TranslationKey) => string, isImageLoading: boolean, generatedImageUrl: string }): string {
    const { t, isImageLoading, generatedImageUrl } = props;

    const imageDisplay = isImageLoading ?
        `<div class="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
            <svg class="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-4 text-gray-600">${t('generating')}</span>
        </div>` :
        (generatedImageUrl ?
            `<img src="${generatedImageUrl}" alt="Generated Profile Picture" class="w-full h-full object-contain rounded-md"/>` :
            `<div class="w-full h-full flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
                ${t('generateProfilePicture')}
            </div>`
        );
    
    return `
    <div id="image-generator-backdrop" class="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 flex flex-col">
                <h3 class="text-xl font-bold text-gray-900 mb-4">${t('generateProfilePicture')}</h3>
                <div class="space-y-4 flex-grow flex flex-col">
                    <div>
                        <label for="image-prompt-input" class="block text-sm font-medium text-gray-700 mb-1">${t('imagePromptPlaceholder')}</label>
                        <textarea id="image-prompt-input" rows="4" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                        <label for="image-style-select" class="block text-sm font-medium text-gray-700 mb-1">${t('imageStyle')}</label>
                        <select id="image-style-select" class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="Photorealistic">${t('stylePhotorealistic')}</option>
                            <option value="Oil painting">${t('styleOilPainting')}</option>
                            <option value="Watercolor">${t('styleWatercolor')}</option>
                            <option value="Black and white photo">${t('styleBlackAndWhite')}</option>
                        </select>
                    </div>
                    <div class="mt-auto pt-4 flex justify-end items-center space-x-4">
                        <button type="button" id="btn-cancel-generation" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">${t('cancel')}</button>
                        <button type="button" id="btn-generate-image" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors" ${isImageLoading ? 'disabled' : ''}>
                          ${isImageLoading ? t('generating') : t('generate')}
                        </button>
                    </div>
                </div>
            </div>
            <div class="p-6 bg-gray-50 flex flex-col">
                <div class="aspect-square w-full h-full flex-grow">
                    ${imageDisplay}
                </div>
                <button type="button" id="btn-use-generated-image" class="mt-4 w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400" ${!generatedImageUrl || isImageLoading ? 'disabled' : ''}>
                    ${t('useThisImage')}
                </button>
            </div>
        </div>
    </div>`;
}

// --- MAIN RENDERER & EVENT ATTACHER ---

export function renderArtistDetailPage(props: DetailPageProps): string {
  const { profile, activeTab, isEditing, language, analyticsData, t, isGeneratingImage, isImageLoading, generatedImageUrl } = props;

  const upcomingEventDate = (() => {
      if (!profile || !profile.events || profile.events.length === 0) return undefined;
      const sortedEvents = [...profile.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const firstEventDate = new Date(sortedEvents[0].date);
      const year = firstEventDate.getFullYear();
      const month = (firstEventDate.getMonth() + 1).toString().padStart(2, '0');
      return `${year}/${month}`;
  })();

  const profileContent = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        ${renderProfileSection(t('about'), `<p class="whitespace-pre-wrap leading-relaxed text-gray-600">${profile.bio}</p>`)}
        ${renderProfileSection(t('music'), renderMusicSection(profile.music))}
        ${renderProfileSection(t('videos'), renderVideoSection(profile.videos))}
      </div>
      <div class="lg:col-span-1 space-y-8">
        ${renderProfileSection(t('upcomingShows'), renderEventSection(profile.events, t), upcomingEventDate)}
        ${renderProfileSection(t('social'), `
          ${renderSocialLinks(profile.socials, t)}
          <div class="mt-6 border-t border-gray-200 pt-4">
            <h4 class="font-semibold text-gray-500">${t('bookingContact')}</h4>
            <a href="mailto:${profile.contactEmail}" class="text-indigo-600 hover:text-indigo-500 transition-colors">${profile.contactEmail}</a>
          </div>`)}
      </div>
    </div>`;

  const analyticsContent = renderAnalyticsDashboard(analyticsData, t);

  return `
    <div class="flex min-h-screen bg-gray-100 font-sans">
      ${renderSidebar(activeTab, language, t)}
      <div class="flex-1 lg:pl-64">
        ${renderHeader(profile, t)}
        <main class="p-4 md:p-8">
          ${activeTab === 'profile' ? profileContent : analyticsContent}
        </main>
      </div>
      ${isEditing ? renderEditModal(profile, t) : ''}
      ${isGeneratingImage ? renderImageGeneratorModal({ t, isImageLoading, generatedImageUrl }) : ''}
    </div>`;
}

export function attachArtistDetailListeners(handlers: DetailPageHandlers) {
  // Helper to add event listeners safely
  // Fix: Corrected the type of the event handler parameter. The imported `Event` type was conflicting with the global DOM `Event` type.
  const listen = (id: string, event: keyof HTMLElementEventMap, handler: (e: globalThis.Event) => void) => {
    document.getElementById(id)?.addEventListener(event, handler);
  };
  
  // Sidebar Listeners
  listen('btn-back', 'click', handlers.handleBackToList);
  listen('btn-back-mobile', 'click', handlers.handleBackToList);
  listen('btn-tab-profile', 'click', () => handlers.setActiveTab('profile'));
  listen('btn-tab-analytics', 'click', () => handlers.setActiveTab('analytics'));
  listen('btn-edit', 'click', handlers.onEdit);
  listen('btn-share', 'click', handlers.handleShare);
  listen('btn-download', 'click', handlers.handleDownloadEPK);
  listen('btn-lang-ko', 'click', () => handlers.setLanguage('ko'));
  listen('btn-lang-en', 'click', () => handlers.setLanguage('en'));

  // Edit Modal Listeners
  listen('btn-modal-close', 'click', handlers.onCloseModal);
  listen('btn-modal-cancel', 'click', handlers.onCloseModal);
  listen('edit-modal-backdrop', 'click', (e) => {
    if ((e.target as HTMLElement).id === 'edit-modal-backdrop') {
        handlers.onCloseModal();
    }
  });

  // Image Generator Listeners
  listen('btn-open-image-generator', 'click', handlers.handleOpenImageGenerator);
  listen('btn-cancel-generation', 'click', handlers.handleCloseImageGenerator);
  listen('image-generator-backdrop', 'click', (e) => {
      if ((e.target as HTMLElement).id === 'image-generator-backdrop') {
          handlers.handleCloseImageGenerator();
      }
  });
  listen('btn-generate-image', 'click', () => {
      const prompt = (document.getElementById('image-prompt-input') as HTMLTextAreaElement).value;
      const style = (document.getElementById('image-style-select') as HTMLSelectElement).value;
      handlers.handleGenerateImage(prompt, style);
  });
  listen('btn-use-generated-image', 'click', handlers.handleUseGeneratedImage);


  const form = document.getElementById('edit-profile-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const updatedProfile: ArtistProfile = {
        name: formData.get('name') as string,
        genre: formData.get('genre') as string,
        location: formData.get('location') as string,
        members: (formData.get('members') as string).split(',').map(m => m.trim()).filter(Boolean),
        bio: formData.get('bio') as string,
        profilePicture: formData.get('profilePicture') as string,
        coverImage: formData.get('coverImage') as string,
        contactEmail: formData.get('contactEmail') as string,
        socials: {
          youtube: formData.get('youtube') as string,
          instagram: formData.get('instagram') as string,
          twitter: formData.get('twitter') as string,
          facebook: formData.get('facebook') as string,
        },
        // Music, videos, events are not editable in this form, so we keep the old data.
        // In a real app, these would be managed separately.
        music: handlers.profile.music || [],
        videos: handlers.profile.videos || [],
        events: handlers.profile.events || [],
      };
      handlers.handleSaveProfile(updatedProfile);
    });
  }
}