import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormComponent } from './invoice-form.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InvoiceFormComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    InvoiceFormComponent
  ]
})
export class InvoiceFormModule { }
