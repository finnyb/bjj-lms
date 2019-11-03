import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { RescanRequestService } from './rescan-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RescanRequestService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RescanRequestService],
    });

    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should be created', () => {
    const service: RescanRequestService = TestBed.get(RescanRequestService);
    expect(service).toBeTruthy();
  });

  it('rescan', inject(
    [RescanRequestService],
    (service: RescanRequestService) => {
      service.rescan().subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["rescan"]]}'
      );
    }
  ));

  it('rescan progress', inject(
    [RescanRequestService],
    (service: RescanRequestService) => {
      service.rescanProgress().subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["rescanprogress"]]}'
      );
    }
  ));
});
