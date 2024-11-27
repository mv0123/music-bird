export interface Song {
  primaryArtists: any;
  singers: any;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}

export interface Album {
  songIds: any;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}

export interface TopQuery {
  primaryArtists: string;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}
