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
  data: any;
  currentSongId: any;
  currentIndex: number = 0;
  playlist: any;

  constructor(private eventsService: EventsService, private apiService: JiosavanService) { }

  ngOnInit(): void {
    this.eventsService.subscribe('playSong', (data: any) => {
      this.getSongDetails(data.data.id);
      this.currentSongId = data.data.id;
    });

    this.apiService.getDashboardData().subscribe((res: any) => {
      this.data = [
        ...res.data.trending.songs,
        ...res.data.charts,
        ...res.data.playlists
      ];
      console.log('[47] =>', this.data)

    });
    console.log('[Initial Data] =>', this.data);

setTimeout(() => {
  this.data.forEach((item: { type: string; id: any; }, index: string | number) => {
    // console.log('[52] =>', item);
    if (item.type === 'album') {
      const playlistId = item.id;
  
      this.apiService.getAlbumData(playlistId).subscribe((res: any) => {
        const playlistData = res.data;
        console.log('[57] =>', playlistData);
        this.data[index].playlist = playlistData;
      }, error => {
        console.error('[API Error] =>', error);
      });
    }
  });
}, 2000); // Delay of 0 ms to defer execution

  }

  getNextSongIndex(currentSongId: string): number | null {
    if (this.data && this.data.length > 0) {
      const currentIndex = this.data.findIndex((song: { id: string }) => song.id === currentSongId);

      if (currentIndex !== -1 && currentIndex < this.data.length - 1) {
        return currentIndex + 1;
      }
    }
    return null;
  }

  playNextSong() {
    const nextIndex = this.getNextSongIndex(this.currentSongId);

    if (nextIndex !== null) {
      const nextSong = this.data[nextIndex];
      this.playSong(nextSong);
    } else {
      console.log('No more songs in the playlist');
    }
  }

  playSong(song: any) {
    this.getSongDetails(song.id);
    this.currentSongId = song.id;
    this.currentIndex = this.data.findIndex((s: { id: string }) => s.id === song.id);
  }

  getSongDetails(song_id: any) {
    this.apiService.getSongData(song_id).subscribe((res: any) => {
      this.songs = res.data;
      this.song = this.songs[0];
      this.playAudio();
    });
  }

  playAudio() {
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

  previousSong() {
    if (this.currentIndex > 0) {
      const previousSong = this.data[this.currentIndex - 1];
      this.playSong(previousSong);
    }
  }

  nextSong() {
    this.playNextSong();
  }
}
