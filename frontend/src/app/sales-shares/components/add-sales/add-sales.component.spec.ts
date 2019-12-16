import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesComponent } from './add-sales.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MockComponent} from 'ng-mocks';
import {InputComponent} from '../../../shared/components/input/input.component';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import {InfoService} from '../../../shared/services/info.service';
import {SalesSharesService} from '../../services/sales-shares.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddSalesComponent', () => {
  let component: AddSalesComponent;
  let fixture: ComponentFixture<AddSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesComponent, MockComponent(InputComponent) ],
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
    fixture = TestBed.createComponent(AddSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleClickDelete method', () => {
    component.attachments = ['att1', 'att2', 'att3'];
    expect(component.attachments.length).toEqual(3);
    component.handleClickDelete(1);
    expect(component.attachments.length).toEqual(2);
  });
});
