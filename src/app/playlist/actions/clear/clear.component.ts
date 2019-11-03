import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../../playlist.service';
import { MatSnackBar } from '@angular/material';
import { Artist } from '../../../artists/artist';
import { Player } from '../../../player/player';
import { Subscription } from 'rxjs';
import { PlayerStatusService } from '../../../player/status/player-status.service';

@Component({
  selector: 'app-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss'],
})
export class ClearComponent implements OnInit, OnDestroy {
  @Input() artist: Artist;
  private player: Player;

  playerSubscription: Subscription;

  constructor(
    private service: PlaylistService,
    private playerSelectedService: PlayerStatusService,
    private snackBar: MatSnackBar
  ) {
    this.player = playerSelectedService.currentPlayer;
  }

  ngOnInit() {
    this.playerSubscription = this.playerSelectedService.playerSelected$.subscribe(
      player => (this.player = player)
    );
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

  clear() {
    this.service
      .clear(this.player)
      .subscribe(() => this.snackBar.open('playlist', 'cleared'));
  }
}
