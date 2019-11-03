import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistComponent } from './artist.component';
import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import { Artist } from '../artist';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { ArtistNamePipe } from './artist-name.pipe';

@Component({ selector: 'app-add-artist', template: '' })
class AppAddArtistStubComponent {
  @Input() artist: Artist;
}

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule,
      ],
      declarations: [
        ArtistNamePipe,
        AppAddArtistStubComponent,
        ArtistComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;

    const expectedArtist = new Artist({
      name: 'Bill',
      index: 'B',
      id: '1',
    });

    component.artist = expectedArtist;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
