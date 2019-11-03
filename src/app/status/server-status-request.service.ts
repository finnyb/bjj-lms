import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseRequestService } from '../request/database-request.service';

@Injectable({
  providedIn: 'root',
})
export class ServerStatusRequestService {
  constructor(private service: DatabaseRequestService) {}

  status(): Observable<Object> {
    return this.service.request('serverstatus', [], []);
  }
}
