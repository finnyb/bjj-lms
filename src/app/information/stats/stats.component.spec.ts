import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatCardModule, MatTableModule } from '@angular/material';
import { of } from 'rxjs';
import { SecondsToTimePipe } from '../../tracks/seconds-to-time.pipe';
import { ServerStatusService } from '../../status/server-status.service';
import { ServerStatus } from '../../status/server-status';

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let statService: jasmine.SpyObj<ServerStatusService>;

  beforeEach(async(() => {
    statService = jasmine.createSpyObj('ServerStatusService', ['status']);
    statService.status.and.returnValue(
      of(
        new ServerStatus({
          lastScan: 0,
          mac: 'mac',
          playerCount: 1,
          uuid: 'uuid',
          version: 'version',
          totalAlbums: 0,
          totalArtists: 0,
          totalDuration: 0,
          totalGenres: 0,
          totalSongs: 0,
        })
      )
    );
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule, MatTableModule],
      declarations: [
        StatsComponent,
        AppBreadCrumbsStubComponent,
        SecondsToTimePipe,
      ],
      providers: [
        {
          provide: ServerStatusService,
          useValue: statService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
