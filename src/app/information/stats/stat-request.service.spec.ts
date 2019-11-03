import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { StatEnum, StatRequestService } from './stat-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('StatRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: StatRequestService = TestBed.get(StatRequestService);
    expect(service).toBeTruthy();
  });

  it('artists', inject([StatRequestService], (service: StatRequestService) => {
    service.request(StatEnum.Artists).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["info", "total", "artists", "?"]]}'
    );
  }));

  it('albums', inject([StatRequestService], (service: StatRequestService) => {
    service.request(StatEnum.Albums).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["info", "total", "albums", "?"]]}'
    );
  }));

  it('genres', inject([StatRequestService], (service: StatRequestService) => {
    service.request(StatEnum.Genres).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["info", "total", "genres", "?"]]}'
    );
  }));

  it('tracks', inject([StatRequestService], (service: StatRequestService) => {
    service.request(StatEnum.Tracks).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["info", "total", "songs", "?"]]}'
    );
  }));

  it('duration', inject([StatRequestService], (service: StatRequestService) => {
    service.request(StatEnum.Playtime).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["info", "total", "duration", "?"]]}'
    );
  }));
});
