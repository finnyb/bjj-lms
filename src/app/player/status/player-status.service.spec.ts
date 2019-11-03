import { TestBed } from '@angular/core/testing';

import { PlayerStatusService } from './player-status.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlayerStatusService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  it('should be created', () => {
    const service: PlayerStatusService = TestBed.get(PlayerStatusService);
    expect(service).toBeTruthy();
  });
});
