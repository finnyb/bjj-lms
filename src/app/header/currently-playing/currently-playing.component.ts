import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.scss'],
})
export class CurrentlyPlayingComponent implements OnInit {
  @Input() value;
  @Input() name;

  constructor() {}

  ngOnInit() {}
}
