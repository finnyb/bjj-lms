import { Component, Input, OnInit } from '@angular/core';
import { PlaylistTrack } from '../playlist-track';

@Component({
  selector: 'app-playlist-current',
  templateUrl: './playlist-current.component.html',
  styleUrls: ['./playlist-current.component.scss'],
})
export class PlaylistCurrentComponent implements OnInit {
  @Input() track: PlaylistTrack;
  @Input() coverUrl: string;

  constructor() {}

  ngOnInit() {}
}
