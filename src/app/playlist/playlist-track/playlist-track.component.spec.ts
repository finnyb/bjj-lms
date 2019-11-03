import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTrackComponent } from './playlist-track.component';
import {
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';
import { PlaylistTrack } from '../playlist-track';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlaylistService } from '../playlist.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { Player } from '../../player/player';

@Component({ selector: 'app-playlist-track-actions', template: '' })
class AppPlaylistTrackActionsStubComponent {
  @Input()
  track: PlaylistTrack;
  @Input()
  player: Player;
  @Input()
  visible: boolean;
}

describe('PlaylistTrackComponent', () => {
  let component: PlaylistTrackComponent;
  let fixture: ComponentFixture<PlaylistTrackComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async(() => {
    playlistServiceSpy = jasmine.createSpyObj('playlistServiceSpy', [
      'deleteTrack',
      'playTrack',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PlaylistService, useValue: playlistServiceSpy }],
      declarations: [
        PlaylistTrackComponent,
        AppPlaylistTrackActionsStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistTrackComponent);
    component = fixture.componentInstance;
    const expectedTrack = new PlaylistTrack({
      playlistIndex: 0,
      name: 'Test Track',
      id: '1',
      year: '1990',
      artist: 'Test Artist',
      artistId: '1234',
      num: '1',
      album: 'Test Album',
      albumId: '54321',
      type: 'flac',
      bitrate: '320 kbps',
      coverId: '45678',
      genre: 'Rock',
      genreId: '9876',
    });

    component.track = expectedTrack;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
