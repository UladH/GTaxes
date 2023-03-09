import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxCalculatorRoutingModule } from './tax-calculator-routing.module';
import { MonthIncomeFormModule } from 'src/app/features/forms/month-report-form/month-report-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthReportResultModule } from 'src/app/features/viewers/month-report-result/month-report-result.module';



@NgModule({
  declarations: [
    TaxCalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaxCalculatorRoutingModule,
    MonthIncomeFormModule,
    MonthReportResultModule
  ]
})
export class TaxCalculatorModule { }
