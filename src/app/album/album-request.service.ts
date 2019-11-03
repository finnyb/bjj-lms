import { Injectable } from '@angular/core';
import { DatabaseRequestService } from '../request/database-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumRequestService {
  constructor(private service: DatabaseRequestService) {}

  albumsByArtist(id: string): Observable<Object> {
    return this.service.request(
      'albums',
      [`artist_id: ${id}`],
      ['a', 'l', 'y', 'j', 'S']
    );
  }

  albumsByYear(year: string): Observable<Object> {
    return this.service.request(
      'albums',
      [`year: ${year}`],
      ['a', 'l', 'y', 'j', 'S']
    );
  }
}
