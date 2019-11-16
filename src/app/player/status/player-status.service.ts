import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from '../player';
import { PlaylistTrack } from '../../playlist/playlist-track';
import { PlayerService } from '../player.service';
import { Mode, PlayerStatus } from './player-status';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatusService {
  private playerSource = new Subject<Player>();
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

  currentPlayer: Player;
  playerSelected$ = this.playerSource.asObservable();
  statusSource$ = this.statusSource.asObservable();
  playlistChanged$ = this.playlistSource.asObservable();
  currentlyPlayingTrack$ = this.currentlyPlayingSource.asObservable();

  constructor(private playerService: PlayerService) {
    this.lastChecked = Date.now();
  }

  selected(player: Player): void {
    this.currentPlayer = player;
    this.playerLoaded = true;
    this.playerSource.next(player);
    this.playerService.tracks(player).subscribe(() => {
      this.checkStatus();
    });
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
      this.playerService.status(this.currentPlayer).subscribe(s => {
        this.statusSource.next(s);
        this.processStatus(s);
        this.lastStatus = s;
      });
    } else if (this.lastStatus.mode === Mode.PLAYING) {
      this.lastStatus.time++;
    }
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
    this.playerService.tracks(this.currentPlayer).subscribe(r => {
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
