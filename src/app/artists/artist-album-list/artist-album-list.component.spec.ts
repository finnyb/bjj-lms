import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumListComponent } from './artist-album-list.component';
import { AlbumService } from '../../album/album.service';
import {
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
} from '@angular/material';
import { Component, Input } from '@angular/core';
import { Track } from '../../tracks/track';
import { Album } from '../../album/album';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({ selector: 'app-artist-album-tracks', template: '' })
class AppArtistAlbumTracksStubComponent {
  @Input() tracks: Array<Track> = [];
}

@Component({ selector: 'app-add-album', template: '' })
class AppAddAlbumStubComponent {
  @Input() album: Album;
}

describe('ArtistAlbumListComponent', () => {
  let component: ArtistAlbumListComponent;
  let fixture: ComponentFixture<ArtistAlbumListComponent>;
  let albumService: jasmine.SpyObj<AlbumService>;

  beforeEach(async(() => {
    albumService = jasmine.createSpyObj('AlbumService', ['albumsByArtistId']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        ScrollingModule,
      ],
      declarations: [
        ArtistAlbumListComponent,
        AppAddAlbumStubComponent,
        AppArtistAlbumTracksStubComponent,
      ],
      providers: [
        {
          provide: AlbumService,
          useValue: albumService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
