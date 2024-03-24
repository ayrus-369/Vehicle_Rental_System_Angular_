import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPaymentsComponent } from './display-payments.component';

describe('DisplayPaymentsComponent', () => {
  let component: DisplayPaymentsComponent;
  let fixture: ComponentFixture<DisplayPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
