import { Component, OnInit } from '@angular/core';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { EventsService } from '../../../core/services/events.service';
import { Route, Router } from '@angular/router';
// import { IDashboardData } from '../../../core/interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data = {
    albums: [] as any[],
    charts: [] as any[],
    playlists: [] as any[],
    artists: [] as any[],
    trending: { songs: [] as any[], albums: [] as any[] },
  };

  engData= {
    albums: [] as any[],
    charts: [] as any[],
    playlists: [] as any[],
    artists: [] as any[],
    trending: { songs: [] as any[], albums: [] as any[] },
  };
  song: any;

  constructor(private eventsService: EventsService, private apiService: JiosavanService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getDashboardData().subscribe((res: any) => {
      this.data = res.data;
    });
    this.apiService.getDashboardEngSong().subscribe((res: any) => {
      this.engData = res.data;
    });
  }

  playSong(args: any) {
    this.eventsService.publish('playSong', { data: args });
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
      default: alert('Something went wrong')
        break;
    }

  }
  navigateToArtist(artistId: string) {  
    this.router.navigate(['/artist', artistId]);
  }

  getSongDetails(song_id: string) {
    this.apiService.getArtistData(song_id).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.song = res.data[0].downloadUrl[4];
        console.log('Current song:', this.song); // Log current song details
      } else {
        console.error('No song data found for ID:', song_id);
      }
    }, error => {
      console.error('[Song API Error] =>', error);
    });
  }
}