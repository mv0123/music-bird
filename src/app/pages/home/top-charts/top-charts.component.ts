import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-top-charts',
  templateUrl: './top-charts.component.html',
  styleUrl: './top-charts.component.scss'
})
export class TopChartsComponent implements OnInit {
  data = {
    charts: [] as any[],

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
}