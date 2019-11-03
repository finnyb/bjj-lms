import { Component, Input, OnInit } from '@angular/core';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
})
export class BreadCrumbsComponent implements OnInit {
  @Input() crumbs: Breadcrumb[];

  public breadcrumbs: Breadcrumb[] = [];

  constructor() {}

  ngOnInit() {
    this.breadcrumbs = this.crumbs;
  }
}
