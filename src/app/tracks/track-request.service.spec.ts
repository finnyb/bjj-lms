import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { TrackRequestService } from './track-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TrackRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TrackRequestService = TestBed.get(TrackRequestService);
    expect(service).toBeTruthy();
  });

  it('tracks for album', inject(
    [TrackRequestService],
    (service: TrackRequestService) => {
      service.tracksForAlbum('6161').subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["tracks", "0", "100", "album_id: 6161", "sort:tracknum", "tags: t,a,e,l,y,r,o,J"]]}'
      );
    }
  ));

  it('tracks for artist', inject(
    [TrackRequestService],
    (service: TrackRequestService) => {
      service.tracksForArtist('5383').subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["tracks", "0", "9999", "artist_id: 5383", "sort:albumtrack", "tags: a,t,e,l,y,r,o,J"]]}'
      );
    }
  ));
});
