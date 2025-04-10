interface Song {
    id: string;
    name: string;
    image: { link: string }[];
    type: string;
    language: string;
  }
  
  interface Album {
    id: string;
    name: string;
    image: { link: string }[];
    type: string;
    language: string;
  }
  
  interface Playlist {
    id: string;
    title: string;
    image: { link: string }[];
    type: string;
    subtitle: string;
  }
  
  interface Artist {
    id: string;
    name: string;
    image: { link: string }[];
    type: string;
  }
  
  interface DashboardData {
    albums: Album[];
    charts: any[];
    playlists: Playlist[];
    artists: Artist[];
    trending: { songs: Song[]; albums: Album[] };
    latestSingles: Song[]
  }