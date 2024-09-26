import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { JiosavanService } from '../../core/services/jiosavan.service';

interface Song {
  image?: any[];
  name?: string;
  label?: string;
  id: string;
  link?: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  songs: Song[] = [];
  song: Song = { name: 'Select song', id: '' };
  data: any;
  currentSongId: string | null = null;
  currentIndex: number = 0;
  audioSrc: string | undefined;
  label: any;
  isPlaying = false;
  progress = 0;
  currentTime = 0;
  duration = 0;

  constructor(private eventsService: EventsService, private apiService: JiosavanService) { }

  ngOnInit(): void {
    this.eventsService.subscribe('playSong', (data: any) => {
      this.getSongDetails(data.data.id);
      this.currentSongId = data.data.id;
    });

    this.apiService.getDashboardData().subscribe((res: any) => {
      this.data = [
        ...res.data.trending.songs,
        ...res.data.trending.albums,
        ...res.data.playlists,
        ...res.data.charts,
        ...res.data.albums,
      ];
      this.extractSongsFromData(this.data);
    });
  }

  extractSongsFromData(data: any) {
    const allSongs: Song[] = [];
    let apiCalls = 0;

    data.forEach((item: any) => {
      if (item.type === 'playlist') {
        apiCalls++;
        this.apiService.getPlayListData(item.id).subscribe((res: any) => {
          const playlistSongs = res.data.songs || [];
          allSongs.push(...playlistSongs);
          this.checkApiCallsCompletion(--apiCalls, allSongs);
        }, (error: any) => {
          console.error('[Playlist API Error] =>', error);
          this.checkApiCallsCompletion(--apiCalls, allSongs);
        });
      } else if (item.type === 'album') {
        apiCalls++;
        this.apiService.getAlbumData(item.id).subscribe((res: any) => {
          const albumSongs = res.data.songs || [];
          allSongs.push(...albumSongs);
          this.checkApiCallsCompletion(--apiCalls, allSongs);
        }, error => {
          console.error('[Album API Error] =>', error);
          this.checkApiCallsCompletion(--apiCalls, allSongs);
        });
      } else if (item.type === 'song') {
        allSongs.push(item);
      }
    });

    if (apiCalls === 0) {
      this.songs = allSongs;
    }
  }

  checkApiCallsCompletion(apiCalls: number, allSongs: Song[]) {
    if (apiCalls <= 0) {
      this.songs = allSongs;
    }
  }


  getSongDetails(song_id: string) {
    this.apiService.getSongData(song_id).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.label = res.data[0];
        this.song = res.data[0].downloadUrl[4];
        this.playAudio();
      } else {
        console.error('No song data found for ID:', song_id);
      }
    }, error => {
      console.error('[Song API Error] =>', error);
    });
  }

  get remainingTime() {
    return Math.max(0, this.duration - this.currentTime);
  }


  onProgressClick(event: MouseEvent) {
    const progressContainer = (event.target as HTMLElement).parentElement;
    const rect = progressContainer?.getBoundingClientRect();
    if (rect) {
      const clickX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const newTime = (clickX / totalWidth) * this.duration;
      this.audioPlayer.nativeElement.currentTime = newTime;
      this.updateProgress();
    }
  }

  previousSong() {
    const previousIndex = this.getPreviousSongIndex(this.currentSongId!);
    if (previousIndex !== null) {
      const previousSong = this.songs[previousIndex];
      this.playSong(previousSong);
    }
  }

  playNextSong() {
    const nextIndex = this.getNextSongIndex(this.currentSongId!);
    if (nextIndex !== null) {
      const nextSong = this.songs[nextIndex];
      this.playSong(nextSong);
    }
  }

  getNextSongIndex(currentSongId: string): number | null {
    const currentIndex = this.songs.findIndex(song => song.id === currentSongId);
    return currentIndex < this.songs.length - 1 ? currentIndex + 1 : null;
  }

  getPreviousSongIndex(currentSongId: string): number | null {
    const currentIndex = this.songs.findIndex(song => song.id === currentSongId);
    return currentIndex > 0 ? currentIndex - 1 : null;
  }

  playSong(song: Song) {
    this.getSongDetails(song.id);
    this.currentSongId = song.id;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      if (this.audioPlayer.nativeElement.currentTime === 0) {
        this.playAudio(); 
      } else {
        this.audioPlayer.nativeElement.play().then(() => {
          this.isPlaying = true;
        }).catch(error => {
          console.error('Playback failed:', error);
        });
      }
    }
  }
  
  pauseAudio() {
    this.audioPlayer.nativeElement.pause();
    this.isPlaying = false;
  }
  
  playAudio() {
    const audioSrc = this.song.link;
    if (audioSrc) {
      this.audioPlayer.nativeElement.src = audioSrc;
      this.audioPlayer.nativeElement.load(); 
      this.audioPlayer.nativeElement.currentTime = 0;
      this.audioPlayer.nativeElement.play().then(() => {
        this.isPlaying = true;
      }).catch(error => {
        console.error('Playback failed:', error);
      });
    } else {
      console.error('No valid audio source found for the song:', this.song);
    }
  }
  
  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    this.duration = audio.duration || 0;
    this.progress = (this.currentTime / this.duration) * 100 || 0;
  }

  setDuration() {
    this.duration = this.audioPlayer.nativeElement.duration || 0;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


}
