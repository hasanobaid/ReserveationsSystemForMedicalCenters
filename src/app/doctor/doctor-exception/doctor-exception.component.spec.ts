import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorExceptionComponent } from './doctor-exception.component';

describe('DoctorExceptionComponent', () => {
  let component: DoctorExceptionComponent;
  let fixture: ComponentFixture<DoctorExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
