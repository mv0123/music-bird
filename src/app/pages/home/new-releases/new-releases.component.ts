import { Component, OnInit } from '@angular/core';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { EventsService } from '../../../core/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.scss'
})
export class NewReleasesComponent implements OnInit {
  data = {
    albums: [] as any[],

  };

  constructor(private eventsService: EventsService, private apiService: JiosavanService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getDashboardData().subscribe((res: any) => {
      console.log('RES:::', res);
      this.data = res.data;
    });
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
}