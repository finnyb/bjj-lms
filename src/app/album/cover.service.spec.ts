import { TestBed } from '@angular/core/testing';

import { CoverService } from './cover.service';

describe('CoverService', () => {
  let service: CoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('cover url', function() {
    expect(service.coverUrl('1234')).toEqual('/music/1234/cover.jpg');
  });

  it('thumbnail url 50px', function() {
    expect(service.thumbnailUrl50px('1234')).toEqual(
      '/music/1234/cover_50x50_o'
    );
  });

  it('thumbnail url 100px', function() {
    expect(service.thumbnailUrl100px('1234')).toEqual(
      '/music/1234/cover_100x100_o'
    );
  });

  it('thumbnail url 250px', function() {
    expect(service.thumbnailUrl250px('1234')).toEqual(
      '/music/1234/cover_250x250_o'
    );
  });

  it('current cover', function() {
    const playerId = '00:04:20:22:0a:90';
    expect(service.currentlyPlayingCover(playerId)).toEqual(
      '/music/current/cover.jpg?player=' + playerId
    );
  });
});
