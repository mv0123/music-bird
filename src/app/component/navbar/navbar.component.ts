import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JiosavanService } from '../../core/services/jiosavan.service';
import { Song, Album, TopQuery } from '../../core/pipes/song.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  searchResults: (Song | Album | TopQuery)[] = [];
  isLoading: boolean = false;
  showPopup: boolean = false;
  showLogin: boolean = false;
  showSignup: boolean = false;
  likedSongs: Song[] = []; 

  constructor(private router: Router, private jiosavanService: JiosavanService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadLikedSongs();
  }

  loadLikedSongs(): void {
    const storedSongs = localStorage.getItem('likedSongs');
    this.likedSongs = storedSongs ? JSON.parse(storedSongs) : [];
  }

  saveLikedSongs(): void {
    localStorage.setItem('likedSongs', JSON.stringify(this.likedSongs));
  }

  addSong(): void {
    this.snackBar.open('Feature coming soon!', 'Close', { duration: 2000 });
  }
  
  searchSongs(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.jiosavanService.searchSongs(this.searchQuery).subscribe(
        response => {
          this.isLoading = false;
          this.showPopup = true;
  
          const songResults: Song[] = response?.songs?.results || [];
          const albumResults: Album[] = response?.albums?.results || [];
          const topQueryResults: TopQuery[] = response?.topQuery?.results || [];
  
          this.searchResults = [
            ...songResults.map(song => ({
              id: song.id,
              title: song.title,
              image: song.image[0]?.link || '',
              artist: song.primaryArtists || song.singers || "Unknown Artist",
              url: song.url,
              primaryArtists: song.primaryArtists || song.singers || "Unknown Artist" // Ensuring compatibility with TopQuery
            })) as unknown as Song[],
          
            ...albumResults.map(album => ({
              id: album.songIds.split(',')[0],
              title: album.title,
              image: album.image[0]?.link || '',
              artist: album.artist,
              url: album.url,
              songIds: album.songIds
            })) as unknown as Album[],
          
            ...topQueryResults.map(query => ({
              id: query.id,
              title: query.title,
              image: query.image[0]?.link || '',
              primaryArtists: query.primaryArtists || "Unknown Artist",
              url: query.url
            })) as unknown as TopQuery[]
          ];
          
  
          if (!this.searchResults.length) {
            console.log("No results found.");
          }
        },
        error => {
          console.error('Error fetching search results:', error);
          this.isLoading = false;
          this.showPopup = false;
        }
      );
    } else {
      this.clearSearch();
    }
  }
  
  addLikedSong(item: Song | Album | TopQuery): void {
    if (isSong(item)) { 
      if (!this.likedSongs.find(s => s.id === item.id)) {
        this.likedSongs.push(item); 
        this.saveLikedSongs();
        this.snackBar.open(`${item.title} added to Liked Songs`, 'Close', { duration: 2000 });
      }
    } else if (isAlbum(item)) { 
      console.log("Liked an album:", item);
    } else {
      console.log("Liked a query:", item);
    }
  }
  
  navigateToSearch(): void {
    this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
  }

  clearSearch(): void {
    this.searchResults = [];
    this.showPopup = false;
    this.searchQuery = '';
  }

  closePopup(): void {
    this.clearSearch();
  }

  playSong(item: Song | Album | TopQuery): void {
    console.log('Playing item:', item);
    window.open(item.url, '_blank');
  }
}

function isSong(item: any): item is Song {
  return item && item.id && (item.singers !== undefined || item.primaryArtists !== undefined);
}

function isAlbum(item: any): item is Album {
  return item && item.id && item.songIds !== undefined && item.title !== undefined;
}
