import { Component, Input } from '@angular/core';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { AlertService } from '../../notifications/alert.service';

@Component({
  selector: 'app-header-player',
  templateUrl: './header-player.component.html',
  styleUrls: ['./header-player.component.scss'],
})
export class HeaderPlayerComponent {
  @Input() player: Player;

  constructor(
    private playerService: PlayerService,
    private alertService: AlertService
  ) {}

  pause() {
    this.playerService
      .pause(this.player)
      .subscribe(() => this.alertService.info('player', 'paused'));
  }

  play() {
    this.playerService
      .play(this.player)
      .subscribe(() => this.alertService.info('player', 'started'));
  }

  stop() {
    this.playerService
      .stop(this.player)
      .subscribe(() => this.alertService.info('player', 'stopped'));
  }
}
