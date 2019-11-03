import { TestBed } from '@angular/core/testing';

import { PlaylistListService } from './playlist-list.service';

describe('PlaylistListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistListService = TestBed.get(PlaylistListService);
    expect(service).toBeTruthy();
  });
});
