import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootWearDetailsComponent } from './foot-wear-details.component';

describe('FootWearDetailsComponent', () => {
  let component: FootWearDetailsComponent;
  let fixture: ComponentFixture<FootWearDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootWearDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootWearDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
