import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescanComponent } from './rescan.component';
import { MatCardModule, MatListModule } from '@angular/material';
import { Component, Input } from '@angular/core';
import { RescanStep } from './rescan-progress';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-rescan-step', template: '' })
class AppRescanStepStubComponent {
  @Input() step: RescanStep;
  @Input() info: String;
}

describe('RescanComponent', () => {
  let component: RescanComponent;
  let fixture: ComponentFixture<RescanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppRescanStepStubComponent, RescanComponent],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatListModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
