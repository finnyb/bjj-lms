import { Injectable } from '@angular/core';
import { PlaylistRequestService } from './playlist-request.service';
import { Track } from '../tracks/track';
import { Observable, Subject } from 'rxjs';
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
import { PlayerService } from '../player/player.service';
import { PlayerTracksResponse } from '../player/player-tracks-response';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private readonly handleError: HandleError;

  private player: Player;
  private playlistTrackSource = new Subject<Array<PlaylistTrack>>();
  private playlistTracks: Array<PlaylistTrack> = [];
  private currentPage = 0;
  private numberOfPages = 0;

  playlistTrackSource$ = this.playlistTrackSource.asObservable();

  constructor(
    private service: PlaylistRequestService,
    private playerService: PlayerService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('PlaylistService');
  }

  public reset() {
    this.playlistTracks = [];
    this.playlistTrackSource.next(this.playlistTracks);
  }

  clear(player: Player): Observable<boolean> {
    return this.service.clear(player.id).pipe(
      map(() => {
        this.playlistTracks = [];
        this.playlistTrackSource.next(this.playlistTracks);
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

  public nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.tracks(this.player, this.currentPage);
    }
  }

  public loadPlayer(player: Player): void {
    this.player = player;
    this.reset();
    this.playerService.tracks(player).subscribe(r => this.add(r.tracks));
  }

  private tracks(player: Player, page = 0): void {
    this.playerService
      .tracks(player, page)
      .subscribe(r => this.loadPlaylistResponse(r));
  }

  public add(tracks: Array<PlaylistTrack>) {
    this.playlistTracks = [...this.playlistTracks, ...tracks];
    this.playlistTrackSource.next(this.playlistTracks);
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

  private loadPlaylistResponse(r: PlayerTracksResponse) {
    this.currentPage = r.startingPage;
    this.numberOfPages = r.pageCount;
    this.add(r.tracks);
  }
}
