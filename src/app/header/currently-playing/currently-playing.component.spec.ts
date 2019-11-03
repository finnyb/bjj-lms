import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyPlayingComponent } from './currently-playing.component';
import { MatProgressBarModule } from '@angular/material';

describe('CurrentlyPlayingComponent', () => {
  let component: CurrentlyPlayingComponent;
  let fixture: ComponentFixture<CurrentlyPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressBarModule],
      declarations: [CurrentlyPlayingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlyPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
