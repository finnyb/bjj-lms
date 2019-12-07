import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { PlaylistTrack } from '../../playlist/playlist-track';
import { PlayerService } from '../player.service';
import { Mode, PlayerStatus } from './player-status';
import { PlayerSelectionService } from '../player-selection.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatusService {
  private statusSource = new Subject<PlayerStatus>();
  private playlistSource = new Subject<Array<PlaylistTrack>>();
  private currentlyPlayingSource = new ReplaySubject<PlaylistTrack>(1);

  private tracks: Array<PlaylistTrack>;
  private currentTrack: PlaylistTrack;
  private playlistTimestamp: number;
  private playerLoaded: boolean;

  private lastChecked: number;
  private lastStatus: PlayerStatus;

  public updateInterval = 5000;

  statusSource$ = this.statusSource.asObservable();
  playlistChanged$ = this.playlistSource.asObservable();
  currentlyPlayingTrack$ = this.currentlyPlayingSource.asObservable();

  constructor(
    private playerService: PlayerService,
    private playerSelectionService: PlayerSelectionService
  ) {
    this.lastChecked = Date.now();
    this.tracks = [];
    this.playerSelectionService.playerSelected$.subscribe(() =>
      this.playerSelected()
    );
  }

  trackChanged(track: PlaylistTrack): void {
    this.currentlyPlayingSource.next(track);
  }

  playlistChanged(playlist: Array<PlaylistTrack>): void {
    this.playlistSource.next(playlist);
  }

  public checkStatus(): void {
    if (!this.playerLoaded) {
      return;
    }

    if (
      this.lastStatus == null ||
      Date.now() - this.lastChecked > this.updateInterval
    ) {
      this.lastChecked = Date.now();
      this.playerService
        .status(this.playerSelectionService.currentPlayer)
        .subscribe(s => {
          this.statusSource.next(s);
          this.processStatus(s);
          this.lastStatus = s;
        });
    } else if (this.lastStatus.mode === Mode.PLAYING) {
      this.lastStatus.time++;
    }
  }

  private playerSelected(): void {
    this.playerLoaded = true;
    this.checkStatus();
  }

  private processStatus(s: PlayerStatus) {
    if (this.playlistTimestamp !== s.playlistTimestamp) {
      this.playlistTimestamp = s.playlistTimestamp;
      this.loadTracks();
    }
    this.checkCurrentlyPlaying(s);
  }

  private loadTracks(): void {
    this.playerService
      .tracks(this.playerSelectionService.currentPlayer)
      .subscribe(r => {
        this.tracks = r.tracks;
        this.playlistChanged(r.tracks);
      });
  }

  private checkCurrentlyPlaying(status: PlayerStatus) {
    if (this.tracks.length > 0) {
      const track = this.tracks[status.currentIndex];
      if (_.isNil(this.currentTrack) || track.id !== this.currentTrack.id) {
        this.trackChanged(track);
        this.currentTrack = track;
      }
    } else if (!_.isNil(this.currentTrack)) {
      this.trackChanged(null);
      this.currentTrack = null;
    }
  }
}
