import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlaylistTrack } from '../../playlist/playlist-track';
import { PlayerService } from '../player.service';
import { Mode, PlayerStatus } from './player-status';
import { PlayerSelectionService } from '../player-selection.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatusService {
  private statusSource = new Subject<PlayerStatus>();
  private playlistSource = new Subject<Array<PlaylistTrack>>();
  private currentlyPlayingSource = new Subject<PlaylistTrack>();

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

    if (this.tracks != null) {
      this.checkCurrentlyPlaying(s);
    }
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
    const track = this.tracks[status.currentIndex];
    if (this.currentTrack == null || track.id !== this.currentTrack.id) {
      this.trackChanged(track);
      this.currentTrack = track;
    }
  }
}
