import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNurserymanComponent } from './order-nurseryman.component';

describe('OrderNurserymanComponent', () => {
  let component: OrderNurserymanComponent;
  let fixture: ComponentFixture<OrderNurserymanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderNurserymanComponent]
    });
    fixture = TestBed.createComponent(OrderNurserymanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
