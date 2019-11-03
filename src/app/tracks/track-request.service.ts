import { Injectable } from '@angular/core';
import { DatabaseRequestService } from '../request/database-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackRequestService {
  constructor(private service: DatabaseRequestService) {}

  tracksForAlbum(id: string): Observable<Object> {
    return this.service.request(
      'tracks',
      [`album_id: ${id}`, 'sort:tracknum'],
      ['t', 'a', 'e', 'l', 'y', 'r', 'o', 'J']
    );
  }

  tracksForArtist(id: string): Observable<Object> {
    return this.service.request(
      'tracks',
      [`artist_id: ${id}`, 'sort:albumtrack'],
      ['a', 't', 'e', 'l', 'y', 'r', 'o', 'J'],
      0,
      9999
    );
  }

  // tracksForAlbum.json: function (id) {
  //   return databaseRequest.request({
  //     command: 'tracks',
  //     taggedParameters: ['album_id:' + id, 'sort:tracknum'],
  //     returnTags: ['t', 'a', 'e', 'l', 'y', 'r', 'o']
  //   });
  // },
  //
  // tracksForArtist: function (id) {
  //   return databaseRequest.request({
  //     command: 'tracks',
  //     itemsPerResponse: 9999,
  //     taggedParameters: ['artist_id:' + id, 'sort:albumtrack'],
  //     returnTags: ['a', 't', 'e', 'l', 'y', 'r', 'o', 'J']
  //   });
  // }
}
