import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbsComponent } from './bread-crumbs.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadCrumbsComponent', () => {
  let component: BreadCrumbsComponent;
  let fixture: ComponentFixture<BreadCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadCrumbsComponent],
      imports: [MatIconModule, MatToolbarModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
