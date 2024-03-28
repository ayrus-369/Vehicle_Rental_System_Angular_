import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedCarsComponent } from './deactivated-cars.component';

describe('DeactivatedCarsComponent', () => {
  let component: DeactivatedCarsComponent;
  let fixture: ComponentFixture<DeactivatedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactivatedCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeactivatedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
