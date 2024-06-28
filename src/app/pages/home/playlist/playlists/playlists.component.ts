import { Component, OnInit } from '@angular/core';
import { JiosavanService } from '../../../../core/services/jiosavan.service';
import { EventsService } from '../../../../core/services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {

  playlist: any = {};

  constructor(private route: ActivatedRoute, private apiService: JiosavanService, private eventsService: EventsService) { }

  ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.apiService.getPlayListData(playlistId).subscribe((res: any) => {
        this.playlist = res.data;
      });
    }
  }
  playSong(song: any) {
    this.eventsService.publish('playSong', { data: song });
  }

}