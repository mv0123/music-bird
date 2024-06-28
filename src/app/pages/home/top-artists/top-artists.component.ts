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
  artist: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: JiosavanService
  ) { }

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId) {
      this.apiService.getArtistData(artistId).subscribe((res: any) => {
        this.artist = res;
      });
    }
  }
}
