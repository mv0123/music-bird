import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { JiosavanService } from '../../core/services/jiosavan.service';

interface Song {
  image?: any[],
  name?: string,
  label?: string,
  id: string,
  downloadUrl?: any[],
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;

  songs: Song[] = [];
  song: Song = {
    name: 'Select song',
    id: '',
  };

  constructor(private eventsService: EventsService, private apiService: JiosavanService) { }

  ngOnInit(): void {
    this.eventsService.subscribe('playSong', (data: any) => {
      console.log('song::', data)
      this.getSongDetails(data.data.id);
    });
  }
  
  getSongDetails(song_id: any) {
    this.apiService.getSongData(song_id).subscribe((res: any) => {
      this.songs = res.data;
      this.song = this.songs[0]; 
      this.playSong();
    });
  }


  previousSong() {
    // Implement previous song functionality
  }

  nextSong() {
    // Implement next song functionality
  }

  playSong() {
    setTimeout(() => {
      this.audioPlayer.nativeElement.load();
      this.audioPlayer.nativeElement.play();
    }, 0);
  }

  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    const progressBar = this.progressBar.nativeElement;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  }
}
