import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPagesComponent } from './artist-pages.component';
import { MatPaginatorModule } from '@angular/material';

describe('ArtistPagesComponent', () => {
  let component: ArtistPagesComponent;
  let fixture: ComponentFixture<ArtistPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatPaginatorModule],
      declarations: [ArtistPagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
