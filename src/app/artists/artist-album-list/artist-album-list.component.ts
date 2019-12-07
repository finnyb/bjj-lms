import { Component, Input, OnInit } from '@angular/core';
import { CoverService } from '../../album/cover.service';
import { Album } from '../../album/album';
import { Track } from '../../tracks/track';
import { PlaylistService } from '../../playlist/playlist.service';

@Component({
  selector: 'app-artist-album-list',
  templateUrl: './artist-album-list.component.html',
  styleUrls: ['./artist-album-list.component.scss'],
})
export class ArtistAlbumListComponent implements OnInit {
  @Input() albums: Array<Album>;
  @Input() tracks: Array<Track>;

  constructor(private coverService: CoverService) {}

  ngOnInit() {}

  imageUrl(id: string): string {
    return this.coverService.thumbnailUrl250px(id);
  }

  albumTypes(id: string): Array<string> {
    return Array.from(new Set(this.albumTracks(id).map(t => t.type)));
  }

  albumTracks(id: string): Array<Track> {
    return this.tracks.filter(t => t.albumId === id);
  }
}
