import { Component, OnInit } from '@angular/core';
import {KpiSale} from '../../models/KpiSale';
import {KpiService} from '../../services/kpi.service';
import {InfoService} from '../../../shared/services/info.service';

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
  goals = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  stats: KpiSale[] = [];

  data = [];

  constructor(private kpiService: KpiService, private infoService: InfoService) {

  }
  ngOnInit() {
    this.kpiService.getDataStatistic().subscribe((stats) => this.stats = stats);
    this.infoService.showToast('graphOnClick', 3000);

    this.kpiService.getGoals().subscribe((goals: any[]) => {
      for (const goal of goals) {
        this.goals.push(goal.number_objectif);
      }
    });
  }

  setGraphBy(column: string, index: number) {
    this.yAxisLabel = column;
    let sales_filtered = [];
    let goals = [];
    this.stats.forEach(sale => {
      sales_filtered.push(this.kpiService.getStatToGraph(index, sale));
      goals.push({
        name: sale.month,
        value: this.goals[index]
      });
    });
    this.data = [
      {
        name: column,
        series: sales_filtered
      },
      {
        name: 'Objectif',
        series: goals
      }
    ];
  }

  handleKeyupSetGoal(column, index, event) {
    const newGoal = event.target.value || 0;
    this.kpiService.updateGoal(index + 1, newGoal).subscribe();
    this.goals[index] = newGoal;
    this.setGraphBy(column, index);
    this.infoService.showToast('update');
  }

}
