import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { PlayerSelectionService } from '../../player/player-selection.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  players: Player[];
  player: Player;

  constructor(
    private playerService: PlayerService,
    private playerSelectionService: PlayerSelectionService
  ) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
      this.player = this.playerSelectionService.currentPlayer;
      this.playerSelectionService.playerSelected$.subscribe(
        p => (this.player = p)
      );
    });
  }

  selectPlayer(player: Player) {
    this.playerSelectionService.selectPlayer(player);
  }
}
