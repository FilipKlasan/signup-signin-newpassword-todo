import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyRegisteredComponent } from './successfully-registered.component';

describe('SuccessfullyRegisteredComponent', () => {
  let component: SuccessfullyRegisteredComponent;
  let fixture: ComponentFixture<SuccessfullyRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullyRegisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullyRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
