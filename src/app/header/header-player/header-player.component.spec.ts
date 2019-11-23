import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPlayerComponent } from './header-player.component';
import { MatCardModule, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '../../notifications/alert.service';
import { Player } from '../../player/player';
import { PlayerService } from '../../player/player.service';
import { of } from 'rxjs';

function createPlayer(): Player {
  return new Player({
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
  });
}

describe('HeaderPlayerComponent', () => {
  let component: HeaderPlayerComponent;
  let fixture: ComponentFixture<HeaderPlayerComponent>;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(async(() => {
    alertServiceSpy = jasmine.createSpyObj('alertServiceSpy', ['info']);

    playerServiceSpy = jasmine.createSpyObj('playerServiceSpy', [
      'pause',
      'play',
      'stop',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeaderPlayerComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatSnackBarModule],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: PlayerService, useValue: playerServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.player = createPlayer();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('play', () => {
    playerServiceSpy.play.and.returnValue(of(true));
    component.play();
    expect(alertServiceSpy.info).toHaveBeenCalledWith('player', 'started');
  });

  it('paused', () => {
    playerServiceSpy.pause.and.returnValue(of(true));
    component.pause();
    expect(alertServiceSpy.info).toHaveBeenCalledWith('player', 'paused');
  });

  it('stopped', () => {
    playerServiceSpy.stop.and.returnValue(of(true));
    component.stop();
    expect(alertServiceSpy.info).toHaveBeenCalledWith('player', 'stopped');
  });
});
