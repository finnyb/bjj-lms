import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../../player/player';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../../playlist.service';
import { PlayerStatusService } from '../../../player/status/player-status.service';
import { MatSnackBar } from '@angular/material';
import { Artist } from '../../../artists/artist';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss'],
})
export class AddArtistComponent implements OnInit, OnDestroy {
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

  add() {
    this.service
      .addArtist(this.player, this.artist)
      .subscribe(() => this.snackBar.open(this.artist.name, 'added'));
  }
}
