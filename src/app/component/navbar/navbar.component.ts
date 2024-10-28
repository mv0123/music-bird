import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JiosavanService } from '../../core/services/jiosavan.service';
import { Song, Album, TopQuery } from '../../core/pipes/song.model';

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

  constructor(private router: Router, private jiosavanService: JiosavanService) {}

  ngOnInit(): void {
    this.loadLikedSongs();
  }

  loadLikedSongs(): void {
    this.likedSongs = [];
  }

  addSong(): void {
    console.log('Add Song clicked');
    // Implement logic for adding a song
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
  
          // this.searchResults = [
          //   ...songResults.map(song => ({
          //     id: song.id,
          //     title: song.title,
          //     image: song.image[0]?.link || '',
          //     artist: song.primaryArtists || song.singers || "Unknown Artist",
          //     url: song.url,
          //   })),
          //   ...albumResults.map(album => ({
          //     id: album.songIds.split(',')[0],
          //     title: album.title,
          //     image: album.image[0]?.link || '',
          //     artist: album.artist,
          //     url: album.url,
          //     songIds: album.songIds, // Required if needed
          //   })),
          //   ...topQueryResults.map(query => ({
          //     id: query.id,
          //     title: query.title,
          //     image: query.image[0]?.link || '',
          //     artist: query.primaryArtists || "Unknown Artist",
          //     url: query.url,
          //   }))
          // ];
  
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
  return item && typeof item.singers !== 'undefined' && typeof item.primaryArtists !== 'undefined';
}

function isAlbum(item: any): item is Album {
  return item && typeof item.songIds !== 'undefined' && typeof item.title !== 'undefined';
}
