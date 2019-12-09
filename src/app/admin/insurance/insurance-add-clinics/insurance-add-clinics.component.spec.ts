import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAddClinicsComponent } from './insurance-add-clinics.component';

describe('InsuranceAddClinicsComponent', () => {
  let component: InsuranceAddClinicsComponent;
  let fixture: ComponentFixture<InsuranceAddClinicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceAddClinicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceAddClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
