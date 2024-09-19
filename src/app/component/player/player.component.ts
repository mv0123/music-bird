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
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  songs: Song[] = [];
  song: Song = {
    name: 'Select song',
    id: '',
  
  };
  data: any;
  currentSongId: string | null = null;
  currentIndex: number = 0;
  audioSrc: any;
  lablel:any
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

      console.log('[Initial Data] =>', this.data);
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
          console.log(`[Fetched Playlist Songs from ${item.id}] =>`, playlistSongs);
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
          console.log(`[Fetched Album Songs from ${item.id}] =>`, albumSongs);
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
      console.log('[All Songs] =>', allSongs);
      this.songs = allSongs;
    }
  }

  checkApiCallsCompletion(apiCalls: number, allSongs: Song[]) {
    if (apiCalls <= 0) {
      console.log('[All Collected Songs] =>', allSongs);
      this.songs = allSongs;
    }
  }

  getNextSongIndex(currentSongId: string): number | null {
    if (this.songs.length > 0) {
      const currentIndex = this.songs.findIndex((song) => song.id === currentSongId);
      return currentIndex !== -1 && currentIndex < this.songs.length - 1 ? currentIndex + 1 : null;
    }
    return null;
  }

  playNextSong() {
    const nextIndex = this.getNextSongIndex(this.currentSongId!);
    if (nextIndex !== null) {
      const nextSong = this.songs[nextIndex];
      this.playSong(nextSong);
    } else {
      console.log('No more songs in the playlist');
    }
  }

  playSong(song: Song) {
    this.getSongDetails(song.id);
    this.currentSongId = song.id;
    this.currentIndex = this.songs.findIndex((s) => s.id === song.id);
  }

  getSongDetails(song_id: string) {
    this.apiService.getSongData(song_id).subscribe((res: any) => {
      console.log('Retrieved song data:', res.data);
      if (res.data.length > 0) {
        this.lablel = res.data[0]
        this.song = res.data[0].downloadUrl[3];
        console.log('Song URL:', this.song.link); // Log the URL
        this.playAudio();
      } else {
        console.error('No song data found for ID:', song_id);
      }
    }, error => {
      console.error('[Song API Error] =>', error);
    });
  }
  

  playAudio() {
    const audioSrc = this.song.link;
    console.log("Song URL:", audioSrc);
  
    if (audioSrc) {
      this.audioPlayer.nativeElement.src = audioSrc;
      this.audioPlayer.nativeElement.load();
      console.log('Audio source set, attempting to play.');
  
      this.audioPlayer.nativeElement.play().then(() => {
        console.log('Playback started successfully.');
      }).catch(error => {
        console.error('Playback failed:', error);
      });
    } else {
      console.error('No valid audio source found for the song:', this.song);
    }
  }

  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    const progressBar = this.progressBar.nativeElement;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  }

  previousSong() {
    if (this.currentIndex > 0) {
      const previousSong = this.songs[this.currentIndex - 1];
      this.playSong(previousSong);
    }
  }

  nextSong() {
    this.playNextSong();
  }
}
