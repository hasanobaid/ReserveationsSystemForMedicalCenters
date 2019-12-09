import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateAppointmentComponent } from './patient-update-appointment.component';

describe('PatientUpdateAppointmentComponent', () => {
  let component: PatientUpdateAppointmentComponent;
  let fixture: ComponentFixture<PatientUpdateAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientUpdateAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
