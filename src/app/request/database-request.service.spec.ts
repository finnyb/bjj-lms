import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { DatabaseRequestService } from './database-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('DatabaseRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatabaseRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DatabaseRequestService = TestBed.get(DatabaseRequestService);
    expect(service).toBeTruthy();
  });

  it('command', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.request('command').subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "0", "100", "", ""]]}'
      );
    }
  ));

  it('command', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.requestWithoutParameters('command').subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command"]]}'
      );
    }
  ));

  it('start', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.request('command', [], [], 123).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "123", "100", "", ""]]}'
      );
    }
  ));

  it('items per response', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.request('command', [], [], 123, 500).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "123", "500", "", ""]]}'
      );
    }
  ));

  it('single return tag', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.request('command', [], ['Z'], 123, 500).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "123", "500", "", "tags: Z"]]}'
      );
    }
  ));

  it('multiple return tags', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service
        .request('command', [], ['l', 'y', 't'], 123, 500)
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "123", "500", "", "tags: l,y,t"]]}'
      );
    }
  ));

  it('single tagged parameter', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service.request('command', ['search: Clapton']).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "0", "100", "search: Clapton", ""]]}'
      );
    }
  ));

  it('multiple tagged parameters', inject(
    [DatabaseRequestService],
    (service: DatabaseRequestService) => {
      service
        .request('command', ['artist_id:5383', 'sort:albumtrack'])
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["command", "0", "100", "artist_id:5383", "sort:albumtrack", ""]]}'
      );
    }
  ));
});
