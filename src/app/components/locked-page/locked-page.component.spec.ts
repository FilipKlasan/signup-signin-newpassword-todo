import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedPageComponent } from './locked-page.component';

describe('LockedPageComponent', () => {
  let component: LockedPageComponent;
  let fixture: ComponentFixture<LockedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
