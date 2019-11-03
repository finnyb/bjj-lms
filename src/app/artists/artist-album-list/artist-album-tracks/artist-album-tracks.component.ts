import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../tracks/track';
import { PlaylistService } from '../../../playlist/playlist.service';

@Component({
  selector: 'app-artist-album-tracks',
  templateUrl: './artist-album-tracks.component.html',
  styleUrls: ['./artist-album-tracks.component.scss'],
})
export class ArtistAlbumTracksComponent implements OnInit {
  @Input() tracks: Array<Track>;

  displayedColumns: string[] = ['num', 'name', 'add'];

  constructor(private service: PlaylistService) {}

  ngOnInit() {}
}
