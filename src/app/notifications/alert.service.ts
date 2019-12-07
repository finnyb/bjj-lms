import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Alert, AlertType } from './alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();

  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  info(message: string, action: string) {
    this.alert(new Alert({ message, action, type: AlertType.Info }));
  }

  warn(message: string, action: string) {
    this.alert(new Alert({ message, action, type: AlertType.Warning }));
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }
}
