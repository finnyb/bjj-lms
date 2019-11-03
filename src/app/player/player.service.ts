import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player';

import { catchError, map } from 'rxjs/operators';
import { mapPlayers, PlayerApiResponse } from './player-api-response';
import {
  Command,
  MixerCommand,
  PlayerRequestService,
} from './player-request.service';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import {
  mapPlaylist,
  PlaylistTrackApiResponse,
} from '../playlist/playlist-track-api-response';
import { PlayerStatus } from './status/player-status';
import { PlayerTracksResponse } from './player-tracks-response';
import RequestUtils from '../request/request-utils';
import { PlayerStatusResponse } from './status/player-status-response';
import { PlayerStatusResponseService } from './status/player-status-response.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly handleError: HandleError;

  constructor(
    private request: PlayerRequestService,
    private responseService: PlayerStatusResponseService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('ArtistsService');
  }

  getPlayers(): Observable<Array<Player>> {
    return this.request.request().pipe(
      map((r: PlayerApiResponse) => {
        return mapPlayers(r);
      }),
      catchError(this.handleError<Player[]>('getPlayers'))
    );
  }

  status(player: Player): Observable<PlayerStatus> {
    return this.request.status(player.id, ['DD']).pipe(
      map((r: PlayerStatusResponse) => this.responseService.mapPlayerStatus(r)),
      catchError(this.handleError<PlayerStatus>('player status'))
    );
  }

  pause(player: Player): Observable<boolean> {
    return this.request.action(player.id, Command.Pause).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError<boolean>('pause'))
    );
  }

  play(player: Player): Observable<boolean> {
    return this.request.action(player.id, Command.Play).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError<boolean>('play'))
    );
  }

  stop(player: Player): Observable<boolean> {
    return this.request.action(player.id, Command.Stop).pipe(
      map(() => {
        return true;
      }),
      catchError(this.handleError<boolean>('stop'))
    );
  }

  tracks(player: Player, page = 0): Observable<PlayerTracksResponse> {
    const start = page * RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT;
    return this.request
      .status(
        player.id,
        ['playlist_tracks', 't', 'a', 'e', 'l', 'y', 'r', 'o', 'g'],
        start
      )
      .pipe(
        map((r: PlaylistTrackApiResponse) => {
          return mapPlaylist(r, start);
        }),
        catchError(this.handleError<PlayerTracksResponse>('playlist tracks'))
      );
  }

  volume(player: Player, volume: number): Observable<number> {
    return new Observable<number>(o => {
      this.request
        .mixer(player.id, MixerCommand.Volume, volume.toString())
        .subscribe(() => {
          this.status(player).subscribe(s => {
            o.next(s.volume);
            o.complete();
            // TODO error handling
          });
        });
    });
  }

  mute(player: Player): Observable<boolean> {
    return new Observable<boolean>(o => {
      this.request
        .mixer(player.id, MixerCommand.Muting, 'toggle')
        .subscribe(() => {
          this.status(player).subscribe(s => {
            o.next(s.muted);
            o.complete();
            o.error(err => this.handleError<PlayerTracksResponse>('mute'));
            // TODO error handling
          });
        });
    });
  }

  power(player: Player): Observable<boolean> {
    return this.request.action(player.id, Command.Power).pipe(
      map((r: PlayerApiResponse) => {
        return true;
      })
    );
  }
}
