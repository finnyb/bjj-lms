import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRequestService } from '../request/database-request.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistRequestService {
  constructor(private service: DatabaseRequestService) {}

  navigations(): Observable<Object> {
    return this.service.request('artists', [], ['Z']);
  }

  search(filter: string, start: number): Observable<Object> {
    return this.service.request('artists', [`search: ${filter}`], ['s'], start);
  }

  artistById(id: string): Observable<Object> {
    return this.service.request('artists', [`artist_id: ${id}`], ['s']);
  }

  artistByYear(year: string, start: number): Observable<Object> {
    return this.service.request('artists', [`year: ${year}`], ['s'], start);
  }

  artists(start: number): Observable<Object> {
    return this.service.request('artists', [], ['s'], start);
  }
}
