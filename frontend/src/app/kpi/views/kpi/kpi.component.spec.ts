import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiComponent } from './kpi.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MockComponent} from 'ng-mocks';

xdescribe('KpiComponent', () => {
  let component: KpiComponent;
  let fixture: ComponentFixture<KpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiComponent,
      ],
      imports: [NgxChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
