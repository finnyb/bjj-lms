import { Injectable } from '@angular/core';
import { DatabaseRequestService } from '../../../request/database-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RescanRequestService {
  constructor(private service: DatabaseRequestService) {}

  rescan(): Observable<Object> {
    return this.service.requestWithoutParameters('rescan');
  }

  rescanProgress(): Observable<Object> {
    return this.service.requestWithoutParameters('rescanprogress');
  }
}
