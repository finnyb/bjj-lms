import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListComponent } from './artist-list.component';
import { Component, Input } from '@angular/core';
import { Artist } from '../artist';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({ selector: 'app-artist', template: '' })
class AppArtistStubComponent {
  @Input() artist: Artist;
}

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let fixture: ComponentFixture<ArtistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScrollingModule],
      declarations: [ArtistListComponent, AppArtistStubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
