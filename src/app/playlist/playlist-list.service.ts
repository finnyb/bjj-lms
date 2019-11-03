import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlaylistTrack } from './playlist-track';

@Injectable({
  providedIn: 'root',
})
export class PlaylistListService {
  private playlistTrackSource = new Subject<Array<PlaylistTrack>>();
  private tracks: Array<PlaylistTrack> = [];

  playlistTrackSource$ = this.playlistTrackSource.asObservable();

  constructor() {}

  public add(tracks: Array<PlaylistTrack>) {
    this.tracks = [...this.tracks, ...tracks];
    this.playlistTrackSource.next(this.tracks);
  }

  public reset() {
    this.tracks = [];
  }
}
