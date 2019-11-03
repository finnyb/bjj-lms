import { Injectable } from '@angular/core';
import utils from './request-utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const parseTaggedParameters = utils.parseTaggedParameters;
const parseReturnTags = utils.parseReturnTags;

const URL = utils.CONSTANTS.URL;
const TAGS = utils.CONSTANTS;

const DATABASE_COMMAND_REQUEST =
  '{"method": "slim.request", "params": ["-", [' +
  '"' +
  TAGS.COMMAND +
  '"' +
  ']]}';

const DATABASE_REQUEST =
  '{"method": "slim.request", "params": ["-", [' +
  '"' +
  TAGS.COMMAND +
  '", ' +
  '"' +
  TAGS.START +
  '", ' +
  '"' +
  TAGS.ITEMS_PER_RESPONSE +
  '", ' +
  '"' +
  TAGS.TAGGED_PARAMETERS +
  '", ' +
  '"' +
  TAGS.RETURN_TAGS +
  '"' +
  ']]}';

@Injectable({
  providedIn: 'root',
})
export class DatabaseRequestService {
  constructor(private httpClient: HttpClient) {}

  request(
    command: string,
    taggedParameters: Array<string> = [],
    returnTags: Array<string> = [],
    start: number = utils.CONSTANTS.DEFAULT_START,
    itemsPerResponse: number = utils.CONSTANTS.DEFAULT_PAGE_LIMIT
  ): Observable<Object> {
    return this.httpClient.post(
      URL,
      DATABASE_REQUEST.replace(TAGS.COMMAND, command)
        .replace(TAGS.START, start.toString())
        .replace(TAGS.ITEMS_PER_RESPONSE, itemsPerResponse.toString())
        .replace(
          TAGS.TAGGED_PARAMETERS,
          parseTaggedParameters(taggedParameters)
        )
        .replace(
          TAGS.RETURN_TAGS,
          returnTags.length > 0
            ? TAGS.TAG_PREFIX + parseReturnTags(returnTags)
            : ''
        )
    );
  }

  requestWithoutParameters(command: string): Observable<Object> {
    return this.httpClient.post(
      URL,
      DATABASE_COMMAND_REQUEST.replace(TAGS.COMMAND, command)
    );
  }
}
