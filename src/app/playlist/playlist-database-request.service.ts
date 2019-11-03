import { Injectable } from '@angular/core';
import utils from '../request/request-utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const parseTaggedParameters = utils.parseTaggedParameters;

const URL = utils.CONSTANTS.URL;
const TAGS = utils.CONSTANTS;
const INDEX = '{index}';

const PLAYLIST_REQUEST =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["playlistcontrol", ' +
  '"cmd:' +
  TAGS.COMMAND +
  '", ' +
  '"' +
  TAGS.TAGGED_PARAMETERS +
  '"' +
  ']]}';

const PLAYLIST_INDEX =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["playlist", "index", ' +
  '"' +
  INDEX +
  '"' +
  ']]}';

const PLAYLIST_CLEAR =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["playlist", "clear"]]}';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDatabaseRequestService {
  constructor(private httpClient: HttpClient) {}

  clear(playerId: string): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYLIST_CLEAR.replace(TAGS.PLAYER_ID, playerId)
    );
  }

  index(playerId: string, playlistIndex: number): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYLIST_INDEX.replace(TAGS.PLAYER_ID, playerId).replace(
        INDEX,
        playlistIndex.toString()
      )
    );
  }

  request(
    command: string,
    playerId: string,
    taggedParameters: Array<string> = []
  ): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYLIST_REQUEST.replace(TAGS.COMMAND, command)
        .replace(TAGS.PLAYER_ID, playerId)
        .replace(
          TAGS.TAGGED_PARAMETERS,
          parseTaggedParameters(taggedParameters)
        )
    );
  }
}
