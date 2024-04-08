import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PectComponent } from './pect.component';

describe('PectComponent', () => {
  let component: PectComponent;
  let fixture: ComponentFixture<PectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PectComponent]
    });
    fixture = TestBed.createComponent(PectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
