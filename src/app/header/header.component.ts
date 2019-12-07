import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerStatus } from '../player/status/player-status';
import { Subscription } from 'rxjs';
import { PlayerStatusService } from '../player/status/player-status.service';
import { Player } from '../player/player';
import { PlayerSelectionService } from '../player/player-selection.service';

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
    private playerSelectionService: PlayerSelectionService,
    private statusService: PlayerStatusService
  ) {}

  ngOnInit() {
    this.playerSubscription = this.playerSelectionService.playerSelected$.subscribe(
      player => (this.selectedPlayer = player)
    );

    this.statusSubscription = this.statusService.statusSource$.subscribe(s =>
      this.checkStatus(s)
    );

    this.selectedPlayer = this.playerSelectionService.currentPlayer;
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
