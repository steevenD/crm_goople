import { Component, OnInit } from '@angular/core';
import {SalesSharesService} from '../../services/sales-shares.service';
import {FormGroup} from '@angular/forms';
import {SALE_ACTION_STATE, SALE_SOURCE, SALE_STATE} from '../../models/enums';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {

  form: FormGroup;
  saleStateTab: any[];
  saleSourceTab: any[];
  saleActionStateTab: any[];

  constructor(private salesSharesService: SalesSharesService) { }

  ngOnInit() {
    this.form = this.salesSharesService.generateFormAddSale();

    this.saleStateTab = this.salesSharesService.initSaleStateTab();
    this.saleSourceTab = this.salesSharesService.initSaleSourceTab();
    this.saleActionStateTab = this.salesSharesService.initSaleActionStateTab();

  }

}
