import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationDateComponent } from './vacation-date.component';

describe('VacationDateComponent', () => {
  let component: VacationDateComponent;
  let fixture: ComponentFixture<VacationDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
