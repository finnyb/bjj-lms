import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { MatSnackBar } from '@angular/material';
import { Alert } from '../alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(private service: AlertService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.service.onAlert().subscribe(alert => this.showAlert(alert));
  }

  private showAlert(alert: Alert): void {
    this.snackBar.open(alert.message, alert.action);
  }
}
