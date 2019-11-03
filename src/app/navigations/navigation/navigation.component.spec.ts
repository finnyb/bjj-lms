import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { Navigation } from '../navigation';
import { MatButtonToggleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let expectedNavigation: Navigation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule, RouterModule, RouterTestingModule],
      declarations: [NavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    expectedNavigation = new Navigation({
      index: 'A',
      start: 2,
      count: 5,
      url: '/url',
    });

    component.navigation = expectedNavigation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
