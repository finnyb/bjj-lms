import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaylistTrack } from '../playlist-track';
import { PlayerStatusService } from '../../player/status/player-status.service';
import { Breadcrumb } from '../../bread-crumbs/breadcrumb';
import { CoverService } from '../../album/cover.service';
import { PlayerSelectionService } from '../../player/player-selection.service';
import { Player } from '../../player/player';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist-layout',
  templateUrl: './playlist-layout.component.html',
  styleUrls: ['./playlist-layout.component.scss'],
})
export class PlaylistLayoutComponent implements OnInit, OnDestroy {
  playerSubscription: Subscription;
  playlistSubscription: Subscription;
  currentTrackSubscription: Subscription;

  tracks: Array<PlaylistTrack>;
  currentCoverUrl: string;
  currentTrack: PlaylistTrack;

  crumbs: Breadcrumb[] = [
    {
      label: 'Playlist',
      url: 'playlist',
    },
  ];

  constructor(
    private coverService: CoverService,
    private playerStatusService: PlayerStatusService,
    private playerSelectionService: PlayerSelectionService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.loadPlayer();

    this.playerSubscription = this.playerSelectionService.playerSelected$.subscribe(
      () => this.loadPlayer()
    );

    this.playlistSubscription = this.playerStatusService.playlistChanged$.subscribe(
      tracks => (this.tracks = tracks)
    );

    this.currentTrackSubscription = this.playerStatusService.currentlyPlayingTrack$.subscribe(
      t => this.currentTrackChanged(t)
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
    this.playlistSubscription.unsubscribe();
    this.currentTrackSubscription.unsubscribe();
  }

  nextPage() {
    this.playlistService.nextPage();
  }

  player(): Player {
    return this.playerSelectionService.currentPlayer;
  }

  private loadPlayer(): void {
    if (this.player()) {
      this.playlistService.loadPlayer(this.player());
      this.loadCover();
    }
  }

  private currentTrackChanged(track: PlaylistTrack) {
    this.currentTrack = track;
    this.loadCover();
  }

  private loadCover() {
    this.currentCoverUrl = this.coverService.currentlyPlayingCover(
      this.player().id + this.timestamp()
    );
  }

  private timestamp(): string {
    return '&t=' + new Date().getTime();
  }
}
