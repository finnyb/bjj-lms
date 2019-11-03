import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearComponent } from './clear.component';
import { PlaylistService } from '../../playlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ClearComponent', () => {
  let component: ClearComponent;
  let fixture: ComponentFixture<ClearComponent>;
  let playlistServiceSpy: jasmine.SpyObj<PlaylistService>;

  beforeEach(async(() => {
    playlistServiceSpy = jasmine.createSpyObj('playlistServiceSpy', ['clear']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: PlaylistService, useValue: playlistServiceSpy }],
      declarations: [ClearComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clear', done => {
    playlistServiceSpy.clear.and.returnValue(of(1));
    const addButtonDe = fixture.debugElement.queryAll(By.css('button'));
    addButtonDe[0].triggerEventHandler('click', null);
    expect(playlistServiceSpy.clear).toHaveBeenCalled();
    done();
  });
});
