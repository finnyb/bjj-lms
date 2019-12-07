import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '../../playlist.service';
import { MatSnackBar } from '@angular/material';
import { Artist } from '../../../artists/artist';
import { PlayerSelectionService } from '../../../player/player-selection.service';

@Component({
  selector: 'app-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss'],
})
export class ClearComponent implements OnInit {
  @Input() artist: Artist;

  constructor(
    private service: PlaylistService,
    private playerSelectionService: PlayerSelectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  clear() {
    this.service
      .clear(this.playerSelectionService.currentPlayer)
      .subscribe(() => this.snackBar.open('playlist', 'cleared'));
  }
}
