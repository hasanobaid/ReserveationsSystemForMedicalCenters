import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientHistoryComponent } from './doctor-patient-history.component';

describe('DoctorPatientHistoryComponent', () => {
  let component: DoctorPatientHistoryComponent;
  let fixture: ComponentFixture<DoctorPatientHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPatientHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
