import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeccionComponent } from './form-seccion.component';

describe('FormSeccionComponent', () => {
  let component: FormSeccionComponent;
  let fixture: ComponentFixture<FormSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
