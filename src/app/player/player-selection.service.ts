import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from './player';
import { PlayerService } from './player.service';
import { PlayerStorageService } from './player-storage.service';
import { AlertService } from '../notifications/alert.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerSelectionService {
  private playerSource = new Subject<Player>();
  private players: Player[];

  playerSelected$ = this.playerSource.asObservable();

  public currentPlayer: Player;

  constructor(
    private service: PlayerService,
    private alertService: AlertService,
    private storageService: PlayerStorageService
  ) {
    this.loadPlayers();
  }

  selectPlayer(player: Player) {
    this.currentPlayer = player;
    this.playerSource.next(player);
    this.storageService.storePlayer(player);
  }

  private determinePlayer(): Player {
    const storedPlayer = this.storageService.getPlayer();
    if (storedPlayer == null) {
      return this.players[0];
    }

    const lastPlayer = this.players.filter(p => p.id === storedPlayer.id)[0];
    if (lastPlayer != null) {
      return lastPlayer;
    } else {
      this.alertService.warn('Last used player not found!', 'Not Found');
      return this.players[0];
    }
  }

  private loadPlayers(): void {
    this.service.getPlayers().subscribe(players => {
      this.players = players;
      this.selectPlayer(this.determinePlayer());
    });
  }
}
