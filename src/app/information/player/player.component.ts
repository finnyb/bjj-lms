import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { PlayerStatusService } from '../../player/status/player-status.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  selectedPlayer: Player;
  players: Player[];

  constructor(
    private service: PlayerService,
    private statusService: PlayerStatusService
  ) {}

  ngOnInit() {
    this.loadPlayers();
  }

  power(player: Player) {
    this.service.power(player).subscribe(() => this.loadPlayers());
  }

  private loadPlayers(): void {
    this.service.getPlayers().subscribe(players => {
      this.players = players;
      this.selectedPlayer = players[0];
      this.statusService.selected(this.selectedPlayer);
    });
  }
}
