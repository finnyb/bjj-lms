import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPlayerComponent } from './header-player.component';
import { MatCardModule, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderPlayerComponent', () => {
  let component: HeaderPlayerComponent;
  let fixture: ComponentFixture<HeaderPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPlayerComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatSnackBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
