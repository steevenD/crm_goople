import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SalesSharesService} from '../../services/sales-shares.service';
import {FormGroup} from '@angular/forms';
import {SaleShare} from '../../models/SaleShare';
import {SALE_ACTION_STATE} from '../../models/enums';
import * as moment from 'moment';
import {InfoService} from '../../../shared/services/info.service';

@Component({
  selector: '[app-row-tab]',
  templateUrl: './row-tab.component.html',
  styleUrls: ['./row-tab.component.css']
})
export class RowTabComponent implements OnInit {
  saleActionStateTab: any[];
  saleStateTab: any[];
  saleSourceTab: any[];
  attachments: any[];

  @Input() saleShare: SaleShare;
  @Output() notifyDelete = new EventEmitter(false);
  @Output() displayAlert = new EventEmitter(false);

  form: FormGroup;

  constructor(private saleService: SalesSharesService, private infoService: InfoService) { }

  ngOnInit() {
    this.saleActionStateTab = this.saleService.initSaleActionStateTab();
    this.saleStateTab = this.saleService.initSaleStateTab();
    this.saleSourceTab = this.saleService.initSaleSourceTab();

    this.form = this.saleService.generateFormAddSale();

    this.saleShare.dt_created = moment(this.saleShare.dt_created.substr(0, 19)).format('D/MM/YYYY HH:mm:ss');
    this.saleShare.dt_update = moment(this.saleShare.dt_update).format('D/MM/YYYY HH:mm:ss');

    this.initForm();

    this.followFormChanged();
  }

  initForm() {
    this.form.get('name').setValue(this.saleShare.school.name);
    this.form.get('contact_firstname').setValue(this.saleShare.school.contact_firstname);
    this.form.get('contact_lastname').setValue(this.saleShare.school.contact_lastname);
    this.form.get('sale_action_state').setValue(this.saleShare.sale_action_state);
    this.form.get('sale_source').setValue(this.saleShare.sale_source);
    this.form.get('sale_state').setValue(this.saleShare.sale_state);
    this.form.get('dt_next_action').setValue(this.saleShare.dt_next_action);
    this.form.get('amount_signed').setValue(this.saleShare.amount_signed);
    this.form.get('comment').setValue(this.saleShare.comment);

    this.saleService.getAttachmentsBySaleID(this.saleShare.id).subscribe((attachments) => {
      this.attachments = attachments;
    });
  }


  downloadFile(data, nameFile: string) {
    const file = 'data:application/pdf;base64,' + data.substr(25);

    const downloadLink = document.createElement("a");

    downloadLink.href = file;
    downloadLink.download = nameFile;
    downloadLink.click();
  }

  followFormChanged() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.saleService.updateSale(this.saleShare.id, this.form.value).subscribe(() => {
          this.saleShare.dt_update = moment().format('D/MM/YYYY HH:mm:ss');
          this.infoService.showToast('update');
        });
      } else {
        this.displayAlert.emit(true);
        setTimeout(() => {
          this.displayAlert.emit(false);
        }, 2000);
      }
    });
  }

  handleClickDeleteAttachment(attachment: any){
    this.saleService.deleteAttachment(attachment.id).subscribe(() => {
        this.notifyDelete.emit(true);
        this.infoService.showToast('deleteAttachment');
      }, (err) => console.log(err),
      () => this.notifyDelete.emit(false));
  }

  handleClickDelete() {
    this.saleService.deleteSaleShare(this.saleShare.id).subscribe(() => {
      this.notifyDelete.emit(true);
        this.infoService.showToast('deleteSale');
      }, (err) => console.log(err),
      () => this.notifyDelete.emit(false));
  }
}
