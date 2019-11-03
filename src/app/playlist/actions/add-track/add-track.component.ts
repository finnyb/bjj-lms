import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Track } from '../../../tracks/track';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../../playlist.service';
import { PlayerStatusService } from '../../../player/status/player-status.service';
import { Player } from '../../../player/player';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss'],
})
export class AddTrackComponent implements OnInit, OnDestroy {
  @Input() track: Track;
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

  addTrack() {
    this.service
      .addTrack(this.player, this.track)
      .subscribe(() => this.snackBar.open(this.track.name, 'added'));
  }
}
