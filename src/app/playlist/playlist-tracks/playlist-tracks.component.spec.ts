import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTracksComponent } from './playlist-tracks.component';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({ selector: 'app-playlist-track', template: '' })
class AppPlaylistTracksStubComponent {
  @Input() track;
  @Input() player;
  @Input() playing: boolean;
}

describe('PlaylistTracksComponent', () => {
  let component: PlaylistTracksComponent;
  let fixture: ComponentFixture<PlaylistTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatListModule, ScrollingModule],
      declarations: [PlaylistTracksComponent, AppPlaylistTracksStubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
