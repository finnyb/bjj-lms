import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../player/player';

export interface PlayerDetail {
  name: String;
  value: String;
}

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  @Input()
  player: Player;

  displayedColumns: string[] = ['name', 'value'];

  constructor() {}

  ngOnInit() {}

  playerDetails(player: Player): Array<PlayerDetail> {
    return [
      { name: 'IP', value: player.ip },
      { name: 'Playing', value: player.isPlaying ? 'Yes' : 'No' },
      { name: 'Connected', value: player.connected ? 'Yes' : 'No' },
      { name: 'Powered', value: player.power ? 'Yes' : 'No' },
      { name: 'Model', value: player.model },
      { name: 'Model Name', value: player.modelName },
      { name: 'UUID', value: player.uuid },
      { name: 'Sequence', value: player.seqNo.toString() },
      { name: 'Firmware', value: player.firmware },
      { name: 'Display Type', value: player.displayType },
    ];
  }
}
