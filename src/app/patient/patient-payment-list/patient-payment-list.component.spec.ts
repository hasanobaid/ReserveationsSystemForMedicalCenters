import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPaymentListComponent } from './patient-payment-list.component';

describe('PatientPaymentListComponent', () => {
  let component: PatientPaymentListComponent;
  let fixture: ComponentFixture<PatientPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
