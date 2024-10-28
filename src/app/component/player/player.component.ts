import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { JiosavanService } from '../../core/services/jiosavan.service';
// import { DatabaseService } from '../../core/services/database.service';
// import { AuthService } from '../../core/services/auth.service';

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
  @Output() songLiked = new EventEmitter<Song>();
  songs: Song[] = [];
  filteredSongs: Song[] = [];
  song: Song = { name: 'Select song', id: '' };
  data: any;
  currentSongId: string | null = null;
  audioSrc: string | undefined;
  label: any;
  isPlaying = false;
  progress = 0;
  currentTime = 0;
  duration = 0;
  volume = 1;
  isMuted = false;
  showVolume = false;
  isLiked: boolean = false;


  private clickTimeout: any;

  constructor(private eventsService: EventsService, private apiService: JiosavanService, 
    // private authService: AuthService, private dbService: DatabaseService
  ) {}

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

  async toggleLike() {
    if (!this.currentSongId) {
      console.error('Current song ID is null');
      return; // Exit if currentSongId is null
    }

    this.isLiked = !this.isLiked;

    if (this.isLiked && this.song) {
      this.songLiked.emit(this.song as Song); // Emit the liked song, ensuring it matches the type
    }
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
      this.filteredSongs = allSongs; // Initialize filteredSongs
      console.log('All songs:', this.songs);
    }
  }

  checkApiCallsCompletion(apiCalls: number, allSongs: Song[]) {
    if (apiCalls <= 0) {
      this.songs = allSongs;
      this.filteredSongs = allSongs; // Initialize filteredSongs after all calls
      console.log('All songs:', this.songs);
    }
  }

  searchSongs(query: string) {
    if (!query) {
      this.filteredSongs = this.songs; // Reset to all songs if query is empty
    } else {
      this.filteredSongs = this.songs.filter(song =>
        song.name?.toLowerCase().includes(query.toLowerCase()) ||
        (song.label && song.label.toLowerCase().includes(query.toLowerCase()))
      );
    }
  }

  getSongDetails(song_id: string) {
    this.apiService.getSongData(song_id).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.label = res.data[0];
        this.song = res.data[0].downloadUrl[4];
        console.log('Current song:', this.song); // Log current song details
        this.playAudio();
      } else {
        console.error('No song data found for ID:', song_id);
      }
    }, error => {
      console.error('[Song API Error] =>', error);
    });
  }

  previousSong() {
    const previousIndex = this.getPreviousSongIndex(this.currentSongId!);
    if (previousIndex !== null) {
      const previousSong = this.songs[previousIndex];
      console.log('Playing previous song:', previousSong); // Log previous song
      this.playSong(previousSong);
    }
  }

  playNextSong() {
    const nextIndex = this.getNextSongIndex(this.currentSongId!);
    if (nextIndex !== null) {
      const nextSong = this.songs[nextIndex];
      console.log('Playing next song:', nextSong); 
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

  seek(seconds: number) {
    const newTime = this.audioPlayer.nativeElement.currentTime + seconds;
    this.audioPlayer.nativeElement.currentTime = Math.min(Math.max(newTime, 0), this.duration);
    this.updateProgress();
  }

  changeVolume(delta: number) {
    this.volume = Math.min(Math.max(this.volume + delta, 0), 1);
    if (!this.isMuted) {
      this.audioPlayer.nativeElement.volume = this.volume; 
    }
    this.showVolume = true; 
    clearTimeout(this.volumeTimeout);
    this.volumeTimeout = setTimeout(() => {
      this.showVolume = false;
    }, 1000);
  }

  private volumeTimeout: any; 

  handleNextClick() {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.playNextSong(); 
    }, 250); 
  }

  handleNextDoubleClick() {
    clearTimeout(this.clickTimeout);
    this.seek(10); 
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioPlayer.nativeElement.volume = this.isMuted ? 0 : this.volume; 
  }

  handlePreviousClick() {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.previousSong(); 
    }, 250);
  }

  handlePreviousDoubleClick() {
    clearTimeout(this.clickTimeout);
    this.seek(-10);
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
}
