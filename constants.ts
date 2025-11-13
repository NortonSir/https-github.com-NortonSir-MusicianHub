import { ArtistProfile, AnalyticsData } from './types';

export const ARTIST_PROFILE_SOPRANO_LEE: ArtistProfile = {
  name: '이소현',
  genre: '성악 (소프라노)',
  location: '대한민국, 서울',
  bio: "세계적인 명성을 자랑하는 소프라노 이소현은 그녀의 수정처럼 맑은 목소리와 깊이 있는 감정 표현으로 전 세계 클래식 애호가들을 사로잡고 있습니다. 서울에서 태어나 이탈리아 밀라노에서 유학한 그녀는 유수의 국제 콩쿠르에서 우승하며 화려하게 데뷔했습니다. 모차르트부터 베르디까지 폭넓은 레퍼토리를 소화하며, 현재는 뉴욕 메트로폴리탄 오페라, 런던 로열 오페라 등 세계 최고의 무대에서 주역으로 활동하고 있습니다.",
  profilePicture: 'https://picsum.photos/seed/sohyun_lee_avatar/400/400',
  coverImage: 'https://picsum.photos/seed/sohyun_lee_cover/1500/500',
  contactEmail: 'contact@sohyunlee.classic',
  socials: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
  },
  music: [
    {
      id: 'sl1',
      title: 'The Art of Bel Canto',
      type: 'Album',
      releaseDate: '2023-09-15',
      coverArt: 'https://picsum.photos/seed/bel_canto/400/400',
      links: {},
    },
    {
      id: 'sl2',
      title: '밤의 여왕 아리아 (마술피리)',
      type: 'Single',
      releaseDate: '2024-02-20',
      coverArt: 'https://picsum.photos/seed/queen_of_night/400/400',
      links: {
        youtubeMusic: 'https://music.youtube.com',
      },
    },
  ],
  videos: [
    { id: 'sv1', title: '밤의 여왕 아리아 라이브 @ 카네기 홀', youtubeVideoId: 'J_-_Jk_Dmac' },
    { id: 'sv2', title: '오페라 "라 트라비아타" 하이라이트', youtubeVideoId: 'e4doAq_m_dY' },
  ],
  events: [
    { id: 'se1', date: '2024-09-10', eventName: '이소현 리사이틀', venue: '예술의전당 콘서트홀', city: '서울', ticketLink: '#' },
    { id: 'se2', date: '2024-10-05', eventName: '빈 국립 오페라 "마술피리" 출연', venue: 'Wiener Staatsoper', city: '비엔나', ticketLink: '#' },
  ],
};

export const ARTIST_PROFILE_PIANIST_PARK: ArtistProfile = {
  name: '박준서',
  genre: '피아노',
  location: '독일, 베를린',
  bio: "피아니스트 박준서는 섬세한 터치와 지적인 해석으로 현대 클래식 피아노계에서 가장 주목받는 연주자 중 한 명입니다. 그는 어린 나이에 쇼팽 국제 피아노 콩쿠르에서 최연소로 우승하며 세계 무대에 이름을 알렸습니다. 베를린을 중심으로 활동하며, 베를린 필하모닉, 런던 심포니 오케스트라 등 세계적인 오케스트라와 협연하고 있습니다. 그의 연주는 특히 쇼팽과 베토벤 해석에서 높은 평가를 받고 있습니다.",
  profilePicture: 'https://picsum.photos/seed/junseo_park_avatar/400/400',
  coverImage: 'https://picsum.photos/seed/junseo_park_cover/1500/500',
  contactEmail: 'management@junseoparkpiano.com',
  socials: {
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
  },
  music: [
    {
      id: 'jp1',
      title: 'Chopin: Nocturnes',
      type: 'Album',
      releaseDate: '2022-11-04',
      coverArt: 'https://picsum.photos/seed/chopin_nocturnes/400/400',
      links: { },
    },
    {
        id: 'jp2',
        title: 'Beethoven: Piano Sonatas',
        type: 'Album',
        releaseDate: '2024-04-12',
        coverArt: 'https://picsum.photos/seed/beethoven_sonatas/400/400',
        links: { },
    },
  ],
  videos: [
    { id: 'jv1', title: '쇼팽 녹턴 Op. 9 No. 2', youtubeVideoId: '9E6b3swbnWg' },
    { id: 'jv2', title: '베토벤 월광 소나타 3악장', youtubeVideoId: '4Tr0otuiQuU' },
  ],
  events: [
    { id: 'je1', date: '2024-08-20', eventName: '박준서 피아노 리사이틀', venue: '베를린 필하모니', city: '베를린' },
    { id: 'je2', date: '2024-09-18', eventName: '런던 심포니 오케스트라 협연', venue: '바비칸 센터', city: '런던', ticketLink: '#' },
  ],
};

export const ARTIST_PROFILE_COMPOSER_KIM: ArtistProfile = {
  name: '김민준',
  genre: '작곡',
  location: '대한민국, 파주',
  members: [],
  bio: "작곡가 김민준은 한국 전통 음악의 요소와 서양 현대 음악 기법을 결합하여 독창적인 음악 세계를 구축하고 있는 현대 작곡가입니다. 그의 작품은 날카로운 지성과 깊은 서정성을 동시에 담고 있다는 평을 받으며, 국내외 유수의 음악제에서 위촉받아 연주되고 있습니다. 파주 헤이리 예술마을에 작업실을 두고 창작 활동에 몰두하고 있으며, 차세대 작곡가들을 위한 교육에도 힘쓰고 있습니다.",
  profilePicture: 'https://picsum.photos/seed/minjun_kim_avatar/400/400',
  coverImage: 'https://picsum.photos/seed/minjun_kim_cover/1500/500',
  contactEmail: 'studio@minjunkim.composer',
  socials: {
    youtube: 'https://youtube.com',
  },
  music: [
    {
      id: 'km1',
      title: '교향곡 1번 "울림"',
      type: 'Album',
      releaseDate: '2023-01-20',
      coverArt: 'https://picsum.photos/seed/symphony_echo/400/400',
      links: { youtubeMusic: 'https://music.youtube.com' },
    },
     {
      id: 'km2',
      title: '현악 4중주 "시간의 결"',
      type: 'Album',
      releaseDate: '2021-06-10',
      coverArt: 'https://picsum.photos/seed/string_quartet/400/400',
      links: { youtubeMusic: 'https://music.youtube.com' },
    },
  ],
  videos: [
      { id: 'kv1', title: '교향곡 1번 "울림" 초연 실황 (KBS 교향악단)', youtubeVideoId: 's_fkpZqAGsA' },
  ],
  events: [
      { id: 'ke1', date: '2024-11-15', eventName: '김민준 작곡 발표회', venue: '금호아트홀 연세', city: '서울', ticketLink: '#' },
      { id: 'ke2', date: '2025-04-02', eventName: '통영국제음악제 위촉 작품 발표', venue: '통영콘서트홀', city: '통영' },
  ],
};


export const ARTIST_LIST = [ARTIST_PROFILE_SOPRANO_LEE, ARTIST_PROFILE_PIANIST_PARK, ARTIST_PROFILE_COMPOSER_KIM];


export const MOCK_ANALYTICS_DATA: AnalyticsData = {
    profileViews: 25890,
    fanDemographics: [
        { city: '서울', percentage: 40 },
        { city: '베를린', percentage: 25 },
        { city: '비엔나', percentage: 15 },
        { city: '뉴욕', percentage: 10 },
        { city: '기타', percentage: 10 },
    ],
    topSongs: [
        { title: '밤의 여왕 아리아', streams: 2105821 },
        { title: 'Chopin: Nocturnes', streams: 1870123 },
        { title: '교향곡 1번 "울림"', streams: 950489 },
    ],
};