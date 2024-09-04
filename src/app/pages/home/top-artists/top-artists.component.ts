import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss'
})
export class TopArtistsComponent implements OnInit {
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