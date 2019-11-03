import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracksLayoutComponent } from './artist-tracks-layout.component';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

@Component({ selector: 'app-tracks', template: '' })
class AppTracksStubComponent {
  @Input() tracks;
}

describe('ArtistTracksLayoutComponent', () => {
  let component: ArtistTracksLayoutComponent;
  let fixture: ComponentFixture<ArtistTracksLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        ArtistTracksLayoutComponent,
        AppBreadCrumbsStubComponent,
        AppTracksStubComponent,
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
    fixture = TestBed.createComponent(ArtistTracksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
