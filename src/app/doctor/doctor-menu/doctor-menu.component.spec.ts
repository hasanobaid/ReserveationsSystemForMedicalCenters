import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMenuComponent } from './doctor-menu.component';

describe('DoctorMenuComponent', () => {
  let component: DoctorMenuComponent;
  let fixture: ComponentFixture<DoctorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
