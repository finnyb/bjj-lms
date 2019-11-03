import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtistComponent } from './add-artist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PlaylistService } from '../../playlist.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Artist } from '../../../artists/artist';

describe('AddArtistComponent', () => {
  let component: AddArtistComponent;
  let fixture: ComponentFixture<AddArtistComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async(() => {
    playlistServiceSpy = jasmine.createSpyObj('playlistServiceSpy', [
      'addArtist',
    ]);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PlaylistService, useValue: playlistServiceSpy }],
      declarations: [AddArtistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArtistComponent);
    component = fixture.componentInstance;
    component.artist = new Artist({
      id: '85965',
      name: '',
      index: '1',
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add', done => {
    playlistServiceSpy.addArtist.and.returnValue(of(1));
    const addButtonDe = fixture.debugElement.queryAll(By.css('button'));
    addButtonDe[0].triggerEventHandler('click', null);
    expect(playlistServiceSpy.addArtist).toHaveBeenCalled();
    done();
  });
});
