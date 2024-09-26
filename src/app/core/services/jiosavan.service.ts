import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiosavanService {

  private apiUrl = 'https://jio-saavn-pi.vercel.app/';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}modules?language=haryanvi,punjabi`);
  }

  getPlayListData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}playlists?id=${id}`);
  }

  getAlbumData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}albums?id=${id}`);
  }

  getSongData(id?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}songs?id=${id}`);
  }

  searchSongs(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}search/all?query=${query}`);
  }

  getArtistData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}artistslists?id=${id}`);
  }
}
