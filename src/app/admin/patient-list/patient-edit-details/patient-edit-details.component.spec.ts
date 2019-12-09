import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditDetailsComponent } from './patient-edit-details.component';

describe('PatientEditDetailsComponent', () => {
  let component: PatientEditDetailsComponent;
  let fixture: ComponentFixture<PatientEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
