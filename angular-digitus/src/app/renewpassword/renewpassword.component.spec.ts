import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewpasswordComponent } from './renewpassword.component';

describe('RenewpasswordComponent', () => {
  let component: RenewpasswordComponent;
  let fixture: ComponentFixture<RenewpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
