import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Navigation } from '../navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() navigation: Navigation;
  @Output() loadIndex = new EventEmitter<Navigation>();

  constructor() {}

  ngOnInit() {}

  navClicked() {
    this.loadIndex.emit(this.navigation);
  }
}
