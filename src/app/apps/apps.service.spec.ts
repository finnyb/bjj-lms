import { TestBed } from '@angular/core/testing';

import { AppsService } from './apps.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppsRequestService } from './apps-request.service';

describe('AppsService', () => {
  let service: AppsService;
  let appRequestSpy: jasmine.SpyObj<AppsRequestService>;

  beforeEach(() => {
    appRequestSpy = jasmine.createSpyObj('appRequestSpy', ['apps']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppsRequestService, useValue: appRequestSpy }],
    });
    service = TestBed.get(AppsService);
  });

  it('types', done => {
    appRequestSpy.apps.and.returnValue(of(require('./test-data/apps.json')));
    service.apps().subscribe(a => {
      const app = a.apps[0];
      expect(typeof app.name).toBe('string');
      expect(typeof app.icon).toBe('string');
      expect(typeof app.weight).toBe('number');
      expect(typeof app.type).toBe('string');
      expect(typeof app.command).toBe('string');
      done();
    });
  });

  it('apps', done => {
    appRequestSpy.apps.and.returnValue(of(require('./test-data/apps.json')));
    service.apps().subscribe(a => {
      expect(a.count).toBe(15);
      expect(a.apps[0].name).toBe('Spotty');
      expect(a.apps[0].icon).toBe(
        'plugins/Spotty/html/images/93aac68fb06348598c1e67734dfaceee.png'
      );
      expect(a.apps[0].weight).toBe(1);
      expect(a.apps[0].type).toBe('xmlbrowser');
      expect(a.apps[0].command).toBe('spotty');
      done();
    });
  });
});
