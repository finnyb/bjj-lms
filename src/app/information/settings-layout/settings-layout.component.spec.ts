import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLayoutComponent } from './settings-layout.component';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-bread-crumbs', template: '' })
class AppBreadCrumbsStubComponent {
  @Input() crumbs;
}

@Component({ selector: 'app-rescan', template: '' })
class AppRescanStubComponent {}

@Component({ selector: 'app-player', template: '' })
class AppPlayerStubComponent {}

describe('SettingsLayoutComponent', () => {
  let component: SettingsLayoutComponent;
  let fixture: ComponentFixture<SettingsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppBreadCrumbsStubComponent,
        AppPlayerStubComponent,
        AppRescanStubComponent,
        SettingsLayoutComponent,
      ],
      imports: [MatTabsModule, NoopAnimationsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
