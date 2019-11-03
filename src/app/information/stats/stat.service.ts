import { Injectable } from '@angular/core';
import { StatEnum, StatRequestService } from './stat-request.service';
import { Stat } from './stat';
import { forkJoin, Observable } from 'rxjs';
import { mapStat, StatResponse } from './stat-response';
import { map } from 'rxjs/operators';

const stat = function(
  name: string,
  service: StatRequestService,
  type: StatEnum
): Observable<Stat> {
  return service.request(type).pipe(
    map((r: StatResponse) => {
      return mapStat(name, r);
    })
  );
};

@Injectable({
  providedIn: 'root',
})
export class StatService {
  constructor(private statRequest: StatRequestService) {}

  artists(): Observable<Stat> {
    return stat('Artists', this.statRequest, StatEnum.Artists);
  }

  albums(): Observable<Stat> {
    return stat('Albums', this.statRequest, StatEnum.Albums);
  }

  genres(): Observable<Stat> {
    return stat('Genres', this.statRequest, StatEnum.Genres);
  }

  tracks(): Observable<Stat> {
    return stat('Tracks', this.statRequest, StatEnum.Tracks);
  }

  duration(): Observable<Stat> {
    return stat('Playtime', this.statRequest, StatEnum.Playtime);
  }

  all(): Observable<Array<Stat>> {
    return forkJoin([
      this.artists(),
      this.albums(),
      this.genres(),
      this.tracks(),
      this.duration(),
    ]);
  }
}
