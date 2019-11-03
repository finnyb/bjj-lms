import { Injectable } from '@angular/core';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerStatus } from './server-status';
import { ServerStatusRequestService } from './server-status-request.service';
import {
  mapStatus,
  ServerStatusApiResponse,
} from './server-status-api-response';

@Injectable({
  providedIn: 'root',
})
export class ServerStatusService {
  private readonly handleError: HandleError;

  constructor(
    private request: ServerStatusRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('ServerStatusService');
  }

  status(): Observable<ServerStatus> {
    return this.request.status().pipe(
      map((r: ServerStatusApiResponse) => {
        return mapStatus(r);
      }),
      catchError(this.handleError<ServerStatus>('status'))
    );
  }
}
