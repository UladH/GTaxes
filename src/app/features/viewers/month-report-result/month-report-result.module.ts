import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { MonthReportResultComponent } from './month-report-result.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MonthReportResultComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    SharedModule
  ],
  exports: [
    MonthReportResultComponent
  ]
})
export class MonthReportResultModule { }
