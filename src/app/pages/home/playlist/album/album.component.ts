import { Component, OnInit } from '@angular/core';
import { JiosavanService } from '../../../../core/services/jiosavan.service';
import { EventsService } from '../../../../core/services/events.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit{
  playlist: any = {};

  constructor(private route: ActivatedRoute, private apiService: JiosavanService, private eventsService: EventsService) { }

  ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.apiService.getAlbumData(playlistId).subscribe((res: any) => {
        this.playlist = res.data;
      });
    }
  }
  playSong(song: any) {
    this.eventsService.publish('playSong', { data: song });
  }
}
