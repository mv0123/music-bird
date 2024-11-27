import { Component, OnInit, } from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss'
})
export class PodcastsComponent implements OnInit {

  data = {
    trending: { songs: [] as any[] },
  };
  constructor(private eventsService: EventsService, private apiService: JiosavanService, private router: Router) { }


  ngOnInit(): void {
    this.apiService.getDashboardData().subscribe((res: any) => {
      console.log('RES:::', res);
      this.data = res.data;
    });
  }

  playSong(args: any) {
    this.eventsService.publish('playSong', { data: args });
  }
}