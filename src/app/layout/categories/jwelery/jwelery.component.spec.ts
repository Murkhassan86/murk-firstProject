import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JweleryComponent } from './jwelery.component';

describe('JweleryComponent', () => {
  let component: JweleryComponent;
  let fixture: ComponentFixture<JweleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JweleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JweleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
