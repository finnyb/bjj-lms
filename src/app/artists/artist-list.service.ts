import { Injectable } from '@angular/core';
import { Artist } from './artist';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistListService {
  private artistSource = new Subject<Array<Artist>>();
  private artists: Array<Artist> = [];

  artistSource$ = this.artistSource.asObservable();

  constructor() {}

  public add(artists: Array<Artist>) {
    this.artists = [...this.artists, ...artists];
    this.artistSource.next(this.artists);
  }

  public reset() {
    this.artists = [];
  }
}
