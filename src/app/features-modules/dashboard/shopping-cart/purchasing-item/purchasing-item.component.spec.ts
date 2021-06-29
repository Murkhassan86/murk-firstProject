import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingItemComponent } from './purchasing-item.component';

describe('PurchasingItemComponent', () => {
  let component: PurchasingItemComponent;
  let fixture: ComponentFixture<PurchasingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
