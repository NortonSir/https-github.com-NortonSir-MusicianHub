import { translations } from './i18n';

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ko;

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
}

export interface MusicRelease {
  id: string;
  title: string;
  type: 'Album' | 'Single';
  releaseDate: string;
  coverArt: string;
  links: {
    youtubeMusic?: string;
  };
}

export interface Video {
  id: string;
  title: string;
  youtubeVideoId: string;
}

export interface Event {
  id: string;
  date: string;
  eventName: string;
  venue: string;
  city: string;
  ticketLink?: string;
}

export interface ArtistProfile {
  name: string;
  genre: string;
  location: string;
  members?: string[];
  bio: string;
  profilePicture: string;
  coverImage: string;
  socials: SocialLinks;
  music: MusicRelease[];
  videos: Video[];
  events: Event[];
  contactEmail: string;
}

export interface AnalyticsData {
  profileViews: number;
  fanDemographics: {
    city: string;
    percentage: number;
  }[];
  topSongs: {
    title: string;
    streams: number;
  }[];
}