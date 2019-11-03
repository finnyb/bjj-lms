import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescanStepComponent } from './rescan-step.component';
import {
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material';
import { RescanStep } from '../rescan-progress';

describe('RescanStepComponent', () => {
  let component: RescanStepComponent;
  let fixture: ComponentFixture<RescanStepComponent>;
  let step: RescanStep;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatListModule, MatProgressBarModule],
      declarations: [RescanStepComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescanStepComponent);
    component = fixture.componentInstance;

    step = new RescanStep('', '', 0);
    component.step = step;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
