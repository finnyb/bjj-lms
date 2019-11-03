import { Injectable } from '@angular/core';
import { DatabaseRequestService } from '../request/database-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppsRequestService {
  constructor(private service: DatabaseRequestService) {}

  public apps(): Observable<Object> {
    return this.service.request('apps', [], []);
  }
}
