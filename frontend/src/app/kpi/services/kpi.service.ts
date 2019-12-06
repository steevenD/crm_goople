import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SaleShare} from '../../sales-shares/models/SaleShare';
import {httpOptions, urlAPI} from '../../shared/constants/env';
import {KpiSale} from '../models/KpiSale';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  constructor(private http: HttpClient) { }

  getStatToGraph(index: number, sale: KpiSale): any {
    let result;
    switch (index) {
      case 0:
        result = {
          name: sale.month,
          value: sale.signed_sales
        };
        break;
      case 1:
        result = {
          name: sale.month,
          value: sale.nb_contact
        };
        break;
      case 2:
        result = {
          name: sale.month,
          value: sale.earned_sales
        };
        break;
      case 3:
        result = {
          name: sale.month,
          value: sale.renounced_sales
        };
        break;
    }
    return result;
  }


  getDataStatistic() {
    return this.http.get<KpiSale[]>(`${urlAPI}/kpi/stats`, httpOptions);
  }

  getGoals() {
    return this.http.get<any>(`${urlAPI}/kpi/goals`, httpOptions);
  }

  updateGoal(id: number, newGoal: number) {
    return this.http.put<any>(`${urlAPI}/kpi/goal/${id}`, {'number_objectif': newGoal} , httpOptions);
  }
}
