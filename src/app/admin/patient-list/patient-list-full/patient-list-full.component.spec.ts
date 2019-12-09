import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListFullComponent } from './patient-list-full.component';

describe('PatientListFullComponent', () => {
  let component: PatientListFullComponent;
  let fixture: ComponentFixture<PatientListFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientListFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
