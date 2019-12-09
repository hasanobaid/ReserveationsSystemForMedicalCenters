import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVacationComponent } from './doctor-vacation.component';

describe('DoctorVacationComponent', () => {
  let component: DoctorVacationComponent;
  let fixture: ComponentFixture<DoctorVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
