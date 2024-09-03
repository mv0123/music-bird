import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiosavanService {

  private apiUrl = 'https://jio-saavn-pi.vercel.app/';

  private url= "https://saavn.dev/api/";

  constructor(private http: HttpClient) { }

  getDashboardData() {
    return this.http.get(this.apiUrl + 'modules?language=hindi,haryanvi,punjabi,gujarati,rajasthani')
  }
  getPlayListData(id: string) {
    return this.http.get(`${this.apiUrl}playlists?id=${id}`);
  }

  getAlbumData(id: string) {
    return this.http.get(`${this.apiUrl}albums?id=${id}`);
  }

  getSongData(id?: string) {
    return this.http.get(this.apiUrl + `songs?id=${id}`)
  }
  searchSongs(query: string): Observable<any> {
    return this.http.get(this.apiUrl + `search/all?query=${query}`);
  }
  getArtistData(id: string): Observable<any> {
    return this.http.get(`${this.url}artistslists?id=${id}`);
  }

}
