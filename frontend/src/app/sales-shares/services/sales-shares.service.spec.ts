import { TestBed } from '@angular/core/testing';

import { SalesSharesService } from './sales-shares.service';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

export const salesSharesServiceMock = jasmine.createSpyObj('SalesSharesService',
  [
    'generateFormAddSale',
    'initSaleStateTab',
    'initSaleSourceTab',
    'initSaleActionStateTab',
    'transformSaleShareFormToSaleShare',
    'addSaleShare',
    'getAllSaleShare',
    'getAttachmentsBySaleID',
    'updateSale',
    'deleteSaleShare',
    'deleteAttachment'
  ]);

describe('SalesSharesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [
      BrowserModule,
      RouterModule.forRoot([]),
      FormsModule,
      HttpClientModule
    ],
    providers: [FormBuilder]
  }));

  it('should be created', () => {
    const service: SalesSharesService = TestBed.get(SalesSharesService);
    expect(service).toBeTruthy();
  });
});
