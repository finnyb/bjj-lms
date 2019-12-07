import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '../../playlist.service';
import { MatSnackBar } from '@angular/material';
import { Album } from '../../../album/album';
import { PlayerSelectionService } from '../../../player/player-selection.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss'],
})
export class AddAlbumComponent implements OnInit {
  @Input() album: Album;

  constructor(
    private service: PlaylistService,
    private playerSelectionService: PlayerSelectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  add() {
    this.service
      .addAlbum(this.playerSelectionService.currentPlayer, this.album)
      .subscribe(() => this.snackBar.open(this.album.name, 'added'));
  }
}
