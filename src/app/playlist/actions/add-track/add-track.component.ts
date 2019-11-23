import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../tracks/track';
import { PlaylistService } from '../../playlist.service';
import { MatSnackBar } from '@angular/material';
import { PlayerSelectionService } from '../../../player/player-selection.service';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss'],
})
export class AddTrackComponent implements OnInit {
  @Input() track: Track;

  constructor(
    private service: PlaylistService,
    private playerSelectionService: PlayerSelectionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  addTrack() {
    this.service
      .addTrack(this.playerSelectionService.currentPlayer, this.track)
      .subscribe(() => this.snackBar.open(this.track.name, 'added'));
  }
}
