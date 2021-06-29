import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JweleryDetailsComponent } from './jwelery-details.component';

describe('JweleryDetailsComponent', () => {
  let component: JweleryDetailsComponent;
  let fixture: ComponentFixture<JweleryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JweleryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JweleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
