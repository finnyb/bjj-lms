import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeComponent } from './volume.component';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VolumeComponent', () => {
  let component: VolumeComponent;
  let fixture: ComponentFixture<VolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeComponent],
      imports: [HttpClientTestingModule, MatSliderModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
