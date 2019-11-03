import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from '../player/player.service';
import { of } from 'rxjs';
import { Player } from '../player/player';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { SecondsToTimePipe } from '../tracks/seconds-to-time.pipe';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import Spy = jasmine.Spy;

const MOCK_PLAYERS: Player[] = [
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

@Component({ selector: 'app-header-player', template: '' })
class AppHeaderPlayerStubComponent {
  @Input() player: Player;
}

@Component({ selector: 'app-volume', template: '' })
class AppVolumeStubComponent {
  @Input() volume: number;
  @Input() player: Player;
  @Input() muted: boolean;
}

@Component({ selector: 'app-player-list', template: '' })
class AppPlayerListStubComponent {}

@Component({ selector: 'app-currently-playing', template: '' })
class AppCurrentlyPlayingStubComponent {
  @Input() value: number;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let playerService: jasmine.SpyObj<PlayerService>;
  let playerServiceSpy: Spy;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    playerService = jasmine.createSpyObj('playerServiceSpy', ['getPlayers']);
    playerServiceSpy = playerService.getPlayers.and.returnValue(
      of(MOCK_PLAYERS)
    );
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatToolbarModule,
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [
        HeaderComponent,
        AppCurrentlyPlayingStubComponent,
        AppHeaderPlayerStubComponent,
        AppVolumeStubComponent,
        AppPlayerListStubComponent,
        SecondsToTimePipe,
      ],
      providers: [{ provide: PlayerService, useValue: playerService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
