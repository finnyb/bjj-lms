import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCurrentComponent } from './playlist-current.component';
import { MatCardModule } from '@angular/material';

describe('PlaylistCurrentComponent', () => {
  let component: PlaylistCurrentComponent;
  let fixture: ComponentFixture<PlaylistCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [PlaylistCurrentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
