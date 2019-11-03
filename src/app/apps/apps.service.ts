import { Injectable } from '@angular/core';
import {
  HandleError,
  HttpErrorHandlerService,
} from '../http-error-handler.service';
import { AppsRequestService } from './apps-request.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { App } from './app';
import { AppApiResponse, mapApps } from './app-api-response';
import { AppResponse } from './app-response';

@Injectable({
  providedIn: 'root',
})
export class AppsService {
  private readonly handleError: HandleError;

  constructor(
    private service: AppsRequestService,
    private errorService: HttpErrorHandlerService
  ) {
    this.handleError = errorService.createHandleError('AppsService');
  }

  apps(): Observable<AppResponse> {
    return this.service
      .apps()
      .pipe(
        map(
          (r: AppApiResponse) => mapApps(r),
          catchError(this.handleError<App>('apps'))
        )
      );
  }
}
