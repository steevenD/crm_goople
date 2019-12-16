import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SalesSharesService} from '../../services/sales-shares.service';
import {FormGroup} from '@angular/forms';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../../models/enums';
import {InfoService} from '../../../shared/services/info.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {


  @Output() notifyAdSale = new EventEmitter(false);

  form: FormGroup;
  saleStateTab: any[];
  saleSourceTab: any[];
  saleActionStateTab: any[];
  errorPDF = false;

  attachments: any[] = [];

  constructor(private salesSharesService: SalesSharesService,
              private cd: ChangeDetectorRef,
              private infoService: InfoService) { }

  ngOnInit() {
    this.form = this.salesSharesService.generateFormAddSale();

    this.saleStateTab = this.salesSharesService.initSaleStateTab();
    this.saleSourceTab = this.salesSharesService.initSaleSourceTab();
    this.saleActionStateTab = this.salesSharesService.initSaleActionStateTab();

  }

  handleClickDelete(index: number) {
    this.attachments.splice(index, 1);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (file.type === 'application/pdf') {
        this.errorPDF = false;
        reader.readAsDataURL(file);

        reader.onload = () => {

          this.attachments.push({
            name: event.target.files[0].name,
            file: reader.result
          });

          this.cd.markForCheck();
        };
      } else {
        this.errorPDF = true;
      }
    }
  }


  handleClickAddSale() {
    this.salesSharesService.addSaleShare(this.form.value, this.attachments).subscribe(() => {
      this.notifyAdSale.emit(true);
        this.infoService.showToast('addSale');

      },
      (err) => console.log(err),
      () => {
        this.notifyAdSale.emit(false);
        this.form.reset();
      });
  }

}
