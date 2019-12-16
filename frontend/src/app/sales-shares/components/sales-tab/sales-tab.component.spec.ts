import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTabComponent } from './sales-tab.component';
import {MockComponent} from 'ng-mocks';
import {BrowserModule} from '@angular/platform-browser';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {InfoService} from '../../../shared/services/info.service';
import {SalesSharesService} from '../../services/sales-shares.service';
import {RowTabComponent} from '../row-tab/row-tab.component';
import {AddSalesComponent} from '../add-sales/add-sales.component';

describe('SalesTabComponent', () => {
  let component: SalesTabComponent;
  let fixture: ComponentFixture<SalesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTabComponent, MockComponent(RowTabComponent), MockComponent(AddSalesComponent) ],
      imports: [
        BrowserModule,
        MDBBootstrapModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ModalModule.forRoot(),
      ],
      providers: [InfoService, SalesSharesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display alert is true', () => {
    component.handleDisplayAlert(true);
    expect(component.displayAlert).toBeTruthy();
  });
});
