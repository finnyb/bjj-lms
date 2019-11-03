import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/player';
import { PlayerStatusService } from '../../player/status/player-status.service';
import { PlayerService } from '../../player/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  selectedPlayer: Player;
  players: Player[];

  constructor(
    private playerService: PlayerService,
    private statusService: PlayerStatusService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
      this.selectPlayer(this.determinePlayer());
    });
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
    this.statusService.selected(player);
    localStorage.setItem('selectedPlayer', JSON.stringify(player));
  }

  private determinePlayer(): Player {
    const lastPlayer = this.players.filter(
      p => p.id === JSON.parse(localStorage.getItem('selectedPlayer')).id
    )[0];
    if (lastPlayer != null) {
      return lastPlayer;
    } else {
      this.snackBar.open('Last used player not found!', 'Not Found', {
        duration: 0,
      });
      return this.players[0];
    }
  }
}
