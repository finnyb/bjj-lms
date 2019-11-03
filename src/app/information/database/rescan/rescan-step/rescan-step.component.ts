import { Component, Input, OnInit } from '@angular/core';
import { RescanStep } from '../rescan-progress';

@Component({
  selector: 'app-rescan-step',
  templateUrl: './rescan-step.component.html',
  styleUrls: ['./rescan-step.component.scss'],
})
export class RescanStepComponent implements OnInit {
  @Input() step: RescanStep;
  @Input() info: String;

  constructor() {}

  ngOnInit() {}
}
