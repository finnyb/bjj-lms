import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { ArtistRequestService } from './artist-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ArtistRequestService', () => {
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
    const service: ArtistRequestService = TestBed.get(ArtistRequestService);
    expect(service).toBeTruthy();
  });

  it('navigations', inject(
    [ArtistRequestService],
    (service: ArtistRequestService) => {
      service.navigations().subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["artists", "0", "100", "", "tags: Z"]]}'
      );
    }
  ));

  it('artist for navigations', inject(
    [ArtistRequestService],
    (service: ArtistRequestService) => {
      service.artists(5).subscribe(({}) => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["artists", "5", "100", "", "tags: s"]]}'
      );
    }
  ));

  it('artist by id', inject(
    [ArtistRequestService],
    (service: ArtistRequestService) => {
      service.artistById('123').subscribe(({}) => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["artists", "0", "100", "artist_id: 123", "tags: s"]]}'
      );
    }
  ));

  it('artist by year', inject(
    [ArtistRequestService],
    (service: ArtistRequestService) => {
      const year = '1990';
      service.artistByYear(year, 0).subscribe(({}) => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["artists", "0", "100", "year: ' +
          year +
          '", "tags: s"]]}'
      );
    }
  ));

  it('search', inject(
    [ArtistRequestService],
    (service: ArtistRequestService) => {
      service.search('Tool', 0).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["artists", "0", "100", "search: Tool", "tags: s"]]}'
      );
    }
  ));
});
