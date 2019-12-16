import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTabComponent } from './row-tab.component';
import {MockComponent} from 'ng-mocks';
import {InputComponent} from '../../../shared/components/input/input.component';
import {BrowserModule} from '@angular/platform-browser';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {InfoService} from '../../../shared/services/info.service';
import {SalesSharesService} from '../../services/sales-shares.service';
import {SaleShare} from '../../models/SaleShare';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../../models/enums';
import {School} from '../../models/School';
import {salesSharesServiceMock} from '../../services/sales-shares.service.spec';

describe('RowTabComponent', () => {
  let component: RowTabComponent;
  let fixture: ComponentFixture<RowTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowTabComponent , MockComponent(InputComponent) ],
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
    const saleShareMock: SaleShare = {
      id: 1,
      dt_created: '28/02/2019',
      dt_update: '28/02/2019',
      amount_signed: 20000,
      dt_next_action: '28/02/2019',
      sale_state: SALE_STATE.WON,
      comment: 'comment ok cool',
      sale_source: SALE_SOURCE.WORD_OF_MOUTH,
      sale_action_state: SALE_ACTION_STATE.TODO,
      school: {
        name: 'MDS',
        contact_firstname: 'Jean',
        contact_lastname: 'Paul',
      },
    };
    fixture = TestBed.createComponent(RowTabComponent);
    component = fixture.componentInstance;
    component.saleShare = saleShareMock;

    component.form = new FormGroup({
      name: new FormControl(),
      contact_firstname: new FormControl(),
      contact_lastname: new FormControl(),
      amount_signed: new FormControl(),
      sale_source: new FormControl(),
      sale_state: new FormControl(),
      dt_next_action: new FormControl(),
      comment: new FormControl(),
      sale_action_state: new FormControl()

    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form', () => {
    component.initForm();
    expect(component.form.get('name').value).toEqual('MDS');
    expect(component.form.get('contact_firstname').value).toEqual('Jean');
    expect(component.form.get('contact_lastname').value).toEqual('Paul');
    expect(component.form.get('sale_action_state').value).toEqual(SALE_ACTION_STATE.TODO);
    expect(component.form.get('sale_source').value).toEqual(SALE_SOURCE.WORD_OF_MOUTH);
    expect(component.form.get('sale_state').value).toEqual(SALE_STATE.WON);
    expect(component.form.get('dt_next_action').value).toEqual('28/02/2019');
    expect(component.form.get('amount_signed').value).toEqual(20000);
    expect(component.form.get('comment').value).toEqual('comment ok cool');
  });
});
