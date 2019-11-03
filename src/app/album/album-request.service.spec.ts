import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { AlbumRequestService } from './album-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistRequestService } from '../artists/artist-request.service';

describe('AlbumRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AlbumRequestService = TestBed.get(AlbumRequestService);
    expect(service).toBeTruthy();
  });

  it('albums by artist', inject(
    [AlbumRequestService],
    (service: AlbumRequestService) => {
      const id = '1234';

      service.albumsByArtist(id).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["albums", "0", "100", "artist_id: ' +
          id +
          '", "tags: a,l,y,j,S"]]}'
      );
    }
  ));

  it('albums by year', inject(
    [AlbumRequestService],
    (service: AlbumRequestService) => {
      const id = '1990';

      service.albumsByYear(id).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["albums", "0", "100", "year: ' +
          id +
          '", "tags: a,l,y,j,S"]]}'
      );
    }
  ));
});
