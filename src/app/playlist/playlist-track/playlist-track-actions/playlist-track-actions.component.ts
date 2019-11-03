import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from '../../playlist.service';
import { Player } from '../../../player/player';
import { PlaylistTrack } from '../../playlist-track';

@Component({
  selector: 'app-playlist-track-actions',
  templateUrl: './playlist-track-actions.component.html',
  styleUrls: ['./playlist-track-actions.component.scss'],
})
export class PlaylistTrackActionsComponent implements OnInit {
  @Input()
  track: PlaylistTrack;
  @Input()
  player: Player;
  @Input()
  visible: boolean;

  constructor(
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  delete() {
    this.playlistService
      .deleteTrack(this.player, this.track)
      .subscribe(() => this.snackBar.open(this.track.name, 'removed'));
  }

  playTrack() {
    this.playlistService.playTrack(this.player, this.track).subscribe();
  }
}
