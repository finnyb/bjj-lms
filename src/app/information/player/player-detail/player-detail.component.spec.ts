import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailComponent } from './player-detail.component';
import { MatTableModule } from '@angular/material';
import { Player } from '../../../player/player';

function createPlayer(): Player {
  return new Player({
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
  });
}

describe('PlayerDetailComponent', () => {
  let component: PlayerDetailComponent;
  let fixture: ComponentFixture<PlayerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [PlayerDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    component.player = createPlayer();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
