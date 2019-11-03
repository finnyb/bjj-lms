import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../../player/player';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../../playlist.service';
import { PlayerStatusService } from '../../../player/status/player-status.service';
import { MatSnackBar } from '@angular/material';
import { Album } from '../../../album/album';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
})
export class AddAlbumComponent implements OnInit, OnDestroy {
  @Input() album: Album;
  private player: Player;

  playerSubscription: Subscription;

  constructor(
    private service: PlaylistService,
    private playerStatusService: PlayerStatusService,
    private snackBar: MatSnackBar
  ) {
    this.player = playerStatusService.currentPlayer;
  }

  ngOnInit() {
    this.playerSubscription = this.playerStatusService.playerSelected$.subscribe(
      player => (this.player = player)
    );
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

  add() {
    this.service
      .addAlbum(this.player, this.album)
      .subscribe(() => this.snackBar.open(this.album.name, 'added'));
  }
}
