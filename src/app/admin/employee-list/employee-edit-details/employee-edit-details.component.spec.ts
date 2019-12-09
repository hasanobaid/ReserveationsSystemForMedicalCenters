import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditDetailsComponent } from './employee-edit-details.component';

describe('EmployeeEditDetailsComponent', () => {
  let component: EmployeeEditDetailsComponent;
  let fixture: ComponentFixture<EmployeeEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
