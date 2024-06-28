import { Component, OnInit } from '@angular/core';
import { JiosavanService } from '../../../core/services/jiosavan.service';
import { EventsService } from '../../../core/services/events.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-top-playlists',
  templateUrl: './top-playlists.component.html',
  styleUrl: './top-playlists.component.scss'
})
export class TopPlaylistsComponent implements OnInit {
  data = {
    playlists: [] as any[],
  };
  song: any;

  constructor(private apiService: JiosavanService, private router: Router) { }

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