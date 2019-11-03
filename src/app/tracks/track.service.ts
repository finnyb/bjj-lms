import { Injectable } from '@angular/core';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import { Artist } from '../artists/artist';
import { Observable } from 'rxjs';
import { Album } from '../album/album';
import { catchError, map } from 'rxjs/operators';
import { TrackRequestService } from './track-request.service';
import { mapTracks, TrackResponse } from './track-response';
import { Track } from './track';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly handleError: HandleError;

  constructor(
    private service: TrackRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('TrackService');
  }

  tracksByArtist(artist: Artist): Observable<Array<Track>> {
    return this.tracksByArtistId(artist.id);
  }

  tracksByArtistId(id: string): Observable<Array<Track>> {
    return this.service.tracksForArtist(id).pipe(
      map((r: TrackResponse) => mapTracks(r)),
      catchError(this.handleError<Track[]>('tracks by artist'))
    );
  }

  tracksByAlbum(album: Album): Observable<Array<Track>> {
    return this.tracksByAlbumId(album.id);
  }

  tracksByAlbumId(id: string): Observable<Array<Track>> {
    return this.service.tracksForAlbum(id).pipe(
      map((r: TrackResponse) => mapTracks(r)),
      catchError(this.handleError<Track[]>('tracks by album'))
    );
  }
}
