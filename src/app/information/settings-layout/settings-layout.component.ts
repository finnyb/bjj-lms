import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../bread-crumbs/breadcrumb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent implements OnInit {
  crumbs: Breadcrumb[] = [
    {
      label: 'Settings',
      url: 'settings',
    },
  ];

  routerLinks = [
    {
      label: 'Players',
      link: 'players',
    },
    {
      label: 'Media Library',
      link: 'library',
    },
    {
      label: 'Database',
      link: 'database',
    },
  ];
  activeLink = this.routerLinks[0].link;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(
      res =>
        (this.activeLink = this.routerLinks.find(
          tab => tab.link === '.' + this.router.url
        ).link)
    );
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
