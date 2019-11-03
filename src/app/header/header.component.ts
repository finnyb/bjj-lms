import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerStatus } from '../player/status/player-status';
import { Subscription } from 'rxjs';
import { PlayerStatusService } from '../player/status/player-status.service';
import { Player } from '../player/player';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedPlayer: Player;
  status: PlayerStatus;
  statusSubscription: Subscription;
  playerSubscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private statusService: PlayerStatusService
  ) {}

  ngOnInit() {
    this.playerSubscription = this.statusService.playerSelected$.subscribe(
      player => (this.selectedPlayer = player)
    );

    this.statusSubscription = this.statusService.statusSource$.subscribe(s =>
      this.checkStatus(s)
    );
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  checkStatus(status: PlayerStatus): void {
    this.status = status;
  }

  rescanning(): boolean {
    return this.status && this.status.rescanning;
  }
}
