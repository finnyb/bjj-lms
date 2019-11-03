import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackComponent } from './add-track.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule, MatSnackBarModule } from '@angular/material';

describe('AddTrackComponent', () => {
  let component: AddTrackComponent;
  let fixture: ComponentFixture<AddTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatSnackBarModule],
      declarations: [AddTrackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
