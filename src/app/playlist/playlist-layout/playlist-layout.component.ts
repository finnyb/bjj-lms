import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../../player/player';
import { PlaylistTrack } from '../playlist-track';
import { PlayerStatusService } from '../../player/status/player-status.service';
import { Breadcrumb } from '../../bread-crumbs/breadcrumb';
import { CoverService } from '../../album/cover.service';
import { PlayerStatus } from '../../player/status/player-status';
import { PlayerService } from '../../player/player.service';
import { PlaylistListService } from '../playlist-list.service';
import { PlayerTracksResponse } from '../../player/player-tracks-response';

@Component({
  selector: 'app-playlist-layout',
  templateUrl: './playlist-layout.component.html',
  styleUrls: ['./playlist-layout.component.scss'],
})
export class PlaylistLayoutComponent implements OnInit, OnDestroy {
  player: Player;
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

  private status: PlayerStatus;
  private currentPage = 0;
  private numberOfPages = 0;

  constructor(
    private coverService: CoverService,
    private playerSelectedService: PlayerStatusService,
    private playerService: PlayerService,
    private playlistService: PlaylistListService
  ) {}

  ngOnInit() {
    this.player = this.playerSelectedService.currentPlayer;
    this.playerSubscription = this.playerSelectedService.playerSelected$.subscribe(
      player => this.loadPlayer(player)
    );

    this.playlistSubscription = this.playerSelectedService.playlistChanged$.subscribe(
      tracks => (this.tracks = tracks)
    );

    this.currentTrackSubscription = this.playerSelectedService.currentlyPlayingTrack$.subscribe(
      t => this.currentTrackChanged(t)
    );

    this.loadPlayer(this.player);
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
        .tracks(this.player, this.currentPage)
        .subscribe(r => this.loadPlaylistResponse(r));
    }
  }

  private loadPlayer(player: Player): void {
    if (player) {
      this.player = player;
      this.playlistService.reset();
      this.playerService
        .tracks(player)
        .subscribe(r => this.loadPlaylistResponse(r));
    }
  }

  private currentTrackChanged(track: PlaylistTrack) {
    this.currentTrack = track;
    this.currentCoverUrl =
      this.coverService.currentlyPlayingCover(this.player.id) +
      this.timestamp();
  }

  private timestamp(): string {
    return '&t=' + new Date().getTime();
  }
}
