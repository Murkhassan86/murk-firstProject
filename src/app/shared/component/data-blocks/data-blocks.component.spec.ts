import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBlocksComponent } from './data-blocks.component';

describe('DataBlocksComponent', () => {
  let component: DataBlocksComponent;
  let fixture: ComponentFixture<DataBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
