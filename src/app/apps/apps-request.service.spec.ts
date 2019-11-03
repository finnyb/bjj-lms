import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { AppsRequestService } from './apps-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AppsRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppsRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AppsRequestService = TestBed.get(AppsRequestService);
    expect(service).toBeTruthy();
  });

  it('apps', inject([AppsRequestService], (service: AppsRequestService) => {
    service.apps().subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["-", ["apps", "0", "100", "", ""]]}'
    );
  }));
});
