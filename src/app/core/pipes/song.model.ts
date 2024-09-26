// song.model.ts
export interface Song {
    primaryArtists: any;
    singers: any;
    id: string;
    title: string;
    image: string; // URL for the image
    artist: string;
    url: string; // URL to play the song
  }

  // album.model.ts
export interface Album {
    songIds: any;
    id: string;
    title: string;
    image: string; // URL for the image
    artist: string;
    url: string; // URL to the album
  }

  // topQuery.model.ts
export interface TopQuery {
    primaryArtists: string;
    id: string;
    title: string;
    image: string; // URL for the image
    artist: string;
    url: string; // URL for the song
  }
  