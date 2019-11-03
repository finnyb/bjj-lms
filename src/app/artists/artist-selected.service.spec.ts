import { TestBed } from '@angular/core/testing';

import { ArtistSelectedService } from './artist-selected.service';

describe('ArtistSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistSelectedService = TestBed.get(ArtistSelectedService);
    expect(service).toBeTruthy();
  });
});
