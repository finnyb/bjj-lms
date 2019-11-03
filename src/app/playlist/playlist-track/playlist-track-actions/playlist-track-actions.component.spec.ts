import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTrackActionsComponent } from './playlist-track-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PlaylistService } from '../../playlist.service';
import { PlaylistTrack } from '../../playlist-track';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const testTrack = new PlaylistTrack({
  playlistIndex: 5,
  id: '85966',
  name: '',
  year: '0',
  coverId: '',
  bitrate: '',
  type: '',
  album: '',
  albumId: '',
  artist: '',
  artistId: '',
  genre: '',
  genreId: '',
  num: '',
});

describe('PlaylistTrackActionsComponent', () => {
  let component: PlaylistTrackActionsComponent;
  let fixture: ComponentFixture<PlaylistTrackActionsComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async(() => {
    playlistServiceSpy = jasmine.createSpyObj('playlistServiceSpy', [
      'deleteTrack',
      'playTrack',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PlaylistService, useValue: playlistServiceSpy }],
      declarations: [PlaylistTrackActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTrackActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.track = testTrack;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete', done => {
    playlistServiceSpy.deleteTrack.and.returnValue(of(1));
    const deleteButtonDe = fixture.debugElement.queryAll(By.css('button'));
    deleteButtonDe[3].triggerEventHandler('click', null);
    expect(playlistServiceSpy.deleteTrack).toHaveBeenCalled();
    done();
  });

  it('play track', done => {
    playlistServiceSpy.playTrack.and.returnValue(of(true));
    const deleteButtonDe = fixture.debugElement.queryAll(By.css('button'));
    deleteButtonDe[0].triggerEventHandler('click', null);
    expect(playlistServiceSpy.playTrack).toHaveBeenCalled();
    done();
  });
});
