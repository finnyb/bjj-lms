import { Component, OnInit } from '@angular/core';
import { PlayerStatusService } from '../../../player/status/player-status.service';
import { RescanService } from './rescan.service';
import { RescanProgress, RescanStep } from './rescan-progress';
import { PlayerStatus } from '../../../player/status/player-status';
import { Subject, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-rescan',
  templateUrl: './rescan.component.html',
  styleUrls: ['./rescan.component.scss'],
})
export class RescanComponent implements OnInit {
  private progress: RescanProgress;
  private steps = new Array<RescanStep>();
  private rescanning = false;
  private statusSource = new Subject<PlayerStatus>();

  scanned: boolean;
  statusSubscription: Subscription;
  statusSource$ = this.statusSource.asObservable();

  private subscription: Subscription;

  constructor(
    private statusService: PlayerStatusService,
    private progressService: RescanService
  ) {}

  ngOnInit() {
    this.statusSubscription = this.statusService.statusSource$.subscribe(s =>
      this.checkStatus(s)
    );
  }

  private completeSteps() {
    this.steps.forEach(s => (s.percentage = 100));
  }

  private replaceSteps(r: RescanStep): void {
    const index = this.steps.findIndex(o => o.id === r.id);
    if (index > -1) {
      this.steps.splice(index, 1);
    }
    this.steps.push(r);
  }

  private processStatus(p: RescanProgress) {
    this.progress = p;
    p.steps.forEach(r => this.replaceSteps(r));
  }

  private checkStatus(status: PlayerStatus): void {
    if (this.rescanning !== status.rescanning) {
      this.rescanning = status.rescanning;
      if (this.rescanning) {
        this.steps = new Array<RescanStep>();
        this.scanned = true;
        this.startPolling();
      } else {
        this.completeSteps();
        this.subscription.unsubscribe();
      }
    }
  }

  public checkScanStatus(): void {
    this.progressService.rescanProgress().subscribe(r => this.processStatus(r));
  }

  private startPolling(interval: number = 5000): void {
    this.subscription = timer(0, interval).subscribe(val => {
      this.checkScanStatus();
      return val;
    });
  }
}
