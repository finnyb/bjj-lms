import utils from '../request/request-utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const URL = utils.CONSTANTS.URL;
const parseReturnTags = utils.parseReturnTags;
const TAGS = utils.CONSTANTS;
const PLAYLIST_RETURN_TAGS = '{tags}';

const PLAYER_REQUEST =
  '{"method": "slim.request", "params": ["-", ["players", "0", "100"]]}';
const PLAYLIST_STATUS_REQUEST =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["status", ' +
  '"' +
  TAGS.START +
  '", ' +
  '"' +
  TAGS.ITEMS_PER_RESPONSE +
  '", ' +
  '"tags: ' +
  PLAYLIST_RETURN_TAGS +
  '"' +
  ']]}';

const PLAYER_ACTION =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["' +
  TAGS.COMMAND +
  '"]]}';
const PLAYER_MIXER_ACTION =
  '{"method": "slim.request", "params": ["' +
  TAGS.PLAYER_ID +
  '", ["mixer", "' +
  TAGS.COMMAND +
  '", "' +
  TAGS.PARAMETER +
  '"]]}';

export enum Command {
  Play = 'play',
  Stop = 'stop',
  Pause = 'pause',
  Power = 'power',
}

export enum MixerCommand {
  Volume = 'volume',
  Muting = 'muting',
}

@Injectable({
  providedIn: 'root',
})
export class PlayerRequestService {
  constructor(private httpClient: HttpClient) {}

  request(): Observable<Object> {
    return this.httpClient.post(URL, PLAYER_REQUEST);
  }

  status(
    playerId: string,
    returnTags: Array<string> = [],
    start: number = utils.CONSTANTS.DEFAULT_START,
    itemsPerResponse: number = utils.CONSTANTS.DEFAULT_PAGE_LIMIT
  ): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYLIST_STATUS_REQUEST.replace(TAGS.PLAYER_ID, playerId)
        .replace(TAGS.START, start.toString())
        .replace(TAGS.ITEMS_PER_RESPONSE, itemsPerResponse.toString())
        .replace(PLAYLIST_RETURN_TAGS, parseReturnTags(returnTags))
    );
  }

  action(playerId: string, command: Command): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYER_ACTION.replace(TAGS.PLAYER_ID, playerId).replace(
        TAGS.COMMAND,
        command
      )
    );
  }

  mixer(
    playerId: string,
    command: MixerCommand,
    param?: string
  ): Observable<Object> {
    return this.httpClient.post(
      URL,
      PLAYER_MIXER_ACTION.replace(TAGS.PLAYER_ID, playerId)
        .replace(TAGS.COMMAND, command)
        .replace(TAGS.PARAMETER, param)
    );
  }
}
