import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumComponent } from './add-album.component';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PlaylistService } from '../../playlist.service';
import { Album } from '../../../album/album';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddAlbumComponent', () => {
  let component: AddAlbumComponent;
  let fixture: ComponentFixture<AddAlbumComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async(() => {
    playlistServiceSpy = jasmine.createSpyObj('playlistServiceSpy', [
      'addAlbum',
    ]);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PlaylistService, useValue: playlistServiceSpy }],
      declarations: [AddAlbumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAlbumComponent);
    component = fixture.componentInstance;
    component.album = new Album({
      id: '85965',
      name: '',
      artworkTrackId: '',
      artistId: '123',
      artist: 'name',
      year: '0',
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add', done => {
    playlistServiceSpy.addAlbum.and.returnValue(of(1));
    const addButtonDe = fixture.debugElement.queryAll(By.css('button'));
    addButtonDe[0].triggerEventHandler('click', null);
    expect(playlistServiceSpy.addAlbum).toHaveBeenCalled();
    done();
  });
});
