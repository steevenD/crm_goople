import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTabComponent } from './row-tab.component';

describe('RowTabComponent', () => {
  let component: RowTabComponent;
  let fixture: ComponentFixture<RowTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
