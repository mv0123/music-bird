import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addSongToLikes(userId: string, songId: string) {
    const likesRef = doc(collection(this.firestore, 'users'), userId, 'likes', songId);
    await setDoc(likesRef, {
      songId: songId,
      timestamp: new Date(),
    });
  }

  async removeSongFromLikes(userId: string, songId: string) {
    const likesRef = doc(collection(this.firestore, 'users'), userId, 'likes', songId);
    await deleteDoc(likesRef);
  }
}
