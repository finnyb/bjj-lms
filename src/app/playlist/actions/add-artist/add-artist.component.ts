import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '../../playlist.service';
import { MatSnackBar } from '@angular/material';
import { Artist } from '../../../artists/artist';
import { PlayerSelectionService } from '../../../player/player-selection.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss'],
})
export class AddArtistComponent implements OnInit {
  @Input() artist: Artist;

  constructor(
    private service: PlaylistService,
    private playerSelectionService: PlayerSelectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  add() {
    this.service
      .addArtist(this.playerSelectionService.currentPlayer, this.artist)
      .subscribe(() => this.snackBar.open(this.artist.name, 'added'));
  }
}
