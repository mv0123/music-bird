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
  showSubscribePopup: boolean = false;
  showLoginSignup: boolean = false;
  isSignUp: boolean = false;
  mobileNumber: string = '';
  dropdowns: { [key: string]: boolean } = {
    music: false,
    podcasts: false,
    goPro: false
  };

  searchResults: (Song | Album | TopQuery)[] = [];
  isLoading: boolean = false;
  showPopup: boolean = false;

  constructor(private router: Router, private jiosavanService: JiosavanService) {}

  ngOnInit(): void {}
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
                    url: song.url
                  })) as unknown as Song[], 
                    ...albumResults.map(album => ({
                      id: album.songIds.split(',')[0],
                      title: album.title,
                      image: album.image[0]?.link || '',
                      artist: album.artist,
                      url: album.url
                    })) as unknown as Album[],
                    ...topQueryResults.map(query => ({
                      id: query.id,
                      title: query.title,
                      image: query.image[0]?.link || '',
                      artist: query.primaryArtists || "Unknown Artist",
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


  clearSearch(): void {
    this.searchResults = [];
    this.showPopup = false;
    this.searchQuery = '';
  }

  closePopup(): void {
    this.clearSearch();
  }

  playSong(song: Song | Album | TopQuery): void {
    console.log('Playing song:', song);
    window.open(song.url, '_blank');
  }

  showLoginSignupPopup(type: 'login' | 'signup'): void {
    this.isSignUp = (type === 'signup');
    this.showLoginSignup = true;
  }

  closeLoginSignupPopup(): void {
    this.showLoginSignup = false;
    this.mobileNumber = '';
  }

  continue(): void {
    console.log(`${this.isSignUp ? 'Signing up' : 'Logging in'} with number: ${this.mobileNumber}`);
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
  }

  openSubscribePopup(): void {
    this.showSubscribePopup = true;
  }

  closeSubscribePopup(): void {
    this.showSubscribePopup = false;
  }

  toggleDropdown(menu: string, show: boolean): void {
    this.dropdowns[menu] = show;
  }
}
