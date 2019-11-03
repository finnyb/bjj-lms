import { Injectable } from '@angular/core';
import { PlaylistRequestService } from './playlist-request.service';
import { Track } from '../tracks/track';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { mapPlaylist, PlaylistApiResponse } from './playlist-api-response';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import { Album } from '../album/album';
import { Artist } from '../artists/artist';
import { Player } from '../player/player';
import { PlaylistTrack } from './playlist-track';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly handleError: HandleError;

  constructor(
    private service: PlaylistRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('PlaylistService');
  }

  clear(player: Player): Observable<boolean> {
    return this.service.clear(player.id).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError<boolean>('clear playlist'))
    );
  }

  playTrack(player: Player, track: PlaylistTrack): Observable<boolean> {
    return this.service.playTrack(player.id, track).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError<boolean>('play playlist'))
    );
  }

  addTrack(player: Player, track: Track): Observable<number> {
    return this.service.addTrack(player.id, track).pipe(
      map((r: PlaylistApiResponse) => mapPlaylist(r)),
      catchError(this.handleError<number>('add track'))
    );
  }

  deleteTrack(player: Player, track: PlaylistTrack): Observable<number> {
    return this.service.deleteTrack(player.id, track).pipe(
      map((r: PlaylistApiResponse) => mapPlaylist(r)),
      catchError(this.handleError<number>('add track'))
    );
  }

  addAlbum(player: Player, album: Album): Observable<number> {
    return this.service.addAlbum(player.id, album).pipe(
      map((r: PlaylistApiResponse) => mapPlaylist(r)),
      catchError(this.handleError<number>('add album'))
    );
  }

  addArtist(player: Player, artist: Artist): Observable<number> {
    return this.service.addArtist(player.id, artist).pipe(
      map((r: PlaylistApiResponse) => mapPlaylist(r)),
      catchError(this.handleError<number>('add artist'))
    );
  }
}
