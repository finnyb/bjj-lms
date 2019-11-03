import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumTracksComponent } from './artist-album-tracks.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { Track } from '../../../tracks/track';

@Component({ selector: 'app-add-track', template: '' })
class AppArtistAlbumTracksStubComponent {
  @Input() track: Track;
}

describe('ArtistAlbumTracksComponent', () => {
  let component: ArtistAlbumTracksComponent;
  let fixture: ComponentFixture<ArtistAlbumTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatTableModule],
      declarations: [
        ArtistAlbumTracksComponent,
        AppArtistAlbumTracksStubComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
