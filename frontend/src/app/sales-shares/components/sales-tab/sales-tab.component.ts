import { Component, OnInit } from '@angular/core';
import {SalesSharesService} from '../../services/sales-shares.service';
import {SaleShare} from '../../models/SaleShare';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sales-tab',
  templateUrl: './sales-tab.component.html',
  styleUrls: ['./sales-tab.component.css']
})
export class SalesTabComponent implements OnInit {
  saleShareList: Array<SaleShare> = [];
  displayAlert = false;
  fGroup: FormGroup;

  constructor(private saleService: SalesSharesService){}

  ngOnInit(): void {
    this.getAllSaleShare();
    this.fGroup = this.saleService.generateFormAddSale();

    this.fGroup.valueChanges.subscribe();
  }

  getAllSaleShare() {
    this.saleService.getAllSaleShare().subscribe((saleShares) => {
      this.saleShareList = saleShares;
    });
  }


  handleNotifyRefresh($event) {
    if ($event) {
      this.getAllSaleShare();
    }
  }

  handleDisplayAlert($event) {
    this.displayAlert = $event;
  }
}
