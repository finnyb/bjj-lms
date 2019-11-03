import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsLayoutComponent } from './artists-layout.component';
import { Component, Input } from '@angular/core';
import {
  MatGridListModule,
  MatListModule,
  MatSidenavModule,
} from '@angular/material';
import { Navigation } from '../navigations/navigation';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Album } from '../album/album';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Track } from '../tracks/track';
import { ArtistResponse } from './artist-response';

@Component({ selector: 'app-artist-list', template: '' })
class AppArtistListCrumbsStubComponent {
  @Input() artistResponse: ArtistResponse;
}

@Component({ selector: 'app-artist-pages', template: '' })
class AppArtistPagesStubComponent {
  @Input() artistResponse: ArtistResponse;
}

@Component({ selector: 'app-artist-album-list', template: '' })
class AppArtistAlbumListCrumbsStubComponent {
  @Input() albums: Array<Album>;
  @Input() tracks: Array<Track>;
}

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

@Component({ selector: 'app-filter', template: '' })
class AppFilterStubComponent {}

@Component({ selector: 'app-navigations', template: '' })
class AppNavigationsStubComponent {
  @Input() navigations: Array<Navigation> = [];
}

describe('ArtistsLayoutComponent', () => {
  let component: ArtistsLayoutComponent;
  let fixture: ComponentFixture<ArtistsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatGridListModule,
        MatListModule,
        MatSidenavModule,
        NoopAnimationsModule,
      ],
      declarations: [
        ArtistsLayoutComponent,
        AppArtistPagesStubComponent,
        AppArtistAlbumListCrumbsStubComponent,
        AppArtistListCrumbsStubComponent,
        AppBreadCrumbsStubComponent,
        AppFilterStubComponent,
        AppNavigationsStubComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
