import { Component, Input, OnInit } from '@angular/core';
import { Navigation } from './navigation';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss'],
})
export class NavigationsComponent implements OnInit {
  @Input() navigations: Array<Navigation> = [];

  constructor() {}

  ngOnInit() {}
}
