import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListComponent } from './player-list.component';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { of } from 'rxjs';

function createPlayers(): Player[] {
  return [
    new Player({
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
      ip: '1.2.3.4:48666',
    }),
  ];
}

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  beforeEach(async(() => {
    playerServiceSpy = jasmine.createSpyObj('playerServiceSpy', ['getPlayers']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
      ],
      providers: [{ provide: PlayerService, useValue: playerServiceSpy }],
      declarations: [PlayerListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    playerServiceSpy.getPlayers.and.returnValue(of(createPlayers()));

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
