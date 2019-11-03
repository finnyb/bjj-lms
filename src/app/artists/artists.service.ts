import { Injectable } from '@angular/core';
import { ArtistRequestService } from './artist-request.service';
import { Navigation } from '../navigations/navigation';
import {
  ArtistApiResponse,
  ArtistNavigationResponse,
  mapArtists,
  mapNavigations,
} from './artist-api-response';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Artist } from './artist';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import { ArtistResponse } from './artist-response';
import RequestUtils from '../request/request-utils';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private readonly handleError: HandleError;

  constructor(
    private service: ArtistRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('ArtistsService');
  }

  navigations(): Observable<Array<Navigation>> {
    return this.service.navigations().pipe(
      map((r: ArtistNavigationResponse) => mapNavigations(r)),
      catchError(this.handleError<Navigation[]>('artist navigations'))
    );
  }

  artistById(id: string): Observable<Artist> {
    return this.service.artistById(id).pipe(
      map((r: ArtistApiResponse) => mapArtists(r, 0).artists[0]),
      catchError(this.handleError<Artist>('artist by id'))
    );
  }

  artistByYear(year: string, page = 0): Observable<ArtistResponse> {
    const start = page * RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT;
    return this.service.artistByYear(year, start).pipe(
      map((r: ArtistApiResponse) => mapArtists(r, start)),
      catchError(this.handleError<ArtistResponse>('artist by id'))
    );
  }

  artistsForNavigation(nav: Navigation): Observable<ArtistResponse> {
    return this.service.artists(nav.start).pipe(
      map((r: ArtistApiResponse) => mapArtists(r, nav.start)),
      catchError(this.handleError<ArtistResponse>('artists for navigation'))
    );
  }

  artistsForPage(page: number): Observable<ArtistResponse> {
    const start = page * RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT;
    return this.service.artists(start).pipe(
      map((r: ArtistApiResponse) => mapArtists(r, start)),
      catchError(this.handleError<ArtistResponse>('artists for page'))
    );
  }

  search(filter: string, page = 0): Observable<ArtistResponse> {
    const start = page * RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT;
    return this.service.search(filter, start).pipe(
      map((r: ArtistApiResponse) => mapArtists(r, start)),
      catchError(this.handleError<ArtistResponse>('searching artist'))
    );
  }
}
