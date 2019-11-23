import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaylistTrack } from '../playlist-track';
import { PlayerStatusService } from '../../player/status/player-status.service';
import { Breadcrumb } from '../../bread-crumbs/breadcrumb';
import { CoverService } from '../../album/cover.service';
import { PlayerService } from '../../player/player.service';
import { PlaylistListService } from '../playlist-list.service';
import { PlayerTracksResponse } from '../../player/player-tracks-response';
import { PlayerSelectionService } from '../../player/player-selection.service';
import { Player } from '../../player/player';

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

  private currentPage = 0;
  private numberOfPages = 0;

  constructor(
    private coverService: CoverService,
    private playerStatusService: PlayerStatusService,
    private playerSelectionService: PlayerSelectionService,
    private playerService: PlayerService,
    private playlistService: PlaylistListService
  ) {}

  ngOnInit() {
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

  private loadPlaylistResponse(r: PlayerTracksResponse) {
    this.currentPage = r.startingPage;
    this.numberOfPages = r.pageCount;
    this.playlistService.add(r.tracks);
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.playerService
        .tracks(this.playerSelectionService.currentPlayer, this.currentPage)
        .subscribe(r => this.loadPlaylistResponse(r));
    }
  }

  player(): Player {
    return this.playerSelectionService.currentPlayer;
  }

  private loadPlayer(): void {
    if (this.playerSelectionService.currentPlayer) {
      this.playlistService.reset();
      this.playerService
        .tracks(this.playerSelectionService.currentPlayer)
        .subscribe(r => this.loadPlaylistResponse(r));
    }
    this.loadCover();
  }

  private currentTrackChanged(track: PlaylistTrack) {
    this.currentTrack = track;
    this.loadCover();
  }

  private loadCover() {
    this.currentCoverUrl = this.coverService.currentlyPlayingCover(
      this.playerSelectionService.currentPlayer.id + this.timestamp()
    );
  }

  private timestamp(): string {
    return '&t=' + new Date().getTime();
  }
}
