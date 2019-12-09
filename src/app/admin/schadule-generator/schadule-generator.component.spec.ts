import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchaduleGeneratorComponent } from './schadule-generator.component';

describe('SchaduleGeneratorComponent', () => {
  let component: SchaduleGeneratorComponent;
  let fixture: ComponentFixture<SchaduleGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchaduleGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchaduleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
