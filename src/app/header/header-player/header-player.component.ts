import { Component, Input } from '@angular/core';
import { Player } from '../../player/player';
import { PlayerStatusService } from '../../player/status/player-status.service';
import { PlayerService } from '../../player/player.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header-player',
  templateUrl: './header-player.component.html',
  styleUrls: ['./header-player.component.scss'],
})
export class HeaderPlayerComponent {
  @Input() player: Player;

  constructor(
    private playerService: PlayerService,
    private playerStatusService: PlayerStatusService,
    private snackBar: MatSnackBar
  ) {}

  pause() {
    this.playerService
      .pause(this.player)
      .subscribe(() => this.snackBar.open('player', 'paused'));
  }

  play() {
    this.playerService
      .play(this.player)
      .subscribe(() => this.snackBar.open('player', 'started'));
  }

  stop() {
    this.playerService
      .stop(this.player)
      .subscribe(() => this.snackBar.open('player', 'stopped'));
  }
}
