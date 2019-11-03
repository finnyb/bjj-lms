import { Injectable } from '@angular/core';
import { AlbumRequestService } from './album-request.service';
import { Observable } from 'rxjs';
import { Album } from './album';
import { Artist } from '../artists/artist';
import { AlbumResponse, mapAlbums } from './album-response';
import { catchError, map } from 'rxjs/operators';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private readonly handleError: HandleError;

  constructor(
    private service: AlbumRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('AlbumService');
  }

  albumsByArtist(artist: Artist): Observable<Array<Album>> {
    return this.albumsByArtistId(artist.id);
  }

  albumsByArtistId(id: string): Observable<Array<Album>> {
    return this.service.albumsByArtist(id).pipe(
      map((r: AlbumResponse) => mapAlbums(r)),
      catchError(this.handleError<Album[]>('albums by artist'))
    );
  }
}
