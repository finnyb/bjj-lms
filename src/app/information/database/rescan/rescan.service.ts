import { Injectable } from '@angular/core';
import { RescanRequestService } from './rescan-request.service';
import { Observable } from 'rxjs';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../../../http-error-handler.service';
import { catchError, map } from 'rxjs/operators';
import {
  mapRescan,
  mapRescanProgress,
  RescanApiResponse,
} from './rescan-api-response';
import { RescanProgress } from './rescan-progress';

@Injectable({
  providedIn: 'root',
})
export class RescanService {
  private readonly handleError: HandleError;

  constructor(
    private service: RescanRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('RescanService');
  }

  rescan(): Observable<boolean> {
    return this.service.rescan().pipe(
      map((r: RescanApiResponse) => mapRescan(r)),
      catchError(this.handleError<boolean>('rescan request'))
    );
  }

  rescanProgress(): Observable<RescanProgress> {
    return this.service.rescanProgress().pipe(
      map((r: RescanApiResponse) => mapRescanProgress(r)),
      catchError(this.handleError<RescanProgress>('rescan progress request'))
    );
  }
}
