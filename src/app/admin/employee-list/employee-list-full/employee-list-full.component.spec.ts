import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListFullComponent } from './employee-list-full.component';

describe('EmployeeListFullComponent', () => {
  let component: EmployeeListFullComponent;
  let fixture: ComponentFixture<EmployeeListFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
