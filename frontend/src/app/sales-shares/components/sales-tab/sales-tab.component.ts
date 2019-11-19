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
  editField: string;
  saleShareList: Array<SaleShare> = [];
  displayAlert = false;
  fGroup: FormGroup;

  constructor(private saleService: SalesSharesService){}

  ngOnInit(): void {
    this.getAllSaleShare();
    this.fGroup = this.saleService.generateFormAddSale();

    this.fGroup.valueChanges.subscribe(value => console.log(value));
  }

  getAllSaleShare() {
    this.saleService.getAllSaleShare().subscribe((saleShares) => {
      console.log(saleShares);
      this.saleShareList = saleShares;
    });
  }

  updateList(id: number, property: string, event: any) {
    // const editField = event.target.textContent;
    // this.saleShareList[id][property] = editField;
    console.log(id);
    this.getAllSaleShare();

  }

  remove(id: any) {
    // this.awaitingPersonList.push(this.personList[id]);
    this.saleShareList.splice(id, 1);
  }

  changeValue(id: number, property: string, event: any) {
    // this.editField = event.target.textContent;
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
