import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicListFullComponent } from './clinic-list-full.component';

describe('ClinicListFullComponent', () => {
  let component: ClinicListFullComponent;
  let fixture: ComponentFixture<ClinicListFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicListFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicListFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
