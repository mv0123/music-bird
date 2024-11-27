import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JiosavanService } from '../../core/services/jiosavan.service';
import { EventsService } from '../../core/services/events.service';

interface Song {
  name: string;
  type: string;
  language: string;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}

interface Album {
  language: string;
  type: string;
  name: string;
  songIds: string;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}

interface TopQuery {
  primaryArtists: string;
  id: string;
  title: string;
  image: string;
  artist: string;
  url: string;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  data = {
    albums: [] as Album[],
    charts: [] as any[],
    playlists: [] as any[],
    trending: { songs: [] as Song[], albums: [] as any[] },
  };
  
  searchResults: (Song | Album | TopQuery)[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(
    private eventsService: EventsService,
    private jiosavanService: JiosavanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.searchSongs();
      }
    });
  }

  fetchDashboardData() {
    this.jiosavanService.getDashboardData().subscribe((res: any) => {
      this.data = res.data; // Store the initial data
    }, error => {
      console.error('Error fetching dashboard data:', error);
    });
  }

  searchSongs(): void {
  }

  clearSearch(): void {
    this.searchResults = [];
  }

  playSong(song: Song) {
    this.eventsService.publish('playSong', { data: song });
  }

  navigateToPlaylist(playlistId: string) {
    this.router.navigate(['/playlists', playlistId]);
  }

  dynamicNavigation(item: any) {
    switch (item.type) {
      case 'album':
        this.router.navigate(['/album', item.id]);
        break;
      case 'song':
        this.eventsService.publish('playSong', { data: item });
        break;
      default:
        alert('Something went wrong');
        break;
    }
  }
}
