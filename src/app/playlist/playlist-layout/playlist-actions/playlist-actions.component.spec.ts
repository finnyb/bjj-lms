import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistActionsComponent } from './playlist-actions.component';
import { MatCardModule } from '@angular/material';
import { Component } from '@angular/core';

@Component({ selector: 'app-clear', template: '' })
class AppClearStubComponent {}

describe('PlaylistActionsComponent', () => {
  let component: PlaylistActionsComponent;
  let fixture: ComponentFixture<PlaylistActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [AppClearStubComponent, PlaylistActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
