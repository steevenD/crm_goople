import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSharesComponent } from './sales-shares.component';
import {SalesTabComponent} from '../../components/sales-tab/sales-tab.component';
import {MockComponent} from 'ng-mocks';

describe('SalesSharesComponent', () => {
  let component: SalesSharesComponent;
  let fixture: ComponentFixture<SalesSharesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSharesComponent, MockComponent(SalesTabComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
