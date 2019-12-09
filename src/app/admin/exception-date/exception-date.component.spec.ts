import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionDateComponent } from './exception-date.component';

describe('ExceptionDateComponent', () => {
  let component: ExceptionDateComponent;
  let fixture: ComponentFixture<ExceptionDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
