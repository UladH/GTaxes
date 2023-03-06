import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InvoiceFormModule } from '../invoice-form/invoice-form.module';
import { MonthReportFormComponent } from './month-report-form.component';



@NgModule({
  declarations: [
    MonthReportFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    InvoiceFormModule
  ],
  exports: [
    MonthReportFormComponent
  ]
})
export class MonthIncomeFormModule { }
