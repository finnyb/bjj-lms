import { Component, Input, OnInit } from '@angular/core';
import { PlaylistTrack } from '../playlist-track';
import { CoverService } from '../../album/cover.service';
import { Player } from '../../player/player';

@Component({
  selector: 'app-playlist-track',
  templateUrl: './playlist-track.component.html',
  styleUrls: ['./playlist-track.component.scss'],
})
export class PlaylistTrackComponent implements OnInit {
  @Input() track: PlaylistTrack;
  @Input() player: Player;
  @Input() playing: boolean;

  visible = false;

  constructor(private coverService: CoverService) {}

  ngOnInit() {}

  cover() {
    return this.coverService.thumbnailUrl100px(this.track.coverId);
  }

  showActions() {
    this.visible = true;
  }

  hideActions() {
    this.visible = false;
  }
}
