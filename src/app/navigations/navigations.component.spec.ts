import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationsComponent } from './navigations.component';
import { Component, Input } from '@angular/core';
import { Navigation } from './navigation';
import { MatButtonToggleModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-navigation', template: '' })
class AppNavigationStubComponent {
  @Input() navigation: Navigation;
}

describe('NavigationsComponent', () => {
  let component: NavigationsComponent;
  let fixture: ComponentFixture<NavigationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule, RouterTestingModule],
      declarations: [NavigationsComponent, AppNavigationStubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
