import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
      declarations: [TracksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
