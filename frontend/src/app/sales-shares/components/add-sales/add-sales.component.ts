import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SalesSharesService} from '../../services/sales-shares.service';
import {FormGroup} from '@angular/forms';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../../models/enums';

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

  attachments: any[] = [];

  constructor(private salesSharesService: SalesSharesService,  private cd: ChangeDetectorRef) { }

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
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.form.patchValue({
        //   attachment: reader.result
        // });

        // this.form.get('attachment').setValue(event.target.files[0]);
        // this.form.get('attachment').setValue(reader.result);
        console.log(event.target.files[0].name);
        this.attachments.push({
          name : event.target.files[0].name,
          file : reader.result
        });

        // this.downloadFile(reader.result);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }


  downloadFile(data) {
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = data;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  handleClickAddSale() {
    this.salesSharesService.addSaleShare(this.form.value, this.attachments).subscribe(() => {
      this.notifyAdSale.emit(true);
    },
      (err) => console.log(err),
      () => this.notifyAdSale.emit(false));
  }

}
