import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReturnedCarsComponent } from './un-returned-cars.component';

describe('UnReturnedCarsComponent', () => {
  let component: UnReturnedCarsComponent;
  let fixture: ComponentFixture<UnReturnedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnReturnedCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnReturnedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
