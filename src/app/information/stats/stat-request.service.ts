import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import utils from '../../request/request-utils';

const URL = utils.CONSTANTS.URL;
const TAGS = utils.CONSTANTS;

const INFO_REQUEST =
  '{"method": "slim.request", "params": ["-", ["info", "total", "' +
  TAGS.TYPE +
  '", "?"]]}';

export enum StatEnum {
  Artists = 'artists',
  Albums = 'albums',
  Tracks = 'songs',
  Genres = 'genres',
  Playtime = 'duration',
}

@Injectable({
  providedIn: 'root',
})
export class StatRequestService {
  constructor(private httpClient: HttpClient) {}

  request(type: StatEnum): Observable<Object> {
    return this.httpClient.post(URL, INFO_REQUEST.replace(TAGS.TYPE, type));
  }
}
