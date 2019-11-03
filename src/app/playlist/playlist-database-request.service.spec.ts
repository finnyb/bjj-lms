import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { PlaylistDatabaseRequestService } from './playlist-database-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('PlaylistDatabaseRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistDatabaseRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PlaylistDatabaseRequestService = TestBed.get(
      PlaylistDatabaseRequestService
    );
    expect(service).toBeTruthy();
  });

  it('add track', inject(
    [PlaylistDatabaseRequestService],
    (service: PlaylistDatabaseRequestService) => {
      service
        .request('add', '00:04:20:22:0a:90', ['track_id:85966'])
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlistcontrol", "cmd:add", "track_id:85966"]]}'
      );
    }
  ));
});
