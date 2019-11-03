import { Injectable } from '@angular/core';
import { PlaylistDatabaseRequestService } from './playlist-database-request.service';
import { Track } from '../tracks/track';
import { Observable } from 'rxjs';
import { Album } from '../album/album';
import { Artist } from '../artists/artist';
import { PlaylistTrack } from './playlist-track';

@Injectable({
  providedIn: 'root',
})
export class PlaylistRequestService {
  constructor(private service: PlaylistDatabaseRequestService) {}

  clear(playerId: string): Observable<Object> {
    return this.service.clear(playerId);
  }

  playTrack(playerId: string, track: PlaylistTrack): Observable<Object> {
    return this.service.index(playerId, track.playlistIndex);
  }

  addTrack(playerId: string, track: Track): Observable<Object> {
    return this.service.request('add', playerId, [`track_id:${track.id}`]);
  }

  deleteTrack(playerId: string, track: PlaylistTrack): Observable<Object> {
    return this.service.request('delete', playerId, [`track_id:${track.id}`]);
  }

  addAlbum(playerId: string, album: Album): Observable<Object> {
    return this.service.request('add', playerId, [`album_id:${album.id}`]);
  }

  addArtist(playerId: string, artist: Artist): Observable<Object> {
    return this.service.request('add', playerId, [`artist_id:${artist.id}`]);
  }
}
