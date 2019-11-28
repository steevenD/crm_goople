import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../models/enums';
import {HttpClient} from '@angular/common/http';
import {SaleShare} from '../models/SaleShare';
import {School} from '../models/School';
import {User} from '../../authentication/user.model';
import {httpOptions, urlAPI} from '../../shared/constants/env';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SalesSharesService {


  constructor(private fb: FormBuilder, private http: HttpClient) { }

  generateFormAddSale() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      contact_firstname: ['', [Validators.required, Validators.maxLength(25)]],
      contact_lastname: ['', [Validators.required, Validators.maxLength(25)]],
      amount_signed: ['', [Validators.pattern('^[0-9]*$')]],
      sale_source: ['', [Validators.required]],
      sale_state: ['', [Validators.required]],
      dt_next_action: [''],
      // attachment: this.fb.array([ this.attachmentForm() ]),
      comment: ['', [Validators.maxLength(255)]],
      sale_action_state: ['', [Validators.required]],

    });
  }

  // attachmentForm() {
  //   return this.fb.group({
  //     attachment: ['', [Validators.required]],
  //   });
  // }

  initSaleStateTab(): any[] {
    return [
      { value: SALE_STATE.ABANDONMENT, label: 'Abandon' },
      { value: SALE_STATE.FIRST_CONTACT, label: 'Premier contact' },
      { value: SALE_STATE.NEGOTIATION, label: 'Négotiation' },
      { value: SALE_STATE.PROPOSAL, label: 'Proposition' },
      { value: SALE_STATE.REFUSAL, label: 'Refus' },
      { value: SALE_STATE.REVIVAL, label: 'Relance' },
      { value: SALE_STATE.WON, label: 'Gagné' },
    ];
  }

  initSaleSourceTab(): any[] {
    return [
      { value: SALE_SOURCE.CANVASSING, label: 'Démarchage' },
      { value: SALE_SOURCE.INCOMING_CALL, label: 'Appel entrant' },
      { value: SALE_SOURCE.LOUNGE, label: 'Salon' },
      { value: SALE_SOURCE.NETWORK, label: 'Réseau' },
      { value: SALE_SOURCE.WORD_OF_MOUTH, label: 'Bouche à oreille' },
    ];
  }

  initSaleActionStateTab(): any[] {
    return [
      { value: SALE_ACTION_STATE.FINISH, label: 'Fini' },
      { value: SALE_ACTION_STATE.IN_PROGRESS, label: 'En cours' },
      { value: SALE_ACTION_STATE.ON_BREAK, label: 'Pause' },
      { value: SALE_ACTION_STATE.STOP, label: 'Stoppé' },
      { value: SALE_ACTION_STATE.TODO, label: 'A faire' },
    ];
  }

  transformSaleShareFormToSaleShare(saleShareForm: any) {
    const saleShare: SaleShare = {
      dt_created: null,
      dt_update: null,
      amount_signed: saleShareForm.amount_signed || null,
      dt_next_action: saleShareForm.dt_next_action || null,
      sale_state: saleShareForm.sale_state,
      comment: saleShareForm.comment || null,
      sale_source: saleShareForm.sale_source,
      sale_action_state: saleShareForm.sale_action_state,
      // attachment: saleShareForm.attachment,
      school: {
        name: saleShareForm.name,
        contact_firstname: saleShareForm.contact_firstname,
        contact_lastname: saleShareForm.contact_lastname
      },
    };
    return saleShare;
  }

  addSaleShare(saleShareForm: any, attachments: any[]) {
    const saleShare = this.transformSaleShareFormToSaleShare(saleShareForm);
    return this.http.post<SaleShare>(`${urlAPI}/editor_crm/`, {saleShare, attachments} , httpOptions);
  }

  getAllSaleShare() {
    return this.http.get<SaleShare[]>(`${urlAPI}/editor_crm/`, httpOptions);
  }

  getAttachmentsBySaleID(saleId: number) {
    return this.http.get<any[]>(`${urlAPI}/attachments/${saleId}`, httpOptions);
  }

  updateSale(id: number, saleShareForm: any) {
    let saleShare = this.transformSaleShareFormToSaleShare(saleShareForm);
    return this.http.put<SaleShare>(`${urlAPI}/editor_crm/${id}`, saleShare , httpOptions);
  }

  deleteSaleShare(id: number) {
    return this.http.delete<any>(`${urlAPI}/editor_crm/${id}`, httpOptions);
  }

  deleteAttachment(id: number) {
    alert('dff');
    return this.http.delete<any>(`${urlAPI}/attachments/${id}`, httpOptions);
  }

}
