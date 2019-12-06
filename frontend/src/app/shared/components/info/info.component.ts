import {Component, OnDestroy, OnInit} from '@angular/core';
import {InfoService} from '../../services/info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {

  viewModel: any = {};

  constructor(private infoService: InfoService) {
  }

  ngOnInit() {
    this.viewModel.toast$ = this.infoService.toast$;
    this.viewModel.contentToast$$ = this.infoService.contentToast$.subscribe((key) => {
      this.viewModel.content = key;
    });

  }

  ngOnDestroy(): void {
    this.viewModel.contentToast$$.unsubscribe();
  }

}
