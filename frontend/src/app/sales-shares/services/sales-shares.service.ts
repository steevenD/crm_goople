import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class SalesSharesService {

  constructor(private fb: FormBuilder) { }

  generateFormAddSale() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      contact_firstname: ['', [Validators.required, Validators.maxLength(25)]],
      contact_lastname: ['', [Validators.required, Validators.maxLength(25)]],
      amount_signed: ['', [Validators.pattern('"^[0-9]*$"')]],
      sale_source: ['', [Validators.required]],
      sale_state: ['', [Validators.required]],
      dt_next_action: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(255)]],
      sale_action_state: ['', [Validators.required]],

    });
  }

  initSaleStateTab(): any[] {
    return [
      { value: SALE_STATE.ABANDONMENT, label: 'SALE_STATE.ABANDONMENT KEY' },
      { value: SALE_STATE.FIRST_CONTACT, label: 'SALE_STATE.FIRST KEY' },
      { value: SALE_STATE.NEGOTIATION, label: 'SALE_STATE.NEGO KEY' },
      { value: SALE_STATE.PROPOSAL, label: 'SALE_STATE.PROP KEY' },
      { value: SALE_STATE.REFUSAL, label: 'SALE_STATE.REF KEY' },
      { value: SALE_STATE.REVIVAL, label: 'SALE_STATE.REVV KEY' },
      { value: SALE_STATE.WON, label: 'SALE_STATE.WON KEY' },
    ];
  }

  initSaleSourceTab(): any[] {
    return [
      { value: SALE_SOURCE.CANVASSING, label: 'SALE_SOURCE.CANVASSING KEY' },
      { value: SALE_SOURCE.INCOMING_CALL, label: 'SALE_SOURCE.INCOMING KEY' },
      { value: SALE_SOURCE.LOUNGE, label: 'SALE_SOURCE.LOUNG KEY' },
      { value: SALE_SOURCE.NETWORK, label: 'SALE_SOURCE.NET KEY' },
      { value: SALE_SOURCE.WORD_OF_MOUTH, label: 'SALE_SOURCE.WORD KEY' },
    ];
  }

  initSaleActionStateTab(): any[] {
    return [
      { value: SALE_ACTION_STATE.FINISH, label: 'SALE_ACTION_STATE.FINISH KEY' },
      { value: SALE_ACTION_STATE.IN_PROGRESS, label: 'SALE_ACTION_STATE.IN PRO KEY' },
      { value: SALE_ACTION_STATE.ON_BREAK, label: 'SALE_ACTION_STATE.ON BREAK KEY' },
      { value: SALE_ACTION_STATE.STOP, label: 'SALE_ACTION_STATE.STOP KEY' },
      { value: SALE_ACTION_STATE.TODO, label: 'SALE_ACTION_STATE.TODO KEY' },
    ];
  }




}
