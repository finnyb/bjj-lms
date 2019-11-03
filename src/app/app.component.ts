import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { PlayerStatusService } from './player/status/player-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bjj-lms';

  constructor(private statusService: PlayerStatusService) {}

  ngOnInit(): void {
    this.startPolling();
  }

  private startPolling(interval: number = 1000): void {
    timer(0, interval).subscribe(val => {
      this.statusService.checkStatus();
      return val;
    });
  }
}
