import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLayoutComponent } from './playlist-layout.component';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlaylistTrack } from '../playlist-track';
import { MatPaginatorModule } from '@angular/material';

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

@Component({ selector: 'app-playlist-current', template: '' })
class AppPlaylistCurrentStubComponent {
  @Input() track;
  @Input() coverUrl;
}

@Component({ selector: 'app-playlist-actions', template: '' })
class AppPlaylistActionstStubComponent {
  @Input() track;
  @Input() coverUrl;
}

@Component({ selector: 'app-playlist-tracks', template: '' })
class AppPlaylistTracksStubComponent {
  @Input() currentTrack: PlaylistTrack;
  @Input() playing: boolean;
  @Input() player;
}

describe('PlaylistLayoutComponent', () => {
  let component: PlaylistLayoutComponent;
  let fixture: ComponentFixture<PlaylistLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatPaginatorModule],
      declarations: [
        PlaylistLayoutComponent,
        AppBreadCrumbsStubComponent,
        AppPlaylistActionstStubComponent,
        AppPlaylistCurrentStubComponent,
        AppPlaylistTracksStubComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
