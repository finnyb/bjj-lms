import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { PlayerService } from '../../player/player.service';
import { of } from 'rxjs';
import { Player } from '../../player/player';
import { Component, Input } from '@angular/core';
import {
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const MOCK_PLAYERS_RESPONSE: Player[] = [
  {
    id: '00:04:20:07:93:9b',
    name: 'player',
    seqNo: 1,
    canPoweroff: true,
    firmware: '7.8.0-r16754',
    isPlayer: true,
    displayType: 'graphic-320x32',
    isPlaying: true,
    connected: true,
    modelName: 'Squeezebox Touch',
    uuid: '584c879280617e4e0c1b4ff78af5a525',
    index: 1,
    power: false,
    model: 'Squeezebox Classic',
    ip: '1.2.3.5:48666',
  },
  {
    id: '00:04:20:07:93:9b',
    name: 'player',
    seqNo: 1,
    canPoweroff: true,
    firmware: '7.8.0-r16754',
    isPlayer: true,
    displayType: 'none',
    isPlaying: true,
    connected: true,
    modelName: 'Squeezebox classic',
    uuid: '',
    index: 2,
    power: false,
    model: 'Squeezebox Classic',
    ip: '1.2.3.4:48666',
  },
];

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

@Component({ selector: 'app-player-detail', template: '' })
class AppPlayerDetailStubComponent {
  @Input() player: Player;
}

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let playerService: jasmine.SpyObj<PlayerService>;

  beforeEach(async(() => {
    playerService = jasmine.createSpyObj('PlayerService', [
      'getPlayers',
      'tracks',
      'status',
    ]);
    // TODO perhaps move this and return players
    playerService.getPlayers.and.returnValue(of(MOCK_PLAYERS_RESPONSE));
    playerService.tracks.and.returnValue(of([]));
    playerService.status.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatTableModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppBreadCrumbsStubComponent,
        AppPlayerDetailStubComponent,
        PlayerComponent,
      ],
      providers: [
        {
          provide: PlayerService,
          useValue: playerService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
