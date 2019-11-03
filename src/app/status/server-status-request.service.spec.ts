import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { ServerStatusRequestService } from './server-status-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ServerStatusRequestService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ServerStatusRequestService = TestBed.get(
      ServerStatusRequestService
    );
    expect(service).toBeTruthy();
  });

  it('server status', inject(
    [ServerStatusRequestService],
    (service: ServerStatusRequestService) => {
      service.status().subscribe();
      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["serverstatus", "0", "100", "", ""]]}'
      );
    }
  ));
});
