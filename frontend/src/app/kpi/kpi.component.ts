import { Component, OnInit } from '@angular/core';
import { KpiSale } from '../sales-shares/models/KpiSale'

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mois';
  showYAxisLabel = true;
  yAxisLabel = '';
  timeline = true;
  autoScale = true;
  objectifs = [13000, 8, 10, 1];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  sales: KpiSale[] = [
    {
      month: new Date("01/01/2018"),
      signed_sales: 15500,
      nb_contact: 10,
      earned_sales: 15,
      renounced_sales: 2
    },
    {
      month: new Date("02/02/2018"),
      signed_sales: 12500,
      nb_contact: 5,
      earned_sales: 10,
      renounced_sales: 3
    },
    {
      month: new Date("03/03/2018"),
      signed_sales: 13650,
      nb_contact: 13,
      earned_sales: 12,
      renounced_sales: 1
    },
    {
      month: new Date("04/04/2018"),
      signed_sales: 18420,
      nb_contact: 2,
      earned_sales: 20,
      renounced_sales: 4
    },
    {
      month: new Date("05/05/2018"),
      signed_sales: 15500,
      nb_contact: 10,
      earned_sales: 15,
      renounced_sales: 2
    }
  ]

  data = [];
  ngOnInit() {
  }

  setGraphBy(column: string, index: number) {
    this.yAxisLabel = column;
    var sales_filtered = [];
    var objectif = [];
    this.sales.forEach(sale => {
      sales_filtered.push(this.getSale(index, sale))
      objectif.push({
        name: sale.month.toLocaleString('default', { month: 'long', year: 'numeric'}),
        value: this.objectifs[index]
      })
    })
    this.data = [
      {
        name: column,
        series: sales_filtered
      },
      {
        name: 'Objectif',
        series: objectif
      }
    ];
    
  }

  getSale(index: number, sale: KpiSale): Object{
    var result;
    switch (index) {
      case 0:
        result = {
          name: sale.month.toLocaleString('default', { month: 'long', year: 'numeric' }),
          value: sale.signed_sales
        }
        break;
      case 1:
          result = {
            name: sale.month.toLocaleString('default', { month: 'long', year: 'numeric' }),
            value: sale.nb_contact
          }
        break;
      case 2:
          result = {
            name: sale.month.toLocaleString('default', { month: 'long', year: 'numeric' }),
            value: sale.earned_sales
          }
        break;
      case 3:
          result = {
            name: sale.month.toLocaleString('default', { month: 'long', year: 'numeric' }),
            value: sale.renounced_sales
          }
        break;
    }
    return result;
  }

  setObjectif(column, index, event) {
    if(event.keyCode == 13) {
      this.objectifs[index] = event.target.value
      this.setGraphBy(column, index);
    }
  }

}
