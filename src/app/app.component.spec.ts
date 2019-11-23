import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({ selector: 'app-header', template: '' })
class AppHeaderStubComponent {}

@Component({ selector: 'app-sidebar', template: '' })
class AppSidebarStubComponent {}

@Component({ selector: 'app-alert', template: '' })
class AppAlertStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        AppComponent,
        AppAlertStubComponent,
        AppHeaderStubComponent,
        AppSidebarStubComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
