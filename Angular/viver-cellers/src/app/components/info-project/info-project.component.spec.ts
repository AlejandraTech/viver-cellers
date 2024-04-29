import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProjectComponent } from './info-project.component';

describe('InfoProjectComponent', () => {
  let component: InfoProjectComponent;
  let fixture: ComponentFixture<InfoProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProjectComponent]
    });
    fixture = TestBed.createComponent(InfoProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
