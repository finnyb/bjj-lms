import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {
  @Input() player: Player;
  @Input() muted: boolean;
  @Input() volume: number;

  readonly step = 5.0;

  constructor(private service: PlayerService) {}

  ngOnInit() {}

  down() {
    this.service
      .volume(this.player, this.volume - this.step)
      .subscribe(v => (this.volume = v));
  }

  up() {
    this.service
      .volume(this.player, this.volume + this.step)
      .subscribe(v => (this.volume = v));
  }

  mute() {
    this.service.mute(this.player).subscribe(m => (this.muted = m));
  }

  onInputChange($event: MatSliderChange) {
    this.service.volume(this.player, $event.value).subscribe();
  }
}
